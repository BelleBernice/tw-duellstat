// vim: tabstop=2 shiftwidth=2 expandtab

TWDS.banking = {}
TWDS.banking.deposithelper = function (t) {
  if (Character.money <= 0) { return }
  window.BankWindow.townid = t
  window.BankWindow.DOM = (new west.gui.Textfield('tb_balance_input_' + t))
    .setSize(10).setValue(window.Character.money).getMainDiv()
  window.BankWindow.Balance.add()
}
TWDS.banking.depositinit = function () {
  const deposit = TWDS.q1('#deposit')
  if (deposit) {
    if (TWDS.settings.banking_deposit_button) {
      $(deposit).addMousePopup('Deposit your cash.')
      deposit.onclick = function (e) {
        if (Character.money <= 0) {
          return
        }
        (new west.gui.Dialog('Deposit your Cash (click when in town)',
          jQuery("<span class='TWDS_banking'>Money: " + Character.money + '</span>'))).setIcon(west.gui.Dialog.SYS_QUESTION).setModal(true, false).addButton('yes', function () {
          TWDS.banking.deposithelper(1)
        }).addButton('no').show()
      }
    } else {
      delete deposit.onclick
    }
  }
}
TWDS.banking.autohome_check = function () {
  if (Character.homeTown.town_id === 0 || Character.money <= 0) {
    return
  }
  if (Character.position.x !== Character.homeTown.x || Character.position.y !== Character.homeTown.y) { return }
  (new west.gui.Dialog('Deposit your Cash',
    jQuery("<span class='TWDS_autodeposit'>You have arrived to your Hometown. Would you like to deposit your Cash?<br />Money: " + Character.money + '</span>')))
    .setIcon(west.gui.Dialog.SYS_QUESTION).setModal(true, false)
    .addButton('yes', function () {
      TWDS.banking.deposithelper(Character.homeTown.town_id)
    }).addButton('no').show()
}

TWDS.banking.autohome_toggle = function (v) {
  if (!v) {
    window.EventHandler.unlisten('position_change', TWDS.banking.autohome_check)
  } else {
    window.EventHandler.listen('position_change', TWDS.banking.autohome_check)
    TWDS.banking.autohome_check()
  }
}
TWDS.registerStartFunc(function () {
  TWDS.registerSetting('bool', 'banking_deposit_button',
    'Clicking on the bank account in the top row opens a dialogue to deposit your cash.', true, TWDS.banking.depositinit,
    'Banking'
  )
  TWDS.registerSetting('bool', 'banking_auto_hometown',
    'Open the deposit dialogue when arriving in your home town.', false, TWDS.banking.autohome_toggle,
    'Banking'
  )
})
