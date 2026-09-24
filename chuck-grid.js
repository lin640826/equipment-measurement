/* Shared Web/APK Chuck module; deliberately independent of measurement formulas. */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const ids=['ch_lt','ch_t','ch_rt','ch_l','ch_c','ch_r','ch_lb','ch_b','ch_rb'];
  const corners=['ch_lt','ch_rt','ch_lb','ch_rb'];
  let cornersOn=true;
  function render(){
    $('chuck_toggle').setAttribute('aria-checked',String(cornersOn));
    $('chuck_toggle_label').textContent='四角點：'+(cornersOn?'開':'關');
    $('chuck_count').textContent=cornersOn?'9 點啟用':'5 點啟用';
    $('chuck_help').textContent=cornersOn?'點選格子輸入數值；四角點可一次開關。':'四角點已停用並保留原值；再次開啟即可繼續輸入。';
    for(const id of corners){$(id).disabled=!cornersOn;$('box_'+id).classList.toggle('off',!cornersOn);}
  }
  $('chuck_toggle').addEventListener('click',()=>{cornersOn=!cornersOn;render();});
  $('chuck_sample').addEventListener('click',()=>{const values=[9600,9590,9600,9604,9590,9600,9600,9590,9600];ids.forEach((id,i)=>$(id).value=String(values[i]));render();});
  $('chuck_clear').addEventListener('click',()=>{for(const id of ids)$(id).value='';});
  for(const id of ids){$(id).addEventListener('keydown',e=>{if(e.key!=='Enter')return;e.preventDefault();const next=ids.slice(ids.indexOf(id)+1).map($).find(el=>!el.disabled);if(next)next.focus();else $(id).blur();});}
  render();
})();
