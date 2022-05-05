
TWDS.getSettingsContent = function () {
  const createVersionThing = function () {
    const thing = document.createElement('p')
    thing.classList.add('TWDS_VERSIONINFO')
    thing.textContent = 'Version: @REPLACEMYVERSION@'
    return thing
  }
  const createCacheThing = function () {
    const thing = document.createElement('div')
    let button
    let p
    let h

    h = document.createElement('h2')
    thing.appendChild(h)
    h.textContent = 'Clothes cache'

    p = document.createElement('p')
    thing.appendChild(p)
    p.textContent = 'Results of work cloth calculations are stored in a cache, and can be re-used in the job window. Here you can clear, fill or update many jobs at once, though re-calculating all jobs will take quite a bit of time on slow computers.'

    p = document.createElement('p')
    const info = document.createElement('p')
    info.id = 'TWDS_job_reload_info'
    thing.appendChild(info)
    TWDS.clothcache.info(info)

    p = document.createElement('p')
    thing.appendChild(p)
    button = document.createElement('button')
    p.appendChild(button)
    button.textContent = 'Clear cloth cache'
    button.onclick = TWDS.clothcache.clear

    p = document.createElement('p')
    thing.appendChild(p)
    p.textContent = 'Reload/fill the cache?'

    button = document.createElement('button')
    thing.appendChild(button)
    button.textContent = TWDS._('JOB_RELOAD_ALL', 'all')
    button.title = TWDS._('JOB_RELOAD_ALL_MOUSEOVER', 'Reload the cloth cache for all jobs')
    button.classList.add('TWDS_job_reload')
    button.dataset.reloadmode = 'all'

    button = document.createElement('button')
    thing.appendChild(button)
    button.textContent = TWDS._('JOB_RELOAD_MISSING', 'missing')
    button.title = TWDS._('JOB_RELOAD_MISSING_MOUSEOVER', 'Fills the cloth cache for all jobs not having one')
    button.classList.add('TWDS_job_reload')
    button.dataset.reloadmode = 'missing'

    button = document.createElement('button')
    thing.appendChild(button)
    button.textContent = TWDS._('JOB_RELOAD_1D', '1d')
    button.title = TWDS._('JOB_RELOAD_ALL_MOUSEOVER', 'Reload the cloth cache for all jobs where it is older than one day')
    button.classList.add('TWDS_job_reload')
    button.dataset.reloadmode = '1d'

    button = document.createElement('button')
    thing.appendChild(button)
    button.textContent = TWDS._('JOB_RELOAD_1D', '1w')
    button.title = TWDS._('JOB_RELOAD_ALL_MOUSEOVER', 'Reload the cloth cache for all jobs where it is older than one week')
    button.classList.add('TWDS_job_reload')
    button.dataset.reloadmode = '1w'

    button = document.createElement('button')
    thing.appendChild(button)
    button.textContent = TWDS._('JOB_RELOAD_1D', '30d')
    button.title = TWDS._('JOB_RELOAD_ALL_MOUSEOVER', 'Reload the cloth cache for all jobs where it is older than 30 days')
    button.classList.add('TWDS_job_reload')
    button.dataset.reloadmode = '30d'

    h = document.createElement('h2')
    thing.appendChild(h)
    h.textContent = 'Misc. settings'
    for (const x of TWDS.settingList.values()) {
      const mode = x[0]
      const name = x[1]
      const text = x[2]
      const div = document.createElement('div')
      div.className = 'TWDS_settingline'
      thing.appendChild(div)
      if (mode === 'bool') {
        const c = document.createElement('input')
        c.setAttribute('type', 'checkbox')
        c.setAttribute('value', '1')
        c.classList.add('TWDS_setting_bool')
        c.classList.add('TWDS_setting')
        c.dataset.settingName = name
        if (TWDS.settings[name]) { c.setAttribute('checked', 'checked') }
        div.appendChild(c)
        const span = document.createElement('span')
        span.textContent = text
        div.appendChild(span)
      }
    }

    return thing
  }
  const div = document.createElement('div')
  div.id = 'TWDS_settings'
  div.appendChild(createVersionThing())
  div.appendChild(createCacheThing())
  return div
}
TWDS.activateSettingsTab = function () {
  TWDS.activateTab('settings')
}

TWDS.settingsStartFunction = function () {
  TWDS.registerTab('settings',
    TWDS._('TABNAME_SETTINGS', 'Settings'),
    TWDS.getSettingsContent,
    TWDS.activateSettingsTab,
    true)

  $(document).on('change', '.TWDS_setting', function () {
    const name = this.dataset.settingName
    let v = this.value
    if (this.type === 'checkbox') {
      if (!this.checked) { v = false } else { v = true }
    }
    TWDS.settings[name] = v
    console.log('changed setting', name, 'to', v)
    window.localStorage.setItem('TWDS_settings', JSON.stringify(TWDS.settings))
    for (const x of TWDS.settingList.values()) {
      const n = x[1]
      if (name === n) {
        const cb = x[4]
        cb(v)
      }
    }
  })
  const t = window.localStorage.getItem('TWDS_setting_jobCacheSeconds')
  if (t !== null) { TWDS.jobCacheSecondsSetting = parseInt(t) }

  $(document).on('click', '.TWDS_job_reload', function () {
    let mode = this.dataset.reloadmode
    if (mode === 'all') {
      TWDS.clothcache.clear()
      mode = 'missing'
    }
    TWDS.clothcache.reload(mode)
  })
}
TWDS.registerStartFunc(TWDS.settingsStartFunction)
// vim: tabstop=2 shiftwidth=2 expandtab
