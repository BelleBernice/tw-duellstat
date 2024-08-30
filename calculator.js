// vim: tabstop=2 shiftwidth=2 expandtab

TWDS.calculator = {}
TWDS.calculator.presets = [
  { name: 'duel', disabled: true },
  // { name: 'tmpl',                    punch: 0, tough: 1, health: 1, reflex: 1, dodge: 1, aim: 1, shot: 0, appearance: 1, tactic: 1},

  { name: 'attack damaging/shooting', punch: 0, tough: 1, health: 1, reflex: 1, dodge: 6, aim: 12, shot: 12, appearance: 12, tactic: 1, type: 'duel', alias: 'Vaquero / Jaguar / Pearl', range: 1 },
  { name: 'attack damaging/melee', punch: 12, tough: 1, health: 1, reflex: 1, dodge: 6, aim: 12, shot: 0, appearance: 12, tactic: 1, type: 'duel', alias: 'Cowgirl / Legba', melee: 1 },
  { name: 'defend damaging/shooting', punch: 0, tough: 1, health: 1, reflex: 1, dodge: 6, aim: 12, shot: 12, appearance: 0, tactic: 12, type: 'duel', range: 1 },
  { name: 'defend damaging/melee', punch: 12, tough: 1, health: 1, reflex: 1, dodge: 6, aim: 12, shot: 0, appearance: 0, tactic: 12, type: 'duel', melee: 1 },
  { name: 'defend+ damaging/shooting', punch: 0, tough: 1, health: 1, reflex: 1, dodge: 6, aim: 10, shot: 10, appearance: 0, tactic: 15, type: 'duel', range: 1 },
  { name: 'defend+ damaging/melee', punch: 10, tough: 1, health: 1, reflex: 1, dodge: 6, aim: 10, shot: 0, appearance: 0, tactic: 15, type: 'duel', melee: 1 },

  { name: 'attack dodging/shooting', punch: 0, tough: 1, health: 1, reflex: 1, dodge: 12, aim: 6, shot: 3, appearance: 12, tactic: 1, type: 'duel', range: 1 },
  { name: 'attack dodging/melee', punch: 3, tough: 1, health: 1, reflex: 1, dodge: 12, aim: 6, shot: 0, appearance: 12, tactic: 1, type: 'duel', alias: 'Josephine', melee: 1 },
  { name: 'defend dodging/shooting', punch: 0, tough: 1, health: 1, reflex: 1, dodge: 12, aim: 9, shot: 3, appearance: 0, tactic: 12, type: 'duel', range: 1 },
  { name: 'defend dodging/melee', punch: 3, tough: 1, health: 1, reflex: 1, dodge: 12, aim: 9, shot: 0, appearance: 0, tactic: 12, type: 'duel', melee: 1 },

  { name: 'attack shooting w/ shot res.', punch: 0, tough: 3, health: 1, reflex: 12, dodge: 2, aim: 4, shot: 6, appearance: 12, tactic: 1, type: 'duel', range: 1 },
  { name: 'attack shooting w/ melee res.', punch: 0, tough: 12, health: 1, reflex: 3, dodge: 2, aim: 4, shot: 6, appearance: 12, tactic: 1, type: 'duel', range: 1 },
  { name: 'attack melee w/ shot res.', punch: 6, tough: 1, health: 1, reflex: 12, dodge: 2, aim: 4, shot: 0, appearance: 12, tactic: 1, type: 'duel', melee: 1 },
  { name: 'attack melee w/ melee res.', punch: 6, tough: 12, health: 1, reflex: 3, dodge: 2, aim: 4, shot: 0, appearance: 12, tactic: 1, type: 'duel', melee: 1 },
  { name: 'defend shooting w/ shot res.', punch: 0, tough: 3, health: 1, reflex: 12, dodge: 2, aim: 4, shot: 3, appearance: 0, tactic: 12, type: 'duel', range: 1 },
  { name: 'defend shooting w/ melee res.', punch: 0, tough: 12, health: 1, reflex: 3, dodge: 2, aim: 4, shot: 3, appearance: 0, tactic: 12, type: 'duel', range: 1 },
  { name: 'defend shooting w/ mixed res.', punch: 0, tough: 12, health: 1, reflex: 12, dodge: 10, aim: 4, shot: 3, appearance: 0, tactic: 12, type: 'duel', range: 1 },
  { name: 'defend melee w/ shot res.', punch: 2, tough: 1, health: 1, reflex: 12, dodge: 2, aim: 3, shot: 0, appearance: 0, tactic: 12, type: 'duel', melee: 1 },
  { name: 'defend melee w/ melee res.', punch: 2, tough: 12, health: 1, reflex: 3, dodge: 2, aim: 3, shot: 0, appearance: 0, tactic: 12, type: 'duel', melee: 1 },
  { name: 'defend melee w/ mixed res.', punch: 2, tough: 12, health: 1, reflex: 12, dodge: 10, aim: 3, shot: 0, appearance: 0, tactic: 12, type: 'duel', melee: 1 },
  { name: 'clover melee', punch: 54, tough: 34, health: 10, reflex: 38, dodge: 65, aim: 79, shot: 0, appearance: 57, tactic: 61, type: 'duel', melee: 1 },
  { name: 'clover shot', punch: 0, tough: 34, health: 10, reflex: 30, dodge: 64, aim: 72, shot: 88, appearance: 64, tactic: 62, type: 'duel', range: 1 },
  //
  { name: 'fort battle', disabled: true },
  { name: 'tank/att', health: 5, aim: 1, dodge: 5, hide: 6, leadership: 5, fboffense: 1, fboffense_sector: 2, fbdefense: 50, fbdefense_sector: 50, fbresistance: 5, fbdamage: 1, type: 'battle' },
  { name: 'tank/def', health: 5, aim: 1, dodge: 10, pitfall: 12, leadership: 10, fboffense: 2, fboffense_sector: 4, fbdefense: 20, fbdefense_sector: 40, fbresistance: 10, fbdamage: 1, type: 'battle' },
  { name: 'dmg/att', health: -1, aim: 5, dodge: 0, hide: 6, leadership: 6, fboffense: 10, fboffense_sector: 10, fbdefense: 1, fbdefense_sector: 2, fbresistance: 1, fbdamage: 5, type: 'battle' },
  { name: 'dmg/def', health: -1, aim: 5, dodge: 0, pitfall: 6, leadership: 6, fboffense: 10, fboffense_sector: 10, fbdefense: 1, fbdefense_sector: 2, fbresistance: 1, fbdamage: 5, type: 'battle' },
  { name: 'booster/damage', health: 0, dodge: 0, hide: 3, aim: 3, pitfall: 3, leadership: 3, fboffense: 0, fboffense_sector: 20, fbdefense_sector: 20, fbdamage: 150, type: 'battle' },
  { name: 'booster/generic', health: 0, dodge: 0, hide: 3, aim: 3, pitfall: 3, leadership: 4, fboffense_sector: 500, fbdefense_sector: 500, fbdamage: 5, type: 'battle' },
  { name: 'adventures', disabled: true },
  { name: 'adv. balanced', strength: 1, flexibility: 1, dexterity: 1, charisma: 1, fboffense: 1, fbdefense: 1, type: 'adv' },
  { name: 'adv. health', strength: 20, flexibility: 1, dexterity: 1, charisma: 1, fboffense: 1, fbdefense: 20, type: 'adv' },
  { name: 'adv. hit chance', strength: -1, flexibility: 1, dexterity: 1, charisma: 1, fboffense: 20, fbdefense: -1, type: 'adv' },
  { name: 'adv. damage', strength: 1, flexibility: 1, dexterity: 20, charisma: 1, fboffense: 20, fbdefense: 1, type: 'adv' },
  { name: 'adv. dodge', strength: -1, flexibility: 20, dexterity: 1, charisma: 1, fboffense: 1, fbdefense: 1, type: 'adv' },
  { name: 'adv. crit chance', strength: 1, flexibility: 1, dexterity: 1, charisma: 10, fboffense: 1, fbdefense: 1, type: 'adv' }
]
TWDS.calculator.data = [
  { kind: 'group', name: 'weapontype', cls: 'boostgroupweapons' },
  { kind: 'weaponselect' },

  { kind: 'group', name: 'attributes1', cls: 'attrgroup1' },
  { kind: 'bonus', name: 'strength', img: '/images/window/skills/circle_strength.png', title: TWDS._('CALCULATOR_STRENGTH', 'Strength - only used in adventure mode!') },
  { kind: 'bonus', name: 'flexibility', img: '/images/window/skills/circle_flexibility.png', title: TWDS._('CALCULATOR_FLEXIBILITY', 'Flexibiliy - only used in adventure mode!') },

  { kind: 'group', name: 'fortbattle', cls: 'boostgroupmps' },
  {
    kind: 'bonus',
    name: 'fboffense',
    img: '/images/fort/battle/button_attack.png',
    title: TWDS._('CALCULATOR_MP_ATTACK', 'multiplayer attack')
  },
  {
    kind: 'bonus',
    name: 'fboffense_sector',
    img: '/images/fort/battle/help01.png',
    title: TWDS._('CALCULATOR_SECTOR_ATTACK', 'multiplayer attack (sector bonus)')
  },
  {
    kind: 'bonus',
    name: 'fbdefense',
    img: '/images/fort/battle/button_defend.png',
    title: TWDS._('CALCULATOR_MP_DEFENSE', 'multiplayer defense')
  },
  {
    kind: 'bonus',
    name: 'fbdefense_sector',
    img: '/images/fort/battle/help01.png',
    title: TWDS._('CALCULATOR_SECTOR_DEFENSE', 'multiplayer defense (sector bonus)')
  },
  {
    kind: 'bonus',
    name: 'fbresistance',
    img: '/images/icons/Hearts.png',
    title: TWDS._('CALCULATOR_RESISTANCE', 'resistance')
  },
  {
    kind: 'bonus',
    name: 'fbdamage',
    img: '/images/items/left_arm/golden_rifle.png',
    title: TWDS._('CALCULATOR_SECTOR_DAMAGE', 'sector damage')
  },

  { kind: 'group', name: 'boost1', cls: 'boostgroupmisc' },
  {
    kind: 'bonus',
    name: 'speed',
    img: '/images/jobs/walk.png',
    title: TWDS._('CALCULATOR_SPEED', 'speed (use the calculator in the equipment tab instead)')
  },
  {
    kind: 'bonus',
    name: 'regen',
    img: '/images/jobs/sleep.png',
    title: TWDS._('CALCULATOR_REGEN', 'regeneration')
  },
  {
    kind: 'bonus',
    name: 'pray',
    img: '/images/jobs/pray.png',
    title: TWDS._('CALCULATOR_PRAY', 'pray')
  },

  { kind: 'group', name: 'attributes', cls: 'attrgroup2' },
  { kind: 'bonus', name: 'dexterity', img: '/images/window/skills/circle_dexterity.png', title: TWDS._('CALCULATOR_DEXTERITY', 'Dexterity - only used in adventure mode!') },
  { kind: 'bonus', name: 'charisma', img: '/images/window/skills/circle_charisma.png', title: TWDS._('CALCULATOR_CHARISMA', 'Charisma - only used in adventure mode!') },

  { kind: 'group', name: 'boost2', cls: 'boostgroup' },
  {
    kind: 'bonus',
    name: 'experience',
    img: '/images/items/yield/xp_boost.png',
    title: TWDS._('CALCULATOR_EXPERIENCE', 'experience')
  },
  {
    kind: 'bonus',
    name: 'dollar',
    img: '/images/items/yield/dollar_boost.png',
    title: TWDS._('CALCULATOR_DOLLAR', 'dollar')
  },
  {
    kind: 'bonus',
    name: 'luck',
    img: '/images/items/yield/luck_boost.png',
    title: TWDS._('CALCULATOR_LUCK', 'luck')
  },
  {
    kind: 'bonus',
    name: 'drop',
    img: '/images/items/yield/product_boost.png',
    title: TWDS._('CALCULATOR_DROP', 'drop chance')
  },
  {
    kind: 'bonus',
    name: 'joball',
    img: 'images/window/job/jobstar_small_gold.png',
    title: TWDS._('CALCULATOR_JP', 'job points (all jobs only)')
  },

  { kind: 'group', name: 'red', cls: 'attrskillgroup' },
  { kind: 'skill', name: 'build', img: '/images/window/skills/skillicon_build.png' },
  { kind: 'skill', name: 'punch', img: '/images/window/skills/skillicon_punch.png' },
  { kind: 'skill', name: 'tough', img: '/images/window/skills/skillicon_tough.png' },
  { kind: 'skill', name: 'endurance', img: '/images/window/skills/skillicon_endurance.png' },
  { kind: 'skill', name: 'health', img: '/images/window/skills/skillicon_health.png' },
  { kind: 'group', name: 'green', cls: 'attrskillgroup' },
  { kind: 'skill', name: 'ride', img: '/images/window/skills/skillicon_ride.png' },
  { kind: 'skill', name: 'reflex', img: '/images/window/skills/skillicon_reflex.png' },
  { kind: 'skill', name: 'dodge', img: '/images/window/skills/skillicon_dodge.png' },
  { kind: 'skill', name: 'hide', img: '/images/window/skills/skillicon_hide.png' },
  { kind: 'skill', name: 'swim', img: '/images/window/skills/skillicon_swim.png' },
  { kind: 'group', name: 'blue', cls: 'attrskillgroup' },
  { kind: 'skill', name: 'aim', img: '/images/window/skills/skillicon_aim.png' },
  { kind: 'skill', name: 'shot', img: '/images/window/skills/skillicon_shot.png' },
  { kind: 'skill', name: 'pitfall', img: '/images/window/skills/skillicon_pitfall.png' },
  { kind: 'skill', name: 'finger_dexterity', img: '/images/window/skills/skillicon_finger_dexterity.png' },
  { kind: 'skill', name: 'repair', img: '/images/window/skills/skillicon_repair.png' },
  { kind: 'group', name: 'yellow', cls: 'attrskillgroup' },
  { kind: 'skill', name: 'leadership', img: '/images/window/skills/skillicon_leadership.png' },
  { kind: 'skill', name: 'tactic', img: '/images/window/skills/skillicon_tactic.png' },
  { kind: 'skill', name: 'trade', img: '/images/window/skills/skillicon_trade.png' },
  { kind: 'skill', name: 'animal', img: '/images/window/skills/skillicon_animal.png' },
  { kind: 'skill', name: 'appearance', img: '/images/window/skills/skillicon_appearance.png' }
  /*
    const bonus = {
          damage: 0,
          fortbattle: {},
          job: {},
  */
]

TWDS.calculator.showbonus = function (all, area, advgun) {
  const one = function (all, k, str, tr, mult, pre, post) {
    if (mult === undefined) mult = 1
    if (pre === undefined) pre = ''
    if (post === undefined) post = ''
    if (str === '-') {
      if (k in CharacterSkills.attributes) { str = CharacterSkills.attributes[k].name } else if (k in CharacterSkills.skills) { str = CharacterSkills.skills[k].name }
    }
    TWDS.createEle('th', {
      last: tr,
      textContent: all[k] ? str : ''
    })
    // let v = all[k]
    const v = (mult * all[k]).toFixed(1)
    const co = all[k] ? pre + v + post : ''
    TWDS.createEle('td', {
      last: tr,
      textContent: co
    })
  }
  if (advgun) {
    const tab = TWDS.createEle('table.adventures', { last: area, className: 'TWDS_with_border' })
    let tr = TWDS.createEle('tr', { last: tab })
    const th = TWDS.createEle('th', { last: tr, textContent: TWDS._('CALCULATOR_TH_ADVENTURE_RELATED_DATA', 'Adventure related data') })

    const bo = new west.item.Factory().create(advgun, '' + advgun.item_id).exportBoni(Character.level) // yes, stringify a number. 1234000.slice() doesn't work, which is a horrible way to do things, inno.

    tr = TWDS.createEle('tr.advline', { last: tab })
    let n = 4
    one(bo, 'strength', CharacterSkills.attributes.strength.name, tr)
    one(bo, 'flexibility', CharacterSkills.attributes.flexibility.name, tr)
    one(bo, 'dexterity', CharacterSkills.attributes.dexterity.name, tr)
    one(bo, 'charisma', CharacterSkills.attributes.charisma.name, tr)
    if (all.fort_offense) { one(all, 'fort_offense', TWDS._('CALCULATOR_MP_ATT', 'MP Att'), tr); n++ }
    if (all.fort_defense) { one(all, 'fort_defense', TWDS._('CALCULATOR_MP_DEF', 'MP Def'), tr); n++ }
    th.colSpan = 2 * n
  }
  const tab = TWDS.createEle('table.generaldata', { last: area, className: 'TWDS_with_border' })
  if (advgun) {
    const tr = TWDS.createEle('tr', { last: tab })
    TWDS.createEle('th', { last: tr, colSpan: 12, textContent: TWDS._('CALCULATOR_TH_GENERAL_DATA', 'Not adventure specific data') })
  }
  let tr = TWDS.createEle('tr', { last: tab })
  one(all, 'strength', CharacterSkills.attributes.strength.name, tr)
  one(all, 'build', '-', tr)
  one(all, 'punch', '-', tr)
  one(all, 'tough', '-', tr)
  one(all, 'endurance', '-', tr)
  one(all, 'health', '-', tr)
  tr = TWDS.createEle('tr', { last: tab })
  one(all, 'flexibility', CharacterSkills.attributes.flexibility.name, tr)
  one(all, 'ride', '-', tr)
  one(all, 'reflex', '-', tr)
  one(all, 'dodge', '-', tr)
  one(all, 'hide', '-', tr)
  one(all, 'swim', '-', tr)
  tr = TWDS.createEle('tr', { last: tab })
  one(all, 'dexterity', CharacterSkills.attributes.dexterity.name, tr)
  one(all, 'aim', '-', tr)
  one(all, 'shot', '-', tr)
  one(all, 'pitfall', '-', tr)
  one(all, 'finger_dexterity', '-', tr)
  one(all, 'repair', '-', tr)
  tr = TWDS.createEle('tr', { last: tab })
  one(all, 'charisma', CharacterSkills.attributes.charisma.name, tr)
  one(all, 'leadership', '-', tr)
  one(all, 'tactic', '-', tr)
  one(all, 'trade', '-', tr)
  one(all, 'animal', '-', tr)
  one(all, 'appearance', '-', tr)
  tr = TWDS.createEle('tr', { last: tab })
  let flag = 0
  if (all.experience) { one(all, 'experience', TWDS._('CALCULATOR_EXP', 'Exp'), tr, 100, '+', '%'); flag = 1 }
  if (all.dollar) { one(all, 'dollar', TWDS._('CALCULATOR_MONEY', 'Money'), tr, 100, '+', '%'); flag = 1 }
  if (all.luck) { one(all, 'luck', TWDS._('CALCULATOR_LUCK', 'Luck'), tr, 100, '+', '%'); flag = 1 }
  if (all.drop) { one(all, 'drop', TWDS._('CALCULATOR_DROP2', 'Drop'), tr, 100, '+', '%'); flag = 1 }
  if (flag) {
    flag = 0
    tr = TWDS.createEle('tr', { last: tab })
  }
  if (all.speed) { one(all, 'speed', TWDS._('CALCULATOR_SPEED2', 'Speed'), tr, 100, '+', '%'); flag = 1 }
  if (all.regen) { one(all, 'regen', TWDS._('CALCULATOR_REGEN2', 'Regen.'), tr, 100, '+', '%'); flag = 1 }
  if (all.pray) { one(all, 'pray', TWDS._('CALCULATOR_PRAY', 'Pray'), tr); flag = 1 }
  if (flag) {
    flag = 0
    tr = TWDS.createEle('tr', { last: tab })
  }
  if (all.fort_offense) { one(all, 'fort_offense', TWDS._('CALCULATOR_MP_OFF', 'Off'), tr); flag = 1 }
  if (all.fort_defense) { one(all, 'fort_defense', TWDS._('CALCULATOR_MP_DEF', 'Def'), tr); flag = 1 }
  if (all.fort_resistance) { one(all, 'fort_resistance', TWDS._('CALCULATOR_RESISTANCE2', 'Res'), tr); flag = 1 }
  if (flag) {
    flag = 0
    tr = TWDS.createEle('tr', { last: tab })
  }
  if (all.fort_offense_sector) { one(all, 'fort_offense_sector', TWDS._('CALCULATOR_SECTOR_OFF', 'SectorOff'), tr); flag = 1 }
  if (all.fort_defense_sector) { one(all, 'fort_offense_sector', TWDS._('CALCULATOR_SECTOR_DEF', 'SectorDef'), tr); flag = 1 }
  if (all.fort_damage_sector) { one(all, 'fort_damage_sector', TWDS._('CALCULATOR_SECTOR_DMG', 'SectorDmg'), tr); flag = 1 }
}
TWDS.calculator.getselections = function (selectarea) {
  const skillweights = { }
  const bonusweights = { }
  for (let i = 0; i < TWDS.calculator.data.length; i++) {
    const d = TWDS.calculator.data[i]
    if (d.kind === 'group') continue
    if (d.kind === 'bonus') {
      const inp = TWDS.q1('.onebonus.bonus.' + d.name + ' input.value', selectarea)
      const val = parseFloat(inp.value) || 0
      if (val !== 0) {
        bonusweights[d.name] = val
      }
      if (d.name === 'joball') {
        if (inp.dataset.jobid) {
          const j = parseInt(inp.dataset.jobid)
          if (j) {
            bonusweights['job_' + j] = val
          }
        }
      }
    }
    if (d.kind === 'skill') {
      let inp = TWDS.q1('.onebonus.skill.' + d.name + ' input.value', selectarea)
      inp = parseFloat(inp.value) || 0
      if (inp !== 0) {
        skillweights[d.name] = inp
      }
    }
  }
  const w = TWDS.q1('.TWDS_calc_wgroup input:checked')
  if (w.value === 'shot') bonusweights.range = 1
  if (w.value === 'melee') bonusweights.melee = 1
  return {
    skills: skillweights,
    bonus: bonusweights
  }
}
TWDS.calculator.exec = function (filterarea, selectarea, resultarea, advmode) {
  const sels = TWDS.calculator.getselections()

  let include = 0
  const x = TWDS.q('.TWDS_calc_filterarea input:checked')
  for (let i = 0; i < x.length; i++) {
    include |= parseInt(x[i].value)
  }

  if (advmode) {
    const allowed = ['strength', 'flexibility', 'dexterity', 'charisma', 'fboffense', 'fbdefense']
    Object.keys(sels.bonus).each(function (x) {
      if (!allowed.includes(x)) {
        delete sels.bonus[x]
      }
    })
    sels.skills = {}
  } else {
    const forbidden = ['strength', 'flexibility', 'dexterity', 'charisma']
    Object.keys(sels.bonus).each(function (x) {
      if (forbidden.includes(x)) {
        delete sels.bonus[x]
      }
    })
  }

  console.log('PARA', sels.bonus, sels.skills, include)
  resultarea.textContent = ''
  TWDS.createEle({
    nodeName: 'h2',
    textContent: TWDS._('CALCULATOR_RESULT', 'Result'),
    last: resultarea,
    children: [
      {
        nodeName: 'span',
        textContent: advmode ? TWDS._('CALCULATOR_ADVMODE_INFO', ' (adventure mode)') : TWDS._('CALCULATOR_NORMALMODE_INFO', ' (normal mode)')
      }
    ]

  })

  // 16th: 53918000 53919000 53920000 53921000 53922000 53923000 53924000 53925000 53926000 53927000 53928000
  const str = TWDS.q1('#TWDS_CALC_extraitems input').value
  const extras = str.split(/ /).filter((x) => x > '').map((x) => parseInt(x))
  const gc = TWDS.genCalc.exec(sels.bonus, sels.skills, include, extras, advmode)
  for (let i = 0; i < gc.combos.length; i++) {
    const cd = TWDS.createEle({
      nodeName: 'div.combodisplay',
      last: resultarea
    })
    TWDS.createEle({
      nodeName: 'p',
      last: cd,
      textContent: TWDS._('CALCULATOR_RESULTLINE', 'This combination gives $p$ points', { p: gc.combos[i][0] })
    })
    const o = gc.combos[i][1]
    let gun = null
    for (let j = 0; j < o.length; j++) {
      const id = o[j]
      if (id === undefined) continue
      const it = ItemManager.get(id)
      const t = new tw2widget.InventoryItem(it).setCharacter(Character).getMainDiv()[0]
      if (it.type === 'left_arm') { gun = it }
      cd.appendChild(t)
    }
    if (i < 10) {
      TWDS.createEle('button', {
        textContent: TWDS._('CALCULATOR_WEAR', 'wear'),
        dataset: {
          ids: JSON.stringify(o)
        },
        onclick: function () {
          const x = JSON.parse(this.dataset.ids)
          TWDS.wearItemsHandler(x)
        },
        last: cd
      })
      TWDS.createEle('button', {
        textContent: TWDS._('CALCULATOR_SIMULATE', 'simulate'),
        dataset: {
          ids: JSON.stringify(o)
        },
        onclick: function () {
          const x = JSON.parse(this.dataset.ids)
          // TWDS.wearItemsHandler(x)
          TWDS.simulator.openwindow(x)
        },
        last: cd
      })
    }
    const t = TWDS.bonuscalc.getComboBonus(o, true)
    TWDS.calculator.showbonus(t, resultarea, advmode ? gun : null)

    TWDS.createEle('hr', { last: resultarea, style: { clear: 'both' } })
  }
  TWDS.createEle({
    nodeName: 'h2',
    textContent: TWDS._('CALCULATOR_ITEMS', 'Items (w/o set bonus)'),
    last: resultarea
  })
  for (let slno = 0; slno < Wear.slots.length; slno++) {
    const slot = Wear.slots[slno]
    if (!(slot in gc.items)) continue
    const o = gc.items[slot]
    for (let i = 0; i < o.length; i++) {
      const id = o[i]
      const t = new tw2widget.InventoryItem(ItemManager.get(id)).setCharacter(Character).getMainDiv()[0]
      resultarea.appendChild(t)
    }
    TWDS.createEle('hr', { last: resultarea, style: { clear: 'both' } })
  }
}
TWDS.calculator.buildjob = function () {
  return new west.job.Build({
    name: 'Construction',
    id: 1000,
    skills: {
      build: 3,
      leadership: 1,
      repair: 1
    }
  })
}
TWDS.calculator.findpreset = function (name) {
  let preset = null
  for (let i = 0; i < TWDS.calculator.presets.length; i++) {
    const n = TWDS.calculator.presets[i].name
    if (n === name) {
      preset = TWDS.calculator.presets[i]
    }
  }
  return preset
}
TWDS.calculator.findsaved = function (name) {
  const saved = JSON.parse(window.localStorage.TWDS_calculator_saved || '{}')
  if (name in saved) return saved[name]
  return null
}
TWDS.calculator.getsavedlist = function () {
  const saved = JSON.parse(window.localStorage.TWDS_calculator_saved || '{}')
  const savedkeys = Object.keys(saved)
  savedkeys.sort(function (a, b) {
    return a.localeCompare(b)
  })
  return savedkeys
}
TWDS.calculator.openmaintainwindow = function () {
  const myname = 'TWDS_calcmaintain_window'
  const win = wman.open(myname, TWDS._('CALCULATOR_MAINTAINTITLE', 'Maintain saved searches'))
  win.setMiniTitle('Maintain')
  const sp = new west.gui.Scrollpane()
  const content = TWDS.createEle('div', {
    className: 'TWDS_calc_container'
  })
  sp.appendContent(content)
  win.appendToContentPane(sp.getMainDiv())

  const saved = JSON.parse(window.localStorage.TWDS_calculator_saved || '{}')
  const savedkeys = Object.keys(saved)
  if (!savedkeys.length) {
    TWDS.createEle('p', {
      last: content,
      textContent: TWDS._('CALCULATOR_NOSAVEDSEARCHES', 'You have no saved searches.')
    })
    return
  }
  savedkeys.sort(function (a, b) {
    return a.localeCompare(b)
  })
  TWDS.createEle('p', {
    last: content,
    textContent: TWDS._('CALCULATOR_SAVEDSEARCHES', 'You have the following saved searches:')
  })
  const ol = TWDS.createEle('ol', {
    last: content
  })
  for (let i = 0; i < savedkeys.length; i++) {
    const k = savedkeys[i]
    const li = TWDS.createEle('li', {
      last: ol
    })
    TWDS.createEle('span.linklike', {
      last: li,
      dataset: {
        key: k
      },
      title: TWDS._('CALCULATOR_CLICKTOUSE', 'Click to use it in the calculator'),
      textContent: k,
      onclick: function () {
        TWDS.calculator.openwindow('saved/' + this.dataset.key)
      }
    })
    TWDS.createEle('button', {
      last: li,
      textContent: TWDS._('CALCULATOR_DELETESAVE', 'Delete this saved search'),
      onclick: function () {
        if (window.confirm(
          TWDS._('CALCULATOR_DELETECONFIRM', 'Really delete saved search $name$?', { name: k }))) {
          delete saved[k]
          window.localStorage.TWDS_calculator_saved = JSON.stringify(saved)
          TWDS.calculator.openmaintainwindow()
        }
      }
    })
  }
  TWDS.createEle('p', {
    last: content,
    textContent: TWDS._('CALCULATOR_MAINTAIN_INFO', 'Click on a name to see the search in the calculator.')
  })
}
TWDS.calculator.openwindow = function (calledpreset) {
  const myname = 'TWDS_calc_window'
  const win = wman.open(myname, TWDS._('CALCULATOR_TITLE', 'Calculator'), 'TWDS_calc_window')
  win.setMiniTitle('Calculator')

  const sp = new west.gui.Scrollpane()
  const content = TWDS.createEle('div', {
    className: 'TWDS_calc_container'
  })
  const presetarea = TWDS.createEle('div', {
    className: 'TWDS_calc_presetarea',
    last: content
  })
  const filterarea = TWDS.createEle('div', {
    className: 'TWDS_calc_filterarea',
    last: content
  })
  TWDS.createEle('hr', { last: content })
  const selectarea = TWDS.createEle('div', {
    className: 'TWDS_calc_selectarea',
    last: content
  })
  const mainchangecb = function () {
    TWDS.q1(".jobselect option[value='0']", presetarea).selected = true
    TWDS.q1(".presetselect option[value='0']", presetarea).selected = true
  }

  const jobselect = TWDS.createEle('select.jobselect', { last: presetarea })
  TWDS.createEle('option', {
    last: jobselect,
    value: 0,
    textContent: '---'
  })
  const allJobs = JobList.getSortedJobs('name')
  allJobs.push(TWDS.calculator.buildjob())
  allJobs.sort(function (a, b) {
    return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
  })
  for (let i = 0; i < allJobs.length; i++) {
    TWDS.createEle('option', {
      last: jobselect,
      value: allJobs[i].id,
      textContent: allJobs[i].name
    })
  }
  jobselect.onchange = function () {
    let job = JobList.getJobById(this.value)
    if (!job && parseInt(this.value) === 1000) { // "Build"
      job = TWDS.calculator.buildjob()
    }
    const c = this.closest('.TWDS_calc_container')
    const inp = TWDS.q('.TWDS_calc_selectarea input', c)
    for (let i = 0; i < inp.length; i++) {
      if (inp[i].type !== 'radio') {
        inp[i].value = 0
      }
      if (job !== undefined) {
        const bo = inp[i].parentNode.dataset.bonusname
        if (job.skills[bo]) { inp[i].value = job.skills[bo] }
      }
    }
    const jpi = TWDS.q1('.joball input', c)
    if (jpi) jpi.dataset.jobid = 0
    if (jpi && job && job.id) jpi.dataset.jobid = job.id
    if (job !== 'undefined') {
      if (jpi) {
        jpi.value = 1
      }
    }
  }

  const presetselect = TWDS.createEle('select.presetselect', { last: presetarea })
  TWDS.createEle('option', {
    last: presetselect,
    value: 0,
    textContent: '---'
  })
  for (let i = 0; i < TWDS.calculator.presets.length; i++) {
    const n = TWDS.calculator.presets[i].name
    const dis = TWDS.calculator.presets[i].disabled || false
    TWDS.createEle('option', {
      last: presetselect,
      value: n,
      textContent: n,
      disabled: dis
    })
  }
  const saved = JSON.parse(window.localStorage.TWDS_calculator_saved || '{}')
  const savedkeys = Object.keys(saved)
  if (savedkeys.length) {
    savedkeys.sort(function (a, b) {
      return a.localeCompare(b)
    })
    TWDS.createEle('option', {
      last: presetselect,
      value: 0,
      textContent: 'Save searches',
      disabled: true
    })
    for (let i = 0; i < savedkeys.length; i++) {
      const k = savedkeys[i]
      TWDS.createEle('option', {
        last: presetselect,
        value: 'saved/' + k,
        textContent: k,
        disabled: false
      })
    }
  }
  presetselect.onchange = function () {
    const c = this.closest('.TWDS_calc_container')

    const inp = TWDS.q('.TWDS_calc_selectarea input', c)
    for (let i = 0; i < inp.length; i++) {
      if (inp[i].type === 'number') {
        inp[i].value = 0
      }
    }
    const jpi = TWDS.q1('.joball input', c)
    if (jpi) jpi.dataset.jobid = 0

    let preset = TWDS.calculator.findpreset(this.value)
    if (preset === null && this.value.startsWith('saved/')) {
      preset = TWDS.calculator.findsaved(this.value.substr(6))
    }

    if (preset !== null) {
      if (preset.shot) {
        TWDS.q1(".TWDS_calc_wgroup input[value='shot'", selectarea).checked = true
      } else if (preset.melee) {
        TWDS.q1(".TWDS_calc_wgroup input[value='melee'", selectarea).checked = true
      } else {
        TWDS.q1(".TWDS_calc_wgroup input[value='egal'", selectarea).checked = true
      }
      for (const k in preset) {
        if (k !== 'name') {
          for (let i = 0; i < inp.length; i++) {
            if (inp[i].parentNode.dataset.bonusname === k) {
              inp[i].value = preset[k]
            }
          }
        }
      }
    }
  }

  TWDS.createEle({ nodeName: 'span', textContent: TWDS._('CALCULATOR_INCLUDE', 'include '), beforeend: filterarea })
  TWDS.createEle({
    nodeName: 'label',
    children: [
      { nodeName: 'input', type: 'checkbox', value: 1, checked: true },
      { nodeName: 'span', textContent: TWDS._('CALCULATOR_OWNED', 'owned, ') }
    ],
    id: 'TWDS_CALC_include_owned',
    beforeend: filterarea
  })
  TWDS.createEle({
    nodeName: 'label',
    children: [
      { nodeName: 'input', type: 'checkbox', value: 4 },
      { nodeName: 'span', textContent: TWDS._('CALCULATOR_TOWN_TRADERS', 'town traders, ') }
    ],
    id: 'TWDS_CALC_include_tradeable',
    beforeend: filterarea
  })
  TWDS.createEle({
    nodeName: 'label',
    children: [
      { nodeName: 'input', type: 'checkbox', value: 2 },
      { nodeName: 'span', textContent: TWDS._('CALCULATOR_AUCTIONABLE', 'auctionable, ') }
    ],
    id: 'TWDS_CALC_include_auctionable',
    beforeend: filterarea
  })
  TWDS.createEle({
    nodeName: 'label',
    children: [
      { nodeName: 'input', type: 'checkbox', value: 8 },
      { nodeName: 'span', textContent: TWDS._('CALCULATOR_NOTAUCTIONABLE', 'not auctionable') }
    ],
    id: 'TWDS_CALC_include_else',
    beforeend: filterarea
  })
  TWDS.createEle({
    nodeName: 'label',
    children: [
      { nodeName: 'span', textContent: ' (' },
      { nodeName: 'input', type: 'checkbox', value: 32 },
      {
        nodeName: 'a',
        href: '#',
        onclick: function () { TWDS.genCalc.blacklistwindow(); return false },
        textContent: TWDS._('CALCULATOR_BLACKLISTED', 'incl. blacklisted items')
      },
      { nodeName: 'span', textContent: '), ' }
    ],
    id: 'TWDS_CALC_include_blacklisted',
    beforeend: filterarea
  })
  TWDS.createEle({
    nodeName: 'label',
    children: [
      { nodeName: 'span', textContent: TWDS._('CALCULATOR_AND', 'and ') },
      { nodeName: 'input', type: 'checkbox', value: 16 },
      { nodeName: 'span', textContent: TWDS._('CALCULATOR_UNWEARABLE', 'unwearable items') }
    ],
    id: 'TWDS_CALC_include_unwearable',
    beforeend: filterarea
  })
  TWDS.createEle({
    nodeName: 'label',
    children: [
      { nodeName: 'span', textContent: TWDS._('CALCULATOR_ADDITIONAL_ITEMS', '. Additional items: ') },
      { nodeName: 'input', type: 'text', value: '' }
    ],
    id: 'TWDS_CALC_extraitems',
    title: TWDS._('CALCULATOR_EXTRAITEMS_TITLE',
      'Treat these items as if you have them. Format: a space separated list of (full, long) item ids'),
    beforeend: filterarea
  })

  const boncb = function (desc, g) {
    const div = TWDS.createEle('div', {
      className: 'onebonus ' + desc.kind + ' ' + desc.name,
      dataset: { bonusname: desc.name, bonuskind: desc.kind },
      last: g
    })
    if (desc.title) div.title = desc.title
    else if (desc.kind === 'skill') {
      div.title = CharacterSkills.skills[desc.name].name
    }
    TWDS.createEle('img', {
      src: desc.img,
      alt: desc.name,
      last: div
    })
    TWDS.createEle('input', {
      type: 'number',
      className: 'value',
      value: 0,
      last: div,
      onchange: mainchangecb
    })
  }
  let g = null
  for (let i = 0; i < TWDS.calculator.data.length; i++) {
    const x = TWDS.calculator.data[i]
    if (x.kind === 'group') {
      g = TWDS.createEle('div', { className: 'TWDS_calc_group ' + x.cls, last: selectarea })
      continue
    }
    if (x.kind === 'weaponselect') {
      const ct = TWDS.createEle('div', { className: 'TWDS_calc_wgroup ', last: g, style: { verticalAlign: 'top' } })
      TWDS.createEle('label', {
        last: ct,
        children: [
          { nodeName: 'input', type: 'radio', name: 'wtype', value: 'egal', checked: true },
          { nodeName: 'span', textContent: '?', alt: 'any weapon type', style: { fontSize: '45px' } }
        ]
      })
      TWDS.createEle('label', {
        last: ct,
        children: [
          { nodeName: 'input', type: 'radio', name: 'wtype', value: 'shot' },
          { nodeName: 'img', src: '/images/items/right_arm/custom_special_revolver.png?5', alt: 'melee weapons', style: { width: '45px' } }
        ]
      })
      TWDS.createEle('label', {
        last: ct,
        children: [
          { nodeName: 'input', type: 'radio', name: 'wtype', value: 'melee' },
          { nodeName: 'img', src: '/images/items/right_arm/custom_special_tomahawk.png?5', alt: 'melee weapons', style: { width: '45px' } }
        ]
      })
      continue
    }
    if (x.kind === 'attr') {
      boncb(x, g)
    }
    if (x.kind === 'skill') {
      boncb(x, g)
    }
    if (x.kind === 'bonus') {
      boncb(x, g)
    }
  }
  TWDS.createEle('button.doit', {
    textContent: TWDS._('CALCULATOR_DOIT', 'calculate'),
    last: selectarea,
    onclick: function () {
      TWDS.calculator.exec(filterarea, selectarea, resultarea, false)
    }
  })
  TWDS.createEle('button.doitadv', {
    textContent: TWDS._('CALCULATOR_DOITADV', '... in adventure mode'),
    title: TWDS._('CALCULATOR_DOITADV_TITLE', 'calculate in adventure mode'),
    last: selectarea,
    onclick: function () {
      TWDS.calculator.exec(filterarea, selectarea, resultarea, true)
    }
  })
  TWDS.createEle('span.savesearch', {
    last: selectarea,
    children: [
      {
        nodeName: 'input.name4save',
        type: 'text',
        placeholder: TWDS._('CALCULATOR_SAVENAME_PLACEHOLDER', 'name for the save'),
        value: ''
      },
      {
        nodeName: 'button.save',
        textContent: TWDS._('CALCULATOR_SAVE', 'save search'),
        onclick: function () {
          const sels = TWDS.calculator.getselections()
          let n = TWDS.q1('input.name4save', this.parentNode)
          n = n.value.trim()
          if (n === '') {
            new UserMessage(
              TWDS._('CALCULATOR_NEEDNAME', 'You need to specify a name for the saved search!'),
              UserMessage.TYPE_ERROR).show()
            return
          }
          const saved = JSON.parse(window.localStorage.TWDS_calculator_saved || '{}')
          saved[n] = { ...sels.bonus, ...sels.skills }
          window.localStorage.TWDS_calculator_saved = JSON.stringify(saved)
          new UserMessage(
            TWDS._('CALCULATOR_SAVEDAS', 'Saved as $name$', { name: n }), UserMessage.TYPE_SUCCESS).show()
        }
      }, {
        nodeName: 'button.maintainsaves',
        textContent: TWDS._('CALCULATOR_MAINTAINSAVES', 'maintain saved searches'),
        onclick: function () {
          TWDS.calculator.openmaintainwindow()
        }
      }
    ]
  })
  TWDS.createEle('hr', { last: content })
  const resultarea = TWDS.createEle('div', {
    last: content
  })

  if (calledpreset !== null) {
    const found = TWDS.q1(".presetselect option[value='" + calledpreset + "']", presetarea)
    if (found) {
      found.selected = true
      presetselect.onchange()
    }
  }

  const e = []
  for (let i = 0; i < Wear.slots.length; i++) {
    const sl = Wear.slots[i]
    const item = Wear.get(sl)
    if (item !== undefined) {
      e.push(item.obj.item_id)
    }
  }
  TWDS.createEle('h3', {
    textContent: TWDS._('CALCULATOR_CURRENT_GIVES', 'Your current equipment gives'),
    last: resultarea
  })

  const t = TWDS.bonuscalc.getComboBonus(e, true)
  TWDS.calculator.showbonus(t, resultarea)

  sp.appendContent(content)

  win.appendToContentPane(sp.getMainDiv())
}
TWDS.registerStartFunc(function () {
  TWDS.delegate(document.body, 'click', '.TWDS_calc_window .item_inventory', function (ev) {
    const id = this.dataset.twds_item_id
    if (id) {
      const bi = Bag.getItemByItemId(id)
      if (bi) { // calculator may be used to find things to shop for.
        Wear.carry(bi)
      }
    }
  })
})

TWDS.registerExtra('TWDS.calculator.openwindow',
  TWDS._('CALCULATOR_EXTRA_TITLE', 'Calculator'),
  TWDS._('CALCULATOR_EXTRA_DESC', 'Job point / bonus calculator')
)
