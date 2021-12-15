$(function(){
  try {
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
  } catch(e) {
    console.error(e);
    errorAlert();
  }

  $(document).on('change', '.char', (event) => {
    let $element = $(event.currentTarget);
    let $star = $element.closest('.charDiv').find('.star');
    let $discipline = $element.closest('.charDiv').find('.discipline');
    let $pot = $element.closest('.charDiv').find('.potential');
    let curCharInfo = CHARACTERS[$element.val()];
    let starVal = $star.val();
    let disciplineVal = $discipline.val();
    let potVal = $pot.val();
    let $targetPot = $('.targetPot .potential');
    let targetPotVal = $targetPot.val();

    try {
      $star.empty();
      $discipline.empty();
      $pot.empty();
      $targetPot.empty();
      for (let i = curCharInfo.rarity; i <= 5; i++) $star.append($('<option>', { value: i, text: i }));
      if (starVal) $star.val(starVal);
      for (let i = 1; i <= (curCharInfo.rarity < 2 ? 6 : 12); i++) {
        $pot.append($('<option>', { value: i, text: i }));
        $targetPot.append($('<option>', { value: i, text: i }));
      }
      if (potVal) {
        $pot.val( curCharInfo.rarity < 2 && potVal > 6 ? 6 : potVal);
        $targetPot.val( curCharInfo.rarity < 2 && targetPotVal > 6 ? 6 : targetPotVal);
      }
      if (curCharInfo.rarity < 1) $discipline.append($('<option>', { value: 0, text: '-' })).attr('disabled', true);
      else {
        $discipline.removeAttr('disabled');
        for (let i = 0; i <= 3; i++) $discipline.append($('<option>', { value: i, text: i }));
        if (disciplineVal) $discipline.val(disciplineVal);
      }
      $('.potential').change();
      calculate($element.closest('.charDiv'));
    } catch(e) {
      console.error(e);
      errorAlert();
    }
  })

  $(document).on('change', '.potential', (event) => {
    let $element = $(event.currentTarget);
    let charId = $('.charDiv').find('.char').val();
    let potLayer = POTENTIALS[CHARACTERS[charId].potentialType][$element.val()] || POTENTIALS[CHARACTERS[charId].potentialType][6];

    try {
      for (let i = 1; i <= 6; i++) {
        $element.siblings().find('input:eq(' + (i-1) + ')').attr('class', 'subPot form-check-input pointer ' + potLayer[i].type + 'Pot');
      }
      changeTargetPot();
      calculate($('.charDiv'));
      calculate($('.charDiv'), $('.targetDiv'));
    } catch(e) {
      console.error(e);
      errorAlert();
    }
  })
  $('.char').change();

  $(document).on('change', ".subPot", () => (changeTargetPot()) );
  $(document).on('change', ".subPot, .lv, .star, .discipline", () => (calculate($('.charDiv')), calculate($('.charDiv'), $('.targetDiv'))) );
  $('#exchangeBtn').click(() => ($('.originalDiv').addClass('d-none'), $('.exchangedDiv').removeClass('d-none')));
  $('#restoreBtn').click(() => ($('.exchangedDiv').addClass('d-none'), $('.originalDiv').removeClass('d-none')));
});

function calculate($charDiv, $targetDiv = null){
  let atkBuff = 0, hpBuff = 0;
  let curCharInfo = CHARACTERS[$charDiv.find('.char').val()];
  let lv = parseInt($charDiv.find('.lv').val());
  let star = parseInt($charDiv.find('.star').val());
  let discipline = parseInt($charDiv.find('.discipline').val());
  let $resultDiv = $targetDiv || $charDiv;
  let requireMaterials = {};
  let exchangedMaterials = {};
  let money = 0;

  try {
    for (let i = $resultDiv.find('.potential').val()-1; i >= 1; i--) {
      atkBuff += $.map(POTENTIALS[curCharInfo.potentialType][i], (v) => { if (v.type == 'atk') return v.buff}).reduce((a,b)=>a+b, 0)
      hpBuff += $.map(POTENTIALS[curCharInfo.potentialType][i], (v) => { if (v.type == 'hp') return v.buff}).reduce((a,b)=>a+b, 0)

      if ($targetDiv && i >= parseInt($charDiv.find('.potential').val())) {
        money += 8000*i*6;
        $.map(POTENTIALS[curCharInfo.potentialType][i], (v) => (v.requirement)).forEach((sub) => {
          sub.itemType.forEach((type) => {
            if (!requireMaterials[sub.itemTier]) requireMaterials[sub.itemTier] = {};
            if (!requireMaterials[sub.itemTier][type]) requireMaterials[sub.itemTier][type] = { value: 0 };
            requireMaterials[sub.itemTier][type].value += parseInt(sub.amount);

            //Exchange
            if ([3, 4].includes(sub.itemTier)) {
              $.each(MATERIALS[sub.itemTier][type].exchange, (_, v) => {
                if (!exchangedMaterials[v.tier]) exchangedMaterials[v.tier] = {};
                if (!exchangedMaterials[v.tier][v.type]) exchangedMaterials[v.tier][v.type] = { value: 0 };
                exchangedMaterials[v.tier][v.type].value += parseInt(v.amount * sub.amount);
              })
            } else {
              if (!exchangedMaterials[sub.itemTier]) exchangedMaterials[sub.itemTier] = {};
              if (!exchangedMaterials[sub.itemTier][type]) exchangedMaterials[sub.itemTier][type] = { value: 0 };
              exchangedMaterials[sub.itemTier][type].value += parseInt(sub.amount);
            }
          })
        })
      }
    }

    $resultDiv.find(".subPot:checked").map((_, v) => { return v.value }).get().forEach((checked) => {
      let subPot = POTENTIALS[curCharInfo.potentialType][$resultDiv.find('.potential').val()][checked];
      if (subPot.type == 'atk') atkBuff += subPot.buff;
      else if (subPot.type == 'hp') hpBuff += subPot.buff;

      if ($targetDiv) {
        //Target subpot addition
        let targetSubPotReq = subPot.requirement;
        money += 8000*$resultDiv.find('.potential').val();
        targetSubPotReq.itemType.forEach((type) => {
          if (!requireMaterials[targetSubPotReq.itemTier]) requireMaterials[targetSubPotReq.itemTier] = {};
          if (!requireMaterials[targetSubPotReq.itemTier][type]) requireMaterials[targetSubPotReq.itemTier][type] = { value: 0 };
          requireMaterials[targetSubPotReq.itemTier][type].value += parseInt(targetSubPotReq.amount);

          //Exchange
          if ([3, 4].includes(targetSubPotReq.itemTier)) {
            $.each(MATERIALS[targetSubPotReq.itemTier][type].exchange, (_, v) => {
              if (!exchangedMaterials[v.tier]) exchangedMaterials[v.tier] = {};
              if (!exchangedMaterials[v.tier][v.type]) exchangedMaterials[v.tier][v.type] = { value: 0 };
              exchangedMaterials[v.tier][v.type].value += parseInt(v.amount * targetSubPotReq.amount);
            })
          } else {
            if (!exchangedMaterials[targetSubPotReq.itemTier]) exchangedMaterials[targetSubPotReq.itemTier] = {};
            if (!exchangedMaterials[targetSubPotReq.itemTier][type]) exchangedMaterials[targetSubPotReq.itemTier][type] = { value: 0 };
            exchangedMaterials[targetSubPotReq.itemTier][type].value += parseInt(targetSubPotReq.amount);
          }
        })
      }
    })

    if ($targetDiv) {
      //subPot subtraction
      $charDiv.find(".subPot:checked").map((_, v) => { return v.value }).get().forEach((checked) => {
        let curSubPotReq = POTENTIALS[curCharInfo.potentialType][$charDiv.find('.potential').val()][checked].requirement;

        money -= 8000*$charDiv.find('.potential').val();
        curSubPotReq.itemType.forEach((type) => {
          requireMaterials[curSubPotReq.itemTier][type].value -= parseInt(curSubPotReq.amount);

          //Exchange
          if ([3, 4].includes(curSubPotReq.itemTier)) {
            $.each(MATERIALS[curSubPotReq.itemTier][type].exchange, (_, v) => {
              exchangedMaterials[v.tier][v.type].value -= parseInt(v.amount * curSubPotReq.amount);
              if (exchangedMaterials[v.tier][v.type].value == 0) {
                delete exchangedMaterials[v.tier][v.type];
                if ($.isEmptyObject(exchangedMaterials[v.tier])) delete exchangedMaterials[v.tier];
              }
            })
          } else {
            exchangedMaterials[curSubPotReq.itemTier][type].value -= parseInt(curSubPotReq.amount);
            if (exchangedMaterials[curSubPotReq.itemTier][type].value == 0) {
              delete exchangedMaterials[curSubPotReq.itemTier][type];
              if ($.isEmptyObject(exchangedMaterials[curSubPotReq.itemTier])) delete exchangedMaterials[curSubPotReq.itemTier];
            }
          }

          if (requireMaterials[curSubPotReq.itemTier][type].value == 0) {
            delete requireMaterials[curSubPotReq.itemTier][type];
            if ($.isEmptyObject(requireMaterials[curSubPotReq.itemTier])) delete requireMaterials[curSubPotReq.itemTier];
          }
        })
      })

      $('#allRequiredItem, #exchangedRequiredItem').empty();
      $.each(requireMaterials, (tier, type) => {
        $.each(type, (typeId, data) => {
          $('#allRequiredItem').append($('<span>', { class: 'col-custom row g-0 align-items-center' })
                                .append($('<span>', { class: 'col-2' })
                                  .append($('<img>', { src: MATERIALS[tier][typeId].src, loading: 'lazy', width: '100%' }))
                                )
                                .append($('<span>', { class: 'col-6', text: MATERIALS[tier][typeId].name }))
                                .append($('<span>', { class: 'col-2 text-end', text: data.value }))
                              );
        });
      });
      $.each(exchangedMaterials, (tier, type) => {
        $.each(type, (typeId, data) => {
          $('#exchangedRequiredItem').append($('<span>', { class: 'col-custom row g-0 align-items-center' })
                                .append($('<span>', { class: 'col-2' })
                                  .append($('<img>', { src: MATERIALS[tier][typeId].src, loading: 'lazy', width: '100%' }))
                                )
                                .append($('<span>', { class: 'col-6', text: MATERIALS[tier][typeId].name }))
                                .append($('<span>', { class: 'col-2 text-end', text: data.value }))
                              );
        });
      });
      if (money) {
        $('#allRequiredItem, #exchangedRequiredItem').append($('<span>', { class: 'col-custom row g-0 align-items-center' })
                              .append($('<span>', { class: 'col-2' })
                                .append($('<img>', { src: "../src/material/money.webp", loading: 'lazy', width: '100%' }))
                              )
                              .append($('<span>', { class: 'col-8 text-end', text: money }))
                            );
      }
    }

    $resultDiv.find(".resultAtk").text(Math.floor((Math.ceil( (preciseDivision(curCharInfo.status.initATK, (5+curCharInfo.rarity))) * 10 ) / 10) * (5+star) * Math.pow(1.1, lv-1) * (1 + (1+discipline)*discipline / 2*0.05 ) * (1+atkBuff)))
    $resultDiv.find(".resultHp").text(Math.floor((Math.ceil( (preciseDivision(curCharInfo.status.initHP, (5+curCharInfo.rarity))) * 10 ) / 10) * (5+star) * Math.pow(1.1, lv-1) * (1 + (1+discipline)*discipline / 2*0.05 ) * (1+hpBuff)))

  } catch(e) {
    console.error(e);
    errorAlert();
  }
}

function changeTargetPot() {
  if (parseInt($('#curPotSelect').val()) >= parseInt($('#targetPotSelect').val())) {
    $('#targetPotSelect').val($('#curPotSelect').val());
    $('#targetSubPot .subpot').each((i, v) => {
      $(v).attr('class', $('#curSubPot .subpot').eq(i).attr('class'));
      $(v).prop('checked', v.checked || $('#curSubPot .subpot').eq(i).prop('checked'));
    });
  }
}

function preciseDivision(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum / num2 * baseNum) / (baseNum * baseNum);
}

function errorAlert() {
  alert('有地方出錯了，叫那個低能作者盡快修復');
}