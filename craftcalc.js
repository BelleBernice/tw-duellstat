// vim: tabstop=2 shiftwidth=2 expandtab

TWDS.craftcalc = {}
TWDS.craftcalc.searchitem = function (str) {
}
TWDS.craftcalc.getcontent = function (win) {
  const content = TWDS.createEle({
    nodeName: 'div',
    className: 'TWDS_craftcalc_content',
    children: [
      { nodeName: 'h1', textContent: TWDS._('CRAFTCALC_TITLE', 'Craftcalc') }
    ]
  })
  const inputarea = TWDS.createEle({
    nodeName: 'div',
    className: 'TWDS_craftcalc_inputarea',
    last: content
  })
  TWDS.createEle({
    nodeName: 'input',
    type: 'number',
    onchange: function () {
      win._TWDS_number = this.value
      TWDS.craftcalc.reload(win)
    },
    style: {
      display: 'inline-block'
    },
    placeholder: TWDS._('CRAFTCALC_NUMBER', '#'),
    title: TWDS._('CRAFTCALC_NUMBER_TITLE', 'Number of items you want to craft'),
    value: win._TWDS_number,
    last: inputarea
  })
  const itemselector = TWDS.createEle({
    nodeName: 'select',
    onchange: function () {
      console.log('CHANGE', this, this.value)
      if (this.value) {
        win._TWDS_item = this.value
        TWDS.craftcalc.reload(win)
      }
    },
    style: {
      display: 'inline-block'
    },
    value: '',
    title: TWDS._('CRAFTCALC_ITEM_TITLE', 'Select the item you want to craft'),
    last: inputarea
  })
  console.log('DEREF is', win._TWDS_deref)
  const deref = parseInt(win._TWDS_deref)
  TWDS.createEle({
    nodeName: 'span',
    last: inputarea,
    style: {
      display: 'inline-block'
    },
    children: [
      {
        nodeName: 'select',
        children: [
          {
            nodeName: 'option',
            value: 0,
            textContent: TWDS._('CRAFTCALC_DEREF_BASE', 'to base items'),
            selected: deref === 0
          },
          {
            nodeName: 'option',
            value: 1,
            textContent: TWDS._('CRAFTCALC_DEREF_OTHER', 'to items ofters have to craft'),
            selected: deref === 1
          },
          {
            nodeName: 'option',
            value: 2,
            textContent: TWDS._('CRAFTCALC_DEREF_CRAFTED', 'to crafted items'),
            selected: deref === 2
          }
        ],
        onchange: function () {
          win._TWDS_deref = this.value
          TWDS.craftcalc.reload(win)
        },
        style: {
          display: 'inline-block'
        }
      }
    ]
  })
  const a = win._TWDS_recipes
  const b = []
  const did = {}
  for (const recid of Object.keys(a)) {
    const itemid = a[recid]
    if (itemid in did) continue
    did[itemid] = true
    b.push([itemid, ItemManager.get(itemid).name, recid])
  }
  b.sort(function (a, b) {
    return a[1].trim().localeCompare(b[1].trim())
  })
  TWDS.createEle({
    nodeName: 'option',
    value: '',
    textContent: TWDS._('PLEASE_SELECT', 'please select'),
    last: itemselector
  })
  for (let i = 0; i < b.length; i++) {
    const n = b[i][1]
    const r = b[i][2]
    TWDS.createEle({
      nodeName: 'option',
      value: r,
      textContent: n,
      selected: win._TWDS_item === r,
      last: itemselector
    })
  }

  const count = win._TWDS_number
  const r = win._TWDS_item
  if (count <= 0 || parseInt(r) <= 0) {
    return content
  }
  const resultarea = TWDS.createEle({
    nodeName: 'table',
    className: 'TWDS_craftcalc_resultarea',
    last: content
  })

  const things = {}

  const handlerecipe = function (r, count) {
    const it = ItemManager.get(r)
    if (!it) {
      console.log('strange: handlerecipe got nothing for recipe', r)
      return
    }
    if (it.type !== 'recipe') {
      console.log('strange: handlerecipe got != recipe', r, it)
      return
    }
    for (let i = 0; i < it.resources.length; i++) {
      const itemid = it.resources[i].item
      if (itemid in win._TWDS_craftitems) {
        if (deref === 0) {
          handlerecipe(win._TWDS_craftitems[itemid], count * it.resources[i].count)
          continue
        }
        if (deref === 1) {
          if ((itemid in TWDS.crafting.mycraftableitems)) {
            handlerecipe(win._TWDS_craftitems[itemid], count * it.resources[i].count)
            continue
          }
        }
      }
      if (!(itemid in things)) {
        things[itemid] = 0
      }
      things[itemid] += count * it.resources[i].count
      // console.log("for",count, it.name, ":", it.resources[i].count,item.name, "=",things[itemid]);
    }
  }
  handlerecipe(r, count)
  const allitems = []
  console.log('things', things)
  for (const i of Object.keys(things)) {
    const item = ItemManager.get(i)
    allitems.push([i, things[i], item.name])
  }
  allitems.sort(function (a, b) {
    return a[2].trim().localeCompare(b[2].trim())
  })

  const cid = win._TWDS_recipes[win._TWDS_item]
  const cit = ItemManager.get(cid)
  TWDS.createEle({
    nodeName: 'h1',
    textContent: cit.name,
    last: resultarea
  })
  const popup = new ItemPopup(cit, {}).popup.getXHTML()
  TWDS.createEle({
    nodeName: 'p',
    last: resultarea,
    childNodes: [
      {
        nodeName: 'img',
        className: 'tw_item inventory_item',
        src: cit.image,
        alt: cit.name,
        title: popup
      }
    ]
  })

  TWDS.createEle({ nodeName: 'hr', last: resultarea })
  TWDS.createEle({
    nodeName: 'h2',
    textContent: TWDS._('CRAFTCALC_RESOURCES_NEEDED', 'Resources needed'),
    last: resultarea
  })

  const resulttable = TWDS.createEle({
    nodeName: 'table',
    last: resultarea
  })
  TWDS.createEle({
    nodeName: 'thead',
    last: resulttable,
    children: [
      {
        nodeName: 'tr',
        children: [
          { nodeName: 'th', textContent: '#' },
          { nodeName: 'th', textContent: TWDS._('CRAFTCALC_ITEM', 'item') },
          { nodeName: 'th', textContent: TWDS._('CRAFTCALC_ITEM_NAME', 'name') }
        ]
      }
    ]
  })
  const tbody = TWDS.createEle({
    nodeName: 'tbody',
    last: resulttable
  })
  for (let i = 0; i < allitems.length; i++) {
    const it = ItemManager.get(allitems[i][0])
    const popup = new ItemPopup(it, {}).popup.getXHTML()
    const tr = TWDS.createEle({
      nodeName: 'tr',
      last: tbody
    })
    TWDS.createEle({
      nodeName: 'td',
      textContent: allitems[i][1],
      last: tr
    })
    TWDS.createEle({
      nodeName: 'td',
      last: tr,
      childNodes: [
        {
          nodeName: 'img',
          className: 'tw_item inventory_item',
          src: it.image,
          alt: it.name,
          title: popup
        }
      ]
    })
    TWDS.createEle({
      nodeName: 'td',
      textContent: allitems[i][2],
      last: tr
    })
  }
  TWDS.createEle({ nodeName: 'hr', last: resultarea })
  TWDS.createEle({
    nodeName: 'h2',
    textContent: TWDS._('CRAFTCALC_CHAT_MESSAGES', 'For chat and messages'),
    last: resultarea
  })
  const resultchat = TWDS.createEle({
    nodeName: 'div',
    last: resultarea
  })
  resultchat.textContent = win._TWDS_number
  resultchat.textContent += ' [item=' + cid + '] = '
  for (let i = 0; i < allitems.length; i++) {
    if (i) { resultchat.textContent += ' + ' }
    resultchat.textContent += allitems[i][1]
    resultchat.textContent += ' [item=' + allitems[i][0]
    resultchat.textContent += ']'
  }
  TWDS.createEle({ nodeName: 'hr', last: resultarea })
  TWDS.createEle({
    nodeName: 'h2',
    textContent: TWDS._('CRAFTCALC_COPY_EXPORT', 'Copy / Export'),
    last: resultarea
  })
  const resultstorage = TWDS.createEle({
    nodeName: 'div',
    className: 'TWDS_craftcalc_storagearea',
    last: resultarea
  })
  const tmp = {}

  for (let i = 0; i < allitems.length; i++) {
    const id = allitems[i][0]
    tmp[id] = [allitems[i][1],
      allitems[i][1] + ' ' + TWDS._('CRAFTCALC_FOR', 'for') + ' ' + count + ' ' + cit.name]
  }
  resultstorage.textContent = JSON.stringify(tmp)

  return content
}
TWDS.craftcalc.open = function (key) {
  const wid = 'TWDS_craftcalc_' + key
  const win = wman.open(wid, 'set', 'TWDS_craftcalc')
  win.setTitle(TWDS._('CRAFTCALC_WINDOW_TITLE', 'Craftcalc'))
  if (!('_TWDS_number' in win)) {
    win._TWDS_number = 1
    win._TWDS_item = 0
    win._TWDS_deref = 0
    const a = ItemManager.getAll()
    win._TWDS_recipes = {}
    win._TWDS_craftitems = {}
    for (const iid of Object.keys(a)) {
      const it = a[iid]
      if ('craftitem' in it) {
        win._TWDS_recipes[it.item_id] = it.craftitem
        win._TWDS_craftitems[it.craftitem] = it.item_id
      }
    }
  }
  const sp = new west.gui.Scrollpane()
  const content = TWDS.craftcalc.getcontent(win)
  sp.appendContent(content)

  win.appendToContentPane(sp.getMainDiv())
}
TWDS.craftcalc.reload = function (win) {
  const content = TWDS.craftcalc.getcontent(win)
  const old = TWDS.q1('.TWDS_craftcalc_content', win.getMainDiv())
  const sp = old.parentNode
  sp.innerHTML = ''
  sp.appendChild(content)
}
TWDS.registerExtra('TWDS.craftcalc.open',
  TWDS._('CRAFTCALC_TITLE', 'Craftcalc'),
  TWDS._('CRAFTCALC_DESC', 'Calculate items needed for crafting')
)
