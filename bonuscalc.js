
TWDS.bonuscalc = {}
TWDS.bonuscalc.lasthash = null
TWDS.bonuscalc.lastbonus = null
TWDS.bonuscalc.getSpeed = function (itemids) {
  const bo = TWDS.bonuscalc.getComboBonus(itemids)
  let speed = 100
  if (Wear.wear.animal) {
    speed += CharacterSkills.getSkill('ride').points // includes mobility
    if (bo.flexibility) speed += bo.flexibility
    if (bo.ride) speed += bo.ride
    let x = Wear.wear.animal.obj.speed
    x = Character.defaultSpeed / (Character.defaultSpeed * x) * 100 - 100
    speed += x
    if (bo.speed) {
      speed = speed * (1 + bo.speed)
    }
    console.log('SPD5', speed)
  }
  if (Premium.hasBonus('greenhorn')) { speed *= 2 }
  return speed
}
TWDS.bonuscalc.getComboBonus = function (itemids) {
  const usedSets = {}
  const gethash = function (itemids) {
    itemids.sort(function (a, b) {
      return a - b
    })
    const str = Character.level + '/' + itemids.join(',')
    return TWDS.cyrb53(str)
  }

  if (itemids === null || itemids === undefined) {
    itemids = []
    for (const e of Object.entries(Wear.slots)) {
      console.log(e)
      const x = Wear.get(e[1])
      if (x) { itemids.push(x.obj.item_id) }
    }
  }
  const hash = gethash(itemids)
  if (hash === TWDS.bonuscalc.lasthash) { return JSON.parse(TWDS.bonuscalc.lastbonus) }

  const items = []
  for (let i = 0; i < itemids.length; i++) {
    items.push(ItemManager.get(itemids[i]))
  }
  const setlist = west.storage.ItemSetManager._setList
  for (const item of items) { // this is item.obj!
    const set = item.set
    if (!(set in setlist)) continue
    if (!(set in usedSets)) {
      usedSets[set] = []
    }
    usedSets[set].push(item.item_base_id)
  }
  const totalbonus = {}
  const addbonus = function (b) {
    if (!(b.key in totalbonus)) { totalbonus[b.key] = 0 }
    totalbonus[b.key] += b.value
  }
  const extractor = new west.item.BonusExtractor(Character)
  for (const setkey of Object.keys(usedSets)) {
    const set = west.storage.ItemSetManager.get(setkey)
    const itemsinuse = usedSets[setkey].length
    const setbonuses = set.getMergedStages(itemsinuse)
    console.log('SET', setkey, itemsinuse, '=>', setbonuses)
    for (let i = 0; i < setbonuses.length; i++) {
      addbonus(extractor.getExportValue(setbonuses[i]))
    }
  }
  for (let i = 0; i < items.length; i++) {
    const it = items[i]
    for (let j = 0; j < it.bonus.item.length; j++) {
      extractor.init(Character, it.item_level)
      const v = extractor.getExportValue(it.bonus.item[j])
      console.log('ITEM', it.name, it, j, '=>', v)
      addbonus(v)
    }
    if (it.bonus.attributes && it.bonus.attributes.length) {
      console.warn('unhandled attributes bonus', it, it.bonus.attributes)
    }
    if (it.bonus.skills && it.bonus.skills.length) {
      console.warn('unhandled attributes bonus', it, it.bonus.attributes)
    }
    if (it.bonus.fortbattle) {
      if (it.bonus.fortbattle.offense) {
        addbonus({ key: 'fortbattle_offense', value: it.bonus.fortbattle.offense })
      }
      if (it.bonus.fortbattle.defense) {
        addbonus({ key: 'fortbattle_defense', value: it.bonus.fortbattle.defense })
      }
      if (it.bonus.fortbattle.resistance) {
        addbonus({ key: 'fortbattle_resistance', value: it.bonus.fortbattle.resistance })
      }
    }
    if (it.bonus.fortbattlesector) {
      if (it.bonus.fortbattlesector.offense) {
        addbonus({ key: 'fortbattlesector_offense', value: it.bonus.fortbattlesector.offense })
      }
      if (it.bonus.fortbattlesector.defense) {
        addbonus({ key: 'fortbattlesector_defense', value: it.bonus.fortbattlesector.defense })
      }
      if (it.bonus.fortbattlesector.damage) {
        addbonus({ key: 'fortbattlesector_damage', value: it.bonus.fortbattlesector.damage })
      }
    }
  }
  TWDS.bonuscalc.lasthash = hash
  TWDS.bonuscalc.lastbonus = JSON.stringify(totalbonus)
  return totalbonus
}

TWDS.getComboBonus = function (combo) {
  const usedSets = {}
  const allBonus = {}

  const pimp = function (level, value) {
    let plus
    if (!level) return value
    if (value < 1) {
      plus = value * level / 10
      plus = Math.round(plus * 100) / 100
    } else {
      plus = Math.max(1, value / 10 * level)
      plus = Math.round(plus)
    }
    return value + plus
  }

  const handleOneGoldenBonusThing = function (name, value, source) {
    if (value) {
      if (!(name in allBonus)) {
        allBonus[name] = [0, []]
      }
      allBonus[name][0] += value
      allBonus[name][1].push([value, source])
      // console.log('updated', name, ' with +', value, 'to', allBonus[name], 'for', source)
    }
  }

  const handleRounding = function (value, method) {
    switch (method) {
      case 'ceil':
        return Math.ceil(value)
      case 'floatceil':
        return Math.ceil(100 * value) / 100
      case 'floor':
        return Math.floor(value)
      case 'round':
        return Math.round(value)
      default:
        return value
    }
  }

  const handleOneBonusThing = function (entry, doRound, wtype, source, ilv = 0) {
    let realtype
    let value
    if (entry.type === 'character') {
      realtype = entry.bonus.name
      if (typeof realtype === 'undefined') {
        realtype = entry.bonus.type
      }
      value = entry.bonus.value
      if (entry.bonus.isSector) {
        realtype = 'sector' + realtype
      }
    } else if (entry.type === 'job') {
      realtype = `job_${entry.job}`
      value = entry.value
    } else if (entry.type === 'fortbattle') {
      realtype = entry.name
      value = entry.value
      if (entry.isSector) {
        realtype += '/sector'
      }
    } else {
      realtype = entry.type
      value = entry.value
    }
    if (wtype && realtype === 'damage') {
      if (wtype === 1) realtype = 'dueldamage'
    }
    if (!(realtype in allBonus)) {
      allBonus[realtype] = [0, []]
    }
    if ('key' in entry) {
      if (entry.key === 'level') {
        value *= Character.level
      } else {
        console.log('unknown bonus key', entry.key, source)
        return false
      }
    }
    value = pimp(ilv, value)
    value = handleRounding(value, entry.roundingMethod)
    allBonus[realtype][0] += value
    allBonus[realtype][1].push([value, source])
    if (value) {
      // console.log('updated', realtype, ' with +', value, 'to', allBonus[realtype], source)
    }
    return true
  }

  const handleOneItem = function (item) {
    const bo = item.bonus
    let wtype = 0
    const ilv = item.item_level
    if (item.type === 'right_arm') wtype = 1
    if (item.type === 'left_arm') wtype = 2
    // console.log('ITEM', item, wtype)
    for (let j = 0; j < bo.item.length; j++) {
      handleOneBonusThing(bo.item[j], true, wtype, item.name, ilv)
    }
    // golden gun and such things.
    handleOneGoldenBonusThing('offense', bo.fortbattle.offense, item.name)
    handleOneGoldenBonusThing('defense', bo.fortbattle.defense, item.name)
    handleOneGoldenBonusThing('resistance', bo.fortbattle.resistance, item.name)
    handleOneGoldenBonusThing('offense/sector', bo.fortbattlesector.offense, item.name)
    handleOneGoldenBonusThing('defense/sector', bo.fortbattlesector.defense, item.name)
    handleOneGoldenBonusThing('damage/sector', bo.fortbattlesector.damage, item.name)
  }

  for (const [k, v] of Object.entries(combo)) {
    if (typeof v === 'number') {
      combo[k] = ItemManager.get(v)
    }
  }

  const setlist = west.storage.ItemSetManager._setList
  for (const item of combo) { // this is item.obj!
    handleOneItem(item)
    const set = item.set
    if (!(set in setlist)) continue
    if (!(set in usedSets)) {
      usedSets[set] = []
    }
    usedSets[set].push(item.item_base_id)
  }

  // setbonus
  for (const setcode in usedSets) {
    const setHas = setlist[setcode].items.length
    const weHave = usedSets[setcode].length
    const addup = {}
    for (let numThings = 1; numThings <= Math.min(setHas, weHave); numThings++) {
      const bonuslist = setlist[setcode].bonus[numThings]
      if (typeof bonuslist === 'undefined') {
        continue
      }
      for (let i = 0; i < bonuslist.length; i++) {
        const one = bonuslist[i]
        if (one.key === 'level') {
          if (!(one.bonus.name in addup)) {
            addup[one.bonus.name] = Object.assign({}, one)
            // Object.assign makes shallow clones, so...
            addup[one.bonus.name].bonus = Object.assign({}, one.bonus)
            addup[one.bonus.name].things = bonuslist.length
          } else {
            addup[one.bonus.name].bonus.value += one.bonus.value
          }
        } else {
          handleOneBonusThing(bonuslist[i], false, 0,
            `${setlist[setcode].name} (#${numThings})`)
        }
      }
    }
    for (const one of Object.values(addup)) {
      handleOneBonusThing(one, false, 0,
          `${setlist[setcode].name} (#${one.things})`)
    }
  }
  // console.log('total bonus', allBonus)
  return allBonus
}
TWDS.getWearBonus = function () {
  const list = []
  for (const item of Object.values(Wear.wear)) {
    list.push(item.obj)
  }
  return TWDS.getComboBonus(list)
}
TWDS.initBonusDisplay = function (container) {
  const ele = function (tr, what, t) {
    const td = document.createElement(what)
    td.textContent = t
    tr.appendChild(td)
  }
  const vele = function (tr, what, val) {
    const td = document.createElement(what)
    if (val !== 0) {
      td.textContent = val[0]
      let ti = ''
      for (const pair of Object.values(val[1])) {
        ti += `${pair[0]} ${pair[1]}<br>`
      }
      td.title = ti
    } else {
      td.innerHTML = '&nbsp;'
    }
    tr.appendChild(td)
  }
  const ab = TWDS.getWearBonus()

  const intro = document.createElement('p')
  intro.textContent = TWDS._('BONUS_INTRO',
    'This page shows the bonus values of the current equipment, without your attributes and skills.')
  container.appendChild(intro)

  let h1 = document.createElement('h1')
  h1.textContent = TWDS._('TITLE_ATTR_SKILLS_BONUS',
    'Attributes And Skills')
  container.appendChild(h1)

  let tab = document.createElement('table')
  tab.id = 'TWDS_attr_skill'
  let tr
  tr = document.createElement('tr')
  tr.className = 'bonus-strength1'
  tab.appendChild(tr)
  ele(tr, 'th', CharacterSkills.attributes.strength.name)
  ele(tr, 'th', CharacterSkills.skills.build.name)
  ele(tr, 'th', CharacterSkills.skills.punch.name)
  ele(tr, 'th', CharacterSkills.skills.tough.name)
  ele(tr, 'th', CharacterSkills.skills.endurance.name)
  ele(tr, 'th', CharacterSkills.skills.health.name)
  tr = document.createElement('tr')
  tr.className = 'bonus-strength2'
  tab.appendChild(tr)
  vele(tr, 'td', ab.strength || 0)
  vele(tr, 'td', ab.build || 0)
  vele(tr, 'td', ab.punch || 0)
  vele(tr, 'td', ab.tough || 0)
  vele(tr, 'td', ab.endurance || 0)
  vele(tr, 'td', ab.health || 0)
  container.appendChild(tab)

  tr = document.createElement('tr')
  tr.className = 'bonus-flexibility1'
  tab.appendChild(tr)
  ele(tr, 'th', CharacterSkills.attributes.flexibility.name)
  ele(tr, 'th', CharacterSkills.skills.ride.name)
  ele(tr, 'th', CharacterSkills.skills.reflex.name)
  ele(tr, 'th', CharacterSkills.skills.dodge.name)
  ele(tr, 'th', CharacterSkills.skills.hide.name)
  ele(tr, 'th', CharacterSkills.skills.swim.name)
  tr = document.createElement('tr')
  tr.className = 'bonus-flexibility2'
  tab.appendChild(tr)
  vele(tr, 'td', ab.flexibility || 0)
  vele(tr, 'td', ab.ride || 0)
  vele(tr, 'td', ab.reflex || 0)
  vele(tr, 'td', ab.dodge || 0)
  vele(tr, 'td', ab.hide || 0)
  vele(tr, 'td', ab.swim || 0)

  tr = document.createElement('tr')
  tr.className = 'bonus-dexterity1'
  tab.appendChild(tr)
  ele(tr, 'th', CharacterSkills.attributes.dexterity.name)
  ele(tr, 'th', CharacterSkills.skills.aim.name)
  ele(tr, 'th', CharacterSkills.skills.shot.name)
  ele(tr, 'th', CharacterSkills.skills.pitfall.name)
  ele(tr, 'th', CharacterSkills.skills.finger_dexterity.name)
  ele(tr, 'th', CharacterSkills.skills.repair.name)
  tr = document.createElement('tr')
  tr.className = 'bonus-dexterity2'
  tab.appendChild(tr)
  vele(tr, 'td', ab.dexterity || 0)
  vele(tr, 'td', ab.aim || 0)
  vele(tr, 'td', ab.shot || 0)
  vele(tr, 'td', ab.pitfall || 0)
  vele(tr, 'td', ab.finger_dexterity || 0)
  vele(tr, 'td', ab.repair || 0)

  tr = document.createElement('tr')
  tr.className = 'bonus-charisma1'
  tab.appendChild(tr)
  ele(tr, 'th', CharacterSkills.attributes.charisma.name)
  ele(tr, 'th', CharacterSkills.skills.leadership.name)
  ele(tr, 'th', CharacterSkills.skills.tactic.name)
  ele(tr, 'th', CharacterSkills.skills.trade.name)
  ele(tr, 'th', CharacterSkills.skills.animal.name)
  ele(tr, 'th', CharacterSkills.skills.appearance.name)
  tr = document.createElement('tr')
  tr.className = 'bonus-charisma2'
  tab.appendChild(tr)
  vele(tr, 'td', ab.charisma || 0)
  vele(tr, 'td', ab.leadership || 0)
  vele(tr, 'td', ab.tactic || 0)
  vele(tr, 'td', ab.trade || 0)
  vele(tr, 'td', ab.animal || 0)
  vele(tr, 'td', ab.appearance || 0)

  container.appendChild(tab)

  h1 = document.createElement('h1')
  h1.textContent = TWDS._('TITLE_OTHER_BONUS',
    'Other bonuses')
  container.appendChild(h1)

  tab = document.createElement('table')
  container.appendChild(tab)
  tab.id = 'TWDS_bonuslist'

  const names = []
  for (const k of Object.keys(ab)) {
    let name
    if (CharacterSkills.allAttrKeys.includes(k)) continue
    if (CharacterSkills.allSkillKeys.includes(k)) continue
    if (k === 'damage') continue
    if (k === 'dueldamage') continue
    const m = k.match(/^job_(.*)/, k)
    if (m && m[1] === 'all') {
      name = TWDS._('LABOR_POINTS_FOR_ALL',
        'labor points for all jobs')
    } else if (m) {
      const job = JobList.getJobById(m[1])
      name = TWDS._('LABOR_POINTS_FOR',
        'labor points towards $name$',
        { name: job.name })
    } else {
      name = TWDS._(`BONUSNAME_${k}`, k)
    }
    names.push([k, name])
  }
  names.sort((a, b) => a[1].localeCompare(b[1]))
  for (const entry of Object.values(names)) {
    const key = entry[0]
    const name = entry[1]
    tr = document.createElement('tr')
    tab.appendChild(tr)
    let v = ab[key][0]
    if (key === 'experience' || key === 'dollar' || key === 'drop' || key === 'luck' ||
      key === 'regen' || key === 'speed') {
      v = `+${Math.round(v * 1000) / 10}%`
    }
    ab[key][0] = v
    vele(tr, 'td', ab[key])

    const td = document.createElement('td')
    td.setAttribute('colspan', 5)
    td.textContent = name
    tr.appendChild(td)
  }
}
TWDS.getBonusContent = function () {
  const div = document.createElement('div')
  div.id = 'TWDS_bonus'
  TWDS.initBonusDisplay(div)
  return div
}
TWDS.activateBonusTab = function () {
  TWDS.activateTab('bonus')
}
TWDS.bonusStartFunction = function () {
  TWDS.registerTab('bonus',
    TWDS._('TABNAME_BONUS', 'Bonus'),
    TWDS.getBonusContent,
    TWDS.activateBonusTab,
    true)
  window.EventHandler.listen('wear_changed', function () {
    if (!wman.isWindowCreated('TWDS')) return
    if (!TWDS.window) return
    if (TWDS.window.currentActiveTabId !== 'bonus') return
    TWDS.activateTab('bonus')
  })
}
TWDS.registerStartFunc(TWDS.bonusStartFunction)

// vim: tabstop=2 shiftwidth=2 expandtab
