TWDS.insertStyles = function () {
  const css = `
    .TWDS_blinking {
      animation: blinker 0.5s linear 120
    }
    #TWDS_settings h2 {
      font-size:22px;
    }
    #TWDS_settings h2, h3 {
      margin-bottom:0.5em;
      margin-top:1em;
    }
    @keyframes blinker {
      50% {
        opacity: 0;
      }
    }
    .TWDS_chat_highlight {
      background-color: black;
      color:white;
      border-left:2px solid red;
      border-right:2px solid red;
      text-decoration: underline red;
    }

    .TWDS_VERSIONINFO {
      color: #333;
      text-align: right;
      padding: 0 2px 5px 0;
    }
    .TWDS .tw2gui_scrollpane {
      margin:1em 0;
    }
    .TWDS_tabcontent {
      padding-bottom:1em;
    }
    #TWDS_job .hasMousePopup,
    #TWDS_job [title],
    #TWDS_equipment .hasMousePopup,
    #TWDS_equipment [title],
    #TWDS_bonuslist .hasMousePopup,
    #TWDS_bonuslist [title],
    #TWDS_bonus .hasMousePopup,
    #TWDS_bonus [title] {
      text-decoration: dotted underline;
    }
    #TWDS_bonuslist td:first-child {
      text-align:right;
    }
    #TWDS_equipment { border-collapse: collapse;}
    #TWDS_equipment .headrow {
      font-weight:bold;
    }
    #TWDS_equipment .datarow {
      text-align:right;
    }
    #TWDS_equipment .hasMousePopup {
      text-decoration: dotted underline;
    }
    #TWDS_equipment .datarow th:nth-child(1) {
      text-align:left;
      font-weight:normal;
    }
    #TWDS_equipment .best { color: #0c0; font-weight:bold; }
    #TWDS_equipment .verygood { color: #0c0; }
    #TWDS_equipment .good { color: green;}
    #TWDS_equipment .ok { }
    #TWDS_equipment .other { color: #800;}
    #TWDS_equipment tr, #TWDS_equipment td, #TWDS_table th { border:1px solid #888;}
    #TWDS_equipment td, #TWDS_equipment th { padding:1px 2px;}
    .TWDS_button {
      min-width:3.5em;
      border-color:#2B1C19;
      color:white;
      border-width:2px;
      margin:1px;
      border-style:inset;
      padding:1px 1px;
      line-height:18px;
      cursor:pointer;
      background: rgb(46,16,2);
      background: radial-gradient(circle, rgba(46,16,2,1) 0%, rgba(93,63,30,1) 49%, rgba(60,29,6,1) 100%);
    }
    .TWDS_button_small {
      min-width:auto;
    }
    .TWDS_specialequipment_button {
      margin:0.2em 0.5em;
    }
    .TWDS_SPEC_spec {
      display:flex;
      justify-content:space-between;
    }
    .TWDS_SPEC_SKILLS {
      width:100%;
    }
    .TWDS_SPEC_SKILLS td {
      text-align:center;
    }
    .TWDS_SPEC_SKILLS button {
      min-width:100px;
    }
    .TWDS_spec_strength {
      background-color:#8003;
      border-color:red;
    }
    .TWDS_spec_flexibility {
      background-color:#0803;
      border-color:green;
    }
    .TWDS_spec_dexterity {
      background-color:#0083;
      border-color:blue;
    }
    .TWDS_spec_charisma {
      background-color:#8803;
      border-color:yellow;
    }

    #TWDS_people { border-collapse: collapse; width:100%;}
    #TWDS_people tr, #TWDS_people td, #TWDS_people th { border:1px solid #888;}
    #TWDS_people tbody td {
      padding:1px 2px;
      text-align:right;
    }
    #TWDS_people tbody th {
      padding:1px 2px;
      text-align:left;
      text-decoration:underline;
      cursor:pointer;
      font-weight:normal;
    }
    #TWDS_people_subtab table {
      border-collapse: collapse;
    }
    #TWDS_people_subtab .openreport {
      text-decoration:underline;
      cursor:pointer;
    }
    #TWDS_people_subtab .attacker,
    #TWDS_people_subtab .winner {
      text-align:right;
    }
    #TWDS_attr_skill {
      border-collapse: collapse;
    }

    #TWDS_attr_skill .bonus-strength1 {
      border-left:2px solid red;
      border-top:2px solid red;
      border-right:2px solid red;
      background-color:#8003;
    }
    #TWDS_attr_skill .bonus-strength2 {
      border-left:2px solid red;
      border-bottom:2px solid red;
      border-right:2px solid red;
      background-color:#8003;
    }
    #TWDS_attr_skill .bonus-flexibility1 {
      border-left:2px solid green;
      border-top:2px solid green;
      border-right:2px solid green;
      background-color:#0803;
    }
    #TWDS_attr_skill .bonus-flexibility2 {
      border-left:2px solid green;
      border-bottom:2px solid green;
      border-right:2px solid green;
      background-color:#0803;
    }
    #TWDS_attr_skill .bonus-dexterity1 {
      border-left:2px solid blue;
      border-top:2px solid blue;
      border-right:2px solid blue;
      background-color:#0083;
    }
    #TWDS_attr_skill .bonus-dexterity2 {
      border-left:2px solid blue;
      border-bottom:2px solid blue;
      border-right:2px solid blue;
      background-color:#0083;
    }
    #TWDS_attr_skill .bonus-charisma1 {
      border-left:2px solid yellow;
      border-top:2px solid yellow;
      border-right:2px solid yellow;
      background-color:#8802;
    }
    #TWDS_attr_skill .bonus-charisma2 {
      border-left:2px solid yellow;
      border-bottom:2px solid yellow;
      border-right:2px solid yellow;
      background-color:#8803;
    }
    #TWDS_attr_skill td {
      text-align:center;
    }
    #TWDS_job p {
       text-align:right;
       display:grid;
    }
    #TWDS_job_filtergroup {
      grid-column:1;
      grid-row: 1 / span 3
    }
    #TWDS_job_modearea {
      grid-column:2;
      grid-row: 1;
    }
    #TWDS_job_searchgroup {
      grid-column:2;
      grid-row: 2;
    }
    #TWDS_job_duration {
      grid-column:2;
      grid-row: 3;
      justify-self: end;
      min-width:5em;
    }
    #TWDS_jobtab_filter_container {
      text-align:left;
    }

    #TWDS_jobs {
      margin-bottom:1em;
      border-collapse: collapse
    }
    #TWDS_jobs tr, #TWDS_jobs td, #TWDS_jobs th { border:1px solid #888;}
    #TWDS_jobs td { text-align:right;}
    #TWDS_jobs td[data-field=name] { text-align:left; padding:1px 2px; }
    #TWDS_jobs th[data-field=danger] { color: red}
    #TWDS_jobs th[data-field=luck] { color: green}

    #TWDS_jobtab_filter_container fieldset {
      display:inline-block;
      max-width:12em;
    }
    #TWDS_jobtab_filter_container select {
      display:block;
    }

    div.item span.TWDS_itemusageinfo {
      top:0;
      right:0;
      display:block;
      background-color:#8888;
      color:white;
      box-shadow: 1px 1px 2px #000000;
    }
    .TWDS_joblist_stars {
      opacity:0.5;
      color:green;
      text-shadow: 0 0 0px black;
    }
    .TWDS_joblist_stars.TWDS_joblist_stage_gold {
      color:gold;
    }
    .TWDS_joblist_stars.TWDS_joblist_stage_silver {
      color:silver;
    }
    .TWDS_joblist_stars.TWDS_joblist_stage_bronze {
      color:#cd7f32;
    }
    .TWDS_job_negative {
      color:red;
    }
    .TWDS_job_less {
      color:orange;
    }
    #TWDS_job p {
      text-align:right
    }
    #TWDS_job tr.hidden {
      display:none
    }
    #TWDS_job_filtergroup {
      margin-right:2em;
      display:inline-block;
    }
    #TWDS_job_filterx {
      border-radius:5px;
    }

    .job_bestwearbutton {
      top:-10px !important;
    }
    .job_bestwearbutton .twdb_bestwear {
      position:absolute;
      top:0;
    }
    .job_bestwearbutton .TWDS_getbestwear {
      position:absolute;
      top:0;
      position: absolute;
      top: 43px;
      left: 48px;
      line-height:16px;
    }
    #TWDS_storage_list {
      border-collapse:collapse;
    }
    #TWDS_storage_list tr, 
    #TWDS_storage_list td, 
    #TWDS_storage_list th {
      border:1px solid #888;
    }
    #TWDS_storage_list .TWDS_storage_image img {
      max-height:43px;
    }
    #TWDS_storage_list .TWDS_storage_name .TWDS_joblist_openbutton {
      margin-right:4px;
    }
    #TWDS_storage_list .TWDS_storage_percent {
      text-align:right;
    }
    #TWDS_storage_list .TWDS_storage_count {
      text-align:right;
    }
    #TWDS_storage_list .TWDS_storage_countinput {
      width:5em;
      text-align:right;
    }

    #TWDS_storage_select {
      border:1px solid #888;
      display:none;
    }
    #TWDS_storage_select.visible {
      display:block;
    }
    .TWDS_lp_hint {
      position: absolute;
      left: 2px;
      width: 18px;
      height: 18px;
      background-color: #432;
      border: 2px ridge #976;
      border-radius: 11px;
      background-blend-mode: soft-light;
    }

    .jobgroupicon .item-job,
    .job .item-job {
      width: 20px;
      height: 20px;
      position: absolute;
      font-size:130%;
      color:white;
      background-color:#2B1C19;
      border:2px solid #4F210D;
      border-radius:10px;
      top: -20px;
      left: +20px;
    }
    .market-buy img[alt="report"] {
      margin-left:5px;
    }
    #TWDS_wuw_table {
      border-collapse: collapse;
    }
    #TWDS_wuw td,
    #TWDS_wuw th {
      border-bottom:1px dotted #888;
      padding:2px;
    }
    #TWDS_wuw td {
      border-left:1px dotted #888;
    }
    input[type=number][size="2"] {
      width:3em;
    }
    input[type=number][size="7"] {
      width:8em;
    }
    #TWDS_tab_itemsets {
      height:340px;
      overflow-y: auto !important;
      overflow-x: auto !important;
    }

    #TWDS_tab_itemsets thead{
      position:sticky;
      top:0;
      background-color: wheat;
    }
    #TWDS_itemset_table {
      border-collapse: collapse;
    }
    #TWDS_itemset_table td.perlevel {
      font-style: italic;
    }
    #TWDS_itemset_table td,
    #TWDS_itemset_table tbody th {
      border:1px solid #888;
      padding:2px;
      font-size:inherit;
    }
    #TWDS_itemset_table thead th {
      border:1px solid #888;
      padding:2px;
      font-size:inherit;
    }
    #TWDS_itemset_table thead tr.colspanrow th {
      border-top:none;
    }
    #TWDS_itemset_table.with-twx tbody th.setname {
      cursor:pointer;
    }
    #TWDS_itemsettable_butplus,
    #TWDS_itemsettable_butminus {
      min-width:2em;
      margin-right:0.5em;
    }
    #TWDS_tab_updates dt {
      margin-left:2px;
      margin-top:1em;
      font-weight:bold;
    }
    #TWDS_tab_updates dd {
      margin-left:1em;
    }
    #TWDS_tab_updates dd::before {
      content: "*";
      margin-right:2px;
    }
    #TWDS_tab_updates dd ul {
      margin-left:2em;
    }
    .TWDS_fbs_basestats_content table {
      margin: 0 auto;
      border-collapse: collapse;
    }
    .TWDS_fbs_basestats_content table thead tr {
      height:24px;
      box-shadow: inset #7a481f 0px -2px 6px 0px;
    }
    .TWDS_fbs_basestats_content table tbody tr {
      height:24px;
      box-shadow: inset #7a481f 0px 2px 6px 0px;
    }
    .TWDS_fbs_basestats_content table tbody td {
      vertical-align:middle;
      text-align:right;
      padding: 0 4px;
      width:230px;
    }
    .TWDS_fbs_basestats_content table tbody th {
      width:176px;
      p
    }
    .TWDS_fbs_basestats_content p {
      margin-bottom:0.5em;
    }
    .TWDS_fbs_basestats_content table thead th {
      padding: 0 8px;
    }
    .TWDS_fbs_basestats_content table td {
      font-family:fixed;
    }
    .TWDS_fbs_basestats_content table th.subhead {
      background-color:wheat;
    }
    .TWDS_fbs_basestats_content .dotnull {
      visibility:hidden;
    }
    .TWDS_fbs_basestats .tw2gui_window_content_pane {
      max-height:320px;
      overflow: auto;
    }
    .TWDS_scrollbar::-webkit-scrollbar-thumb {
      background-color: #584329;
      border-radius: 6px;
      border: 3px solid #584329;
    }
    .TWDS_scrollbar::-webkit-scrollbar-track {
      background: #200;
      border-radius: 6px;
    }
    .TWDS_scrollbar::-webkit-scrollbar {
      width:14px;
    }

    .TWDS_jobwindow_setbuttons {
      height: 50px; /* same as the premium thing it replaces */
    }
    .TWDS_jobwindow_setbuttons .TWDS_button {
      margin-top:0;
    }
  `
  const sty = document.createElement('style')
  sty.textContent = css
  sty.id = 'TWDS_style_hack'
  const x = TWDS.q1('#TWDS_style_hack')
  if (x) x.remove()
  document.body.appendChild(sty)
}
TWDS.insertStyles() // no reason to wait with that.
// vim: tabstop=2 shiftwidth=2 expandtab
