$(function(){
  try {
    // $.getJSON('potential.json', function(data) {
    //   console.log(data);
    // });
    $('.charDiv').each((_, v) => {
      let $div = $(v);

      $div.find('.char').append($("<optgroup label='SSR'>"), $("<optgroup label='SR'>"), $("<optgroup label='R'>"), $("<optgroup label='N'>"));
      $.each(CHARACTERS, (id, char) => {
        switch (char.rarity) {
          case 3:
            $div.find("optgroup[label='SSR']").append($('<option>', { value: id, text: char.name }));
          break;
          case 2:
            $div.find("optgroup[label='SR']").append($('<option>', { value: id, text: char.name }));
          break;
          case 1:
            $div.find("optgroup[label='R']").append($('<option>', { value: id, text: char.name }));
          break;
          default:
            $div.find("optgroup[label='N']").append($('<option>', { value: id, text: char.name }));
        }
      })
      for (let i = 1; i <= 60; i++) $div.find('.lv').append($('<option>', { value: i, text: i }));
      // for (let i = 1; i <= 5; i++) $div.find('.bond').append($('<option>', { value: i, text: i }));
    })

    $(document).on('change', '.char', (event) => {
      let $element = $(event.currentTarget);
      let $star = $element.closest('.charDiv').find('.star');
      let $discipline = $element.closest('.charDiv').find('.discipline');
      let $pot = $element.closest('.charDiv').find('.potential');
      let curCharInfo = CHARACTERS[$element.val()];

      $star.empty();
      $discipline.empty();
      $pot.empty();
      for (let i = curCharInfo.rarity; i <= 5; i++) $star.append($('<option>', { value: i, text: i }));
      for (let i = 1; i <= (curCharInfo.rarity < 2 ? 6 : 12); i++) $pot.append($('<option>', { value: i, text: i }));
      if (curCharInfo.rarity < 1) $discipline.append($('<option>', { value: 0, text: '-' })).attr('disabled', true);
      else for (let i = 0; i <= 3; i++) $discipline.append($('<option>', { value: i, text: i }));
      calculate($element.closest('.charDiv'));
    })
    $('.char').change();

    $(document).on('change', '.potential', (event) => {
      let $element = $(event.currentTarget);
      let charId = $element.closest('.charDiv').find('.char').val();

      for (let i = 1; i <= 6; i++) {
        $element.siblings().find('input:eq(' + (i-1) + ')').attr('class', 'subPot form-check-input pointer ' + POTENTIALS[CHARACTERS[charId].potentialType][$element.val()][i].type + 'Pot');
      }
      calculate($element.closest('.charDiv'));
    })
    $('.potential').change();

    $(document).on('change', ".subPot, .lv, .star, .discipline", (event) => {
      let $element = $(event.currentTarget);

      calculate($element.closest('.charDiv'));
    })
  } catch(e) {
    alert('有地方出錯了，叫那個低能作者儘快修復');
  }
});

function calculate($charDiv){
  let atkBuff = 0, hpBuff = 0;
  let curCharInfo = CHARACTERS[$charDiv.find('.char').val()];
  let lv = parseInt($charDiv.find('.lv').val());
  let star = parseInt($charDiv.find('.star').val());
  let discipline = parseInt($charDiv.find('.discipline').val());

  try {
    for (let i = $charDiv.find('.potential').val()-1; i >= 1; i--) {
      atkBuff += $.map(POTENTIALS[curCharInfo.potentialType][i], (v, k) => { if (v.type == 'atk') return v.buff}).reduce((a,b)=>a+b, 0)
      hpBuff += $.map(POTENTIALS[curCharInfo.potentialType][i], (v, k) => { if (v.type == 'hp') return v.buff}).reduce((a,b)=>a+b, 0)
    }
    $charDiv.find(".subPot:checked").map((_, v) => { return v.value }).get().forEach((checked) => {
      let subPot = POTENTIALS[curCharInfo.potentialType][$charDiv.find('.potential').val()][checked]
      if (subPot.type == 'atk') atkBuff += subPot.buff
      else if (subPot.type == 'hp') hpBuff += subPot.buff
    })

    $charDiv.find(".resultAtk").text(Math.floor((Math.ceil( (curCharInfo.status.initATK / (5+curCharInfo.rarity)) * 10 ) / 10) * (5+star) * Math.pow(1.1, lv-1) * (1+(1+discipline)*discipline/2*0.05) * (1+atkBuff)))
    $charDiv.find(".resultHp").text(Math.floor((Math.ceil( (curCharInfo.status.initHP / (5+curCharInfo.rarity)) * 10 ) / 10) * (5+star) * Math.pow(1.1, lv-1) * (1+(1+discipline)*discipline/2*0.05) * (1+hpBuff)))
  } catch(e) {
    alert('有地方出錯了，叫那個低能作者儘快修復');
  }
}