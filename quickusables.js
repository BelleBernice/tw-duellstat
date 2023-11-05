// vim: tabstop=2 shiftwidth=2 expandtab

TWDS.quickusables = {}
TWDS.quickusables.sb = {}

TWDS.quickusables.openwrapper = function (eventdata) {
  return TWDS.quickusables.open(eventdata)
}

TWDS.quickusables.usables = null
TWDS.quickusables.catnames = {
  energy: TWDS._('QUICKUSABLES_ENERGY', 'Energy'),
  health: TWDS._('QUICKUSABLES_HEALTH', 'Health'),
  workmotivation: TWDS._('QUICKUSABLES_WMOT', 'Work motivation'),
  duelmotivation: TWDS._('QUICKUSABLES_DMOT', 'Duel motivation'),
  drop: TWDS._('QUICKUSABLES_DROP', 'Drop chance'),
  experience: TWDS._('QUICKUSABLES_XP', 'Experience'),
  experiencelevel: TWDS._('QUICKUSABLES_XPLEVEL', 'Exp. as % of level'),
  luck: TWDS._('QUICKUSABLES_LUCK', 'Luck'),
  money: TWDS._('QUICKUSABLES_MONEY', 'Money'),
  duel: TWDS._('QUICKUSABLES_DUEL', 'Duel'),
  fortbattle: TWDS._('QUICKUSABLES_FB', 'Fort battle'),
  multiplayer: TWDS._('QUICKUSABLES_MPI', 'Multiplayer'),
  movement: TWDS._('QUICKUSABLES_MOVEMENT', 'Movement'),
  openunpack: TWDS._('QUICKUSABLES_OPENUNPACK', 'Open/unpack'),
  laborpoints: TWDS._('QUICKUSABLES_LP', 'Labor points'),
  bonds: TWDS._('QUICKUSABLES_BONDS', 'Bonds'),
  cempasuchils: TWDS._('QUICKUSABLES_CEMPASUCHILS', 'Cempasúchils'),
  eastereggs: TWDS._('QUICKUSABLES_EASTEREGGS', 'Easter eggs'),
  fireworks: TWDS._('QUICKUSABLES_FIREWORKS', 'Fireworks'),
  hearts: TWDS._('QUICKUSABLES_HEARTS', 'Hearts'),
  pretzels: TWDS._('QUICKUSABLES_PRETZELS', 'Pretzels'),
  regeneration: TWDS._('QUICKUSABLES_REGENERATION', 'Regeneriation'),
  skillpoints: TWDS._('QUICKUSABLES_SKILLPOINTS', 'Skill points'),
  premium: TWDS._('QUICKUSABLES_PREMIUM', 'Premium'),
  debuff: TWDS._('QUICKUSABLES_DEBUFF', 'Debuff'),
  quest: TWDS._('QUICKUSABLES_QUEST', 'Quest'),
  other: TWDS._('QUICKUSABLES_OTHER', 'Other')
}
TWDS.quickusables.getcatdesc = function (cat) {
  if (cat in TWDS.quickusables.catnames) { return TWDS.quickusables.catnames[cat] }
  return cat
}
TWDS.quickusables.hascat = function (cat) {
  return (cat in TWDS.quickusables.catnames)
}
TWDS.quickusables.getcategories = function (kind) {
  if (TWDS.quickusables.usables === null) {
    TWDS.quickusables.initusables()
  }
  const out = []
  for (const i of Object.keys(TWDS.quickusables.usables)) {
    if (i.match(/_x$/)) continue
    if (kind === 0 || TWDS.quickusables.flags[i] & kind) { out.push(i) }
  }
  return out
}
TWDS.quickusables.addcat = function (what, where) {
  TWDS.quickusables.usables[what] = {}
  TWDS.quickusables.flags[what] = where
}
TWDS.quickusables.initusables = function () {
  // 1 is market, 2 is event currency
  TWDS.quickusables.flags = {
    energy: 1,
    health: 1,
    workmotivation: 1,
    duelmotivation: 1,
    drop: 1,
    experience: 1,
    experiencelevel: 0,
    money: 1,
    luck: 1,
    duel: 1,
    fortbattle: 1,
    laborpoints: 1,
    multiplayer: 1,
    openunpack: 1,
    movement: 1,
    bonds: 0,
    pretzels: 2,
    hearts: 2,
    fireworks: 2,
    cempasuchils: 2,
    eastereggs: 2,
    regeneration: 1,
    skillpoints: 1,
    premium: 0,
    debuff: 0,
    quest: 0,
    other: 0
  }
  TWDS.quickusables.usables = {}
  for (const i of Object.keys(TWDS.quickusables.flags)) {
    TWDS.quickusables.usables[i] = []
  }

  const clean = function (str) {
    if (str.search(/Avatar.*:/) !== -1) {
      str = str.replace(/:.*/, '')
    }
    // TWIR touppercases \d :-(
    str = str.replace('+', '')
    str = str.replace(/([0-9]+)/g, '[0-9]+')
    str = str.replace('$', '\\$')
    str = str.replace('(', '\\(')
    str = str.replace(')', '\\)')
    return str // .replace(/%/, '')
  }
  const doit = function (id, key, idx) {
    const it = ItemManager.getByBaseId(id)
    try {
      TWDS.quickusables.usables[key].push(clean(it.usebonus[idx || 0]))
    } catch (e) {
      console.log('strange', 'no item for #', id, 'needed for quickusable', key, idx)
    }
  }
  doit(1943, 'energy')
  doit(1974, 'health')
  doit(1891, 'workmotivation')
  doit(1882, 'duelmotivation')
  doit(2465, 'luck')
  doit(2466, 'drop')
  doit(2467, 'experience')
  doit(2468, 'money')
  doit(2559, 'money', 0)
  doit(2204, 'money', 0)
  doit(2741, 'multiplayer', 1)
  doit(2741, 'multiplayer', 2)
  doit(1926, 'movement')
  doit(1927, 'movement')
  doit(1940, 'laborpoints')
  doit(1946, 'health', 1)
  doit(1901, 'duel')
  doit(1863, 'duel', 0)
  doit(1863, 'duel', 1)
  doit(1864, 'duel', 0)
  doit(1864, 'duel', 1)
  doit(1871, 'duel', 1)
  doit(1872, 'duel', 1)
  doit(51125, 'duel', 0)
  doit(51125, 'duel', 1)
  doit(2741, 'fortbattle', 0)
  doit(1873, 'fortbattle', 1) // gemüsetasche, leiten
  doit(1946, 'fortbattle', 0) // amulett, ausweichen
  doit(1946, 'fortbattle', 1) // amulett, lp
  doit(2525, 'fortbattle', 1) // zaubertinte, fallen stellen
  doit(2525, 'fortbattle', 2) // zaubertinte, verstecken
  doit(51775, 'openunpack', 0) // Motivationsbox, "Etwas zum Auspacken".
  doit(51595, 'openunpack', 0) // Metallschädel,  "Enthält eine der folgenden Sammelkarten"
  doit(374, 'openunpack', 0) // Osterkiste,  "Enthält einen der folgenden Gegenstände
  doit(2136, 'bonds', 0) // bonds
  doit(2196, 'experiencelevel', 0) // experience to your next level
  doit(371, 'pretzels', 0)
  doit(2562, 'hearts', 0)
  doit(2675, 'cempasuchils', 0)
  doit(2619, 'fireworks', 0)
  doit(51981, 'eastereggs', 0)
  doit(51599, 'regeneration', 0)
  doit(21340, 'premium', 0)
  doit(21341, 'premium', 0)
  doit(21342, 'premium', 0)
  doit(21343, 'premium', 0)
  doit(50991, 'premium', 0)
  doit(2482, 'premium', 0) // nuggetbeutel
  doit(2472, 'premium', 0) // versicherung
  doit(1977, 'debuff', 0)
  doit(1978, 'debuff', 0)
  doit(1979, 'debuff', 0)
  doit(51871, 'debuff', 0)
  doit(53454, 'debuff', 0)
  doit(2486, 'other', 0) // tent
  doit(50086, 'other', 0) // avatar stuff

  // skill and attribute points
  // +2 Stärke / strength
  // +15 Handeln / trading
  // +15 Arbeitpunkte auf Handeln (look, a false positive...)
  const a = []
  for (const some of Object.values(CharacterSkills.keyNames)) {
    a.push(clean(some))
  }
  const collected = '(' + a.join('|') + ')'
  let str = ItemManager.get(1879000).usebonus[0] // strength
  str = clean(str)
  str = str.replace(CharacterSkills.keyNames.strength, collected)
  TWDS.quickusables.usables.skillpoints.push(str)
}
TWDS.quickusables.classifymatchstring = function (item, cat) {
  if (!('usetype' in item)) return false
  if (item.usetype === 'none') return false
  const ub = item.usebonus
  const searchstrings = TWDS.quickusables.usables[cat]
  if (searchstrings === undefined) { // no known cat
    return false
  }
  let found = false
  for (let i = 0; i < ub.length; i++) {
    const b = ub[i]
    if (b === null) continue
    for (let j = 0; j < searchstrings.length; j++) {
      if (b.search(searchstrings[j]) !== -1) {
        found = true
        break
      }
    }
  }
  if (!found) return false
  if ((cat + '_x') in TWDS.quickusables.usables) {
    const exclusions = TWDS.quickusables.usables[cat + '_x']
    for (let k = 0; k < ub.length; k++) {
      for (let x = 0; x < exclusions.length; x++) {
        if (ub[k].toLocaleLowerCase().search(exclusions[x].toLocaleLowerCase()) !== -1) {
          return false
        }
      }
    }
  }
  return true
}
TWDS.quickusables.classify = function (item) {
  if (typeof item === 'number') { item = ItemManager.get(item) }
  const cats = []
  if ('TWDS.classification' in item._memo) { return item._memo.TWDS_classification }
  for (const catname of Object.keys(TWDS.quickusables.catnames)) {
    if (TWDS.quickusables.classifymatchstring(item, catname)) {
      cats.push(catname)
    }
  }
  if (item.quest) {
    cats.push('quest')
  }
  item._memo.TWDS_classification = cats
  return cats
}
TWDS.quickusables.check = function () {
  const all = ItemManager.getAll()
  let n = 0
  for (const it of Object.values(all)) {
    if (it.type !== 'yield') continue
    if (it.spec_type === 'mapdrop') continue
    if (it.spec_type === 'crafting') continue
    if (it.usebonus === null && it.usetype === 'none') continue
    if (it.set) continue

    if (it.usebonus[0].search('Avatargegenstand:') === 0) continue // german
    const cats = TWDS.quickusables.classify(it)
    if (cats.length) continue
    console.log(it.item_id, it.name, 'no classification', cats, it)
    n++
    if (n === 20) {
      break
    }
  }
}
TWDS.quickusables.match = function (item, cat) {
  if (typeof item === 'number') { item = ItemManager.get(item) }
  if (TWDS.quickusables.usables === null) {
    TWDS.quickusables.initusables()
  }

  const cats = TWDS.quickusables.classify(item)
  if (cats.includes(cat)) return true
  return false
}
TWDS.quickusables.matchnumber = function (item, cat) {
  if (TWDS.quickusables.usables === null) {
    TWDS.quickusables.initusables()
  }
  const cats = TWDS.quickusables.classify(item)
  if (!cats.includes(cat)) return false

  if (!('usetype' in item)) return 0
  if (item.usetype === 'none') return 0
  const ub = item.usebonus
  const searchstrings = TWDS.quickusables.usables[cat]
  if (searchstrings === undefined) { // no known cat
    return 0
  }
  let found = false
  let num = 0
  for (let i = 0; i < ub.length; i++) {
    const b = ub[i]
    if (b === null) continue
    for (let j = 0; j < searchstrings.length; j++) {
      if (b.search(searchstrings[j]) !== -1) {
        found = true
        const rx = /(\d+)/
        const t = b.match(rx)
        if (t !== null) {
          num += parseFloat(t[1])
        }
      }
    }
  }
  if (!found) return 0
  return num
}
TWDS.quickusables.showusables = function (choice) {
  Inventory.open() // TWIR needs that if the inventory hasn't been opened
  if (TWDS.quickusables.usables === null) {
    TWDS.quickusables.initusables()
  }
  if (!(choice in TWDS.quickusables.usables)) {
    console.log('choice', choice, 'not in', TWDS.quickusables.usables)
    return
  }
  const translatedchoices = TWDS.quickusables.usables[choice]
  if (translatedchoices.length === 0) {
    console.log('choice', choice, 'has empty translation', TWDS.quickusables.usables)
    return
  }

  const filtered = []
  for (let j = 0; j < translatedchoices.length; j++) {
    const found = Bag.search(translatedchoices[j])
    for (let i = 0; i < found.length; i++) {
      if ('usetype' in found[i].obj && found[i].obj.usetype !== 'none') {
        const v = TWDS.quickusables.matchnumber(found[i].obj, choice)
        filtered.push([found[i], v])
      }
      /*
      if ('usetype' in found[i].obj && found[i].obj.usetype !== 'none') {
        console.log('SEARCH', j, translatedchoices[j], 'FOUND', found[i])
        let exclude = false
        if ((choice + '_x') in TWDS.quickusables.usables) {
          const ub = found[i].obj.usebonus
          const exclusions = TWDS.quickusables.usables[choice + '_x']
          console.log('XX', exclusions)
          for (let k = 0; k < ub.length; k++) {
            for (let x = 0; x < exclusions.length; x++) {
              if (ub[k].toLocaleLowerCase().search(exclusions[x].toLocaleLowerCase()) !== -1) {
                console.log('SEARCH', j, translatedchoices[j], 'EXCLUSE', found[i])
                exclude = true
              }
            }
          }
        }
        if (!exclude) {
          filtered.push(found[i])
        }
      }
      */
    }
  }
  console.log('QU', filtered[0], filtered[1])
  filtered.sort(function (a, b) { return a[1] - b[1] })
  console.log('QS', filtered[0], filtered[1])
  for (let i = 0; i < filtered.length; i++) {
    console.log('sort #', i, filtered[i][1], filtered[i][0].obj.name)
    filtered[i] = filtered[i][0]
  }
  Inventory.open()
  Inventory.showSearchResult(filtered)
}
TWDS.quickusables.open = function (eventdata) {
  console.log('quickusables.open')
  const sb = (new west.gui.Selectbox(true))
    .setHeight('347px')
    .addListener(function (choice) {
      TWDS.quickusables.showusables(choice)
    })
  sb.addClass('TWDS_quickusableshelper')
  sb.addItem('energy', TWDS._('QUICKUSABLES_ENERGY', 'Energy'))
  sb.addItem('health', TWDS._('QUICKUSABLES_HEALTH', 'Health'))
  sb.addItem('workmotivation', TWDS._('QUICKUSABLES_WMOT', 'Work motivation'))
  sb.addItem('duelmotivation', TWDS._('QUICKUSABLES_DMOT', 'Duel motivation'))

  const x = [
    ['drop', TWDS._('QUICKUSABLES_DROP', 'Drop chance')],
    ['experience', TWDS._('QUICKUSABLES_XP', 'Experience')],
    ['luck', TWDS._('QUICKUSABLES_LUCK', 'Luck')],
    ['luck', TWDS._('QUICKUSABLES_MONEY', 'Money')],
    ['duel', TWDS._('QUICKUSABLES_DUEL', 'Duel')],
    ['fortbattle', TWDS._('QUICKUSABLES_FB', 'Fort battle')],
    ['multiplayer', TWDS._('QUICKUSABLES_MPI', 'Multiplayer')],
    ['movement', TWDS._('QUICKUSABLES_MOVEMENT', 'Movement')],
    ['laborpoints', TWDS._('QUICKUSABLES_LP', 'Labor points')]
  ]
  x.sort(function (a, b) {
    return a[1].toLocaleLowerCase().localeCompare(b[1].toLocaleLowerCase())
  })
  for (let i = 0; i < x.length; i++) {
    sb.addItem(x[i][0], x[i][1])
  }
  sb.show(eventdata)
}

TWDS.quickusables.settingchanged = function (v) {
  const bar = TWDS.q1('#ui_character_container .energy_bar')
  if (!bar) return
  if (v) {
    bar.addEventListener('click', TWDS.quickusables.openwrapper)
    bar.classList.add('TWDS_clickable')
  } else {
    bar.removeEventListener('click', TWDS.quickusables.openwrapper)
    bar.classList.remove('TWDS_clickable')
  }
}
TWDS.registerStartFunc(function () {
  TWDS.registerSetting('bool', 'quickusables',
    TWDS._('QUICKUSABLES_SETTING',
      'A click on the energy bar opens a buff selection.'),
    true, TWDS.quickusables.settingchanged, 'misc', null)
})
