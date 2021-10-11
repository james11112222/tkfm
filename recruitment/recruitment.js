$(function(){
  let listSwitch = $('#listStyle');
  const RARITY = { 0: 'N', 1: 'R', 2: 'SR', 3: 'SSR' };

  toggleStyle(localStorage.getItem("listSwitch"));
  listSwitch.click(() => {
    toggleStyle(localStorage.getItem("listSwitch"));
  })

  $('.btn-check').each((i, v) => v.value = i);
  toastr.options = { "preventDuplicates": true };

  $('#clearTagButton').click(() => $('.btn-check:checked').click() )
  $('#listStyle').click(() => $('.btn-check:first').change() )

  $(document).on('change', '.btn-check', (event) => {
    if ($('.btn-check:checked').length > 5) {
      let $btn = $(event.currentTarget);

      $btn.prop('checked', false);
      toastr.warning('最多選擇 5 個標籤');
      return false;
    }

    let $result = $('#filtered tbody');

    $result.empty();
    if ($('.btn-check:checked').length) {
      let selectedTagArray = $('.btn-check:checked').map((_, v) => v.value).get();
      let listType = localStorage.getItem("listSwitch");
      let tagSets = [];
      let guaranteeSets = {};
      let guaranteeSRSets = {};
      let allIntersections = [];
      let leaderTag;

      if (selectedTagArray.includes('20')) leaderTag = true;
      selectedTagArray.forEach((v) => {
        tagSets.push(leaderTag ? RECRUITMENTTAGS[v].hasChar : RECRUITMENTTAGS[v].hasChar.filter((char) => CHARACTERS[char].rarity < 3));
      });

      tagSets.forEach((v, i) => {
        allIntersections.push([[RECRUITMENTTAGS[selectedTagArray[i]].name], v]);
        if (v.length == 1) {
          if (guaranteeSets[v[0]]) guaranteeSets[v[0]].push([RECRUITMENTTAGS[selectedTagArray[i]].name]);
          else guaranteeSets[v[0]] = [[RECRUITMENTTAGS[selectedTagArray[i]].name]];
        } else {
          if (v.every((id) => CHARACTERS[id].rarity == 2)) {
            v.forEach((charId) => {
              if (guaranteeSRSets[charId]) guaranteeSRSets[charId].push([RECRUITMENTTAGS[selectedTagArray[i]].name]);
              else guaranteeSRSets[charId] = [[RECRUITMENTTAGS[selectedTagArray[i]].name]];
            });
          }
        }

        if (tagSets[i+1]) {
          for (let j = i+1; j < tagSets.length; j++) {
            let intersection = [tagSets[i], tagSets[j]].reduce((a, b) => a.filter(value => b.includes(value)) );

            if (intersection.length > 0) allIntersections.push([[RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name], intersection]);
            if (intersection.length == 1) {
              if (guaranteeSets[intersection[0]]) guaranteeSets[intersection[0]].push([RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name]);
              else guaranteeSets[intersection[0]] = [[RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name]];
            } else {
              if (intersection.every((id) => CHARACTERS[id].rarity == 2)) {
                intersection.forEach((charId) => {
                  if (guaranteeSRSets[charId]) guaranteeSRSets[charId].push([RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name]);
                  else guaranteeSRSets[charId] = [[RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name]];
                });
              }
            }

            if (tagSets[j+1]) {
              for (let k = j+1; k < tagSets.length; k++) {
                let intersection = [tagSets[i], tagSets[j], tagSets[k]].reduce((a, b) => a.filter(value => b.includes(value)) );

                if (intersection.length > 0) allIntersections.push([[RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name, RECRUITMENTTAGS[selectedTagArray[k]].name], intersection]);
                if (intersection.length == 1 && (CHARACTERS[intersection[0]].rarity == 3 ? [selectedTagArray[i], selectedTagArray[j], selectedTagArray[k]].includes('20') : true)) {
                  if (guaranteeSets[intersection[0]]) guaranteeSets[intersection[0]].push([RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name, RECRUITMENTTAGS[selectedTagArray[k]].name]);
                  else guaranteeSets[intersection[0]] = [[RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name, RECRUITMENTTAGS[selectedTagArray[k]].name]];
                } else {
                  if (intersection.every((id) => CHARACTERS[id].rarity == 2)) {
                    intersection.forEach((charId) => {
                      if (guaranteeSRSets[charId]) guaranteeSRSets[charId].push([RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name, RECRUITMENTTAGS[selectedTagArray[k]].name]);
                      else guaranteeSRSets[charId] = [[RECRUITMENTTAGS[selectedTagArray[i]].name, RECRUITMENTTAGS[selectedTagArray[j]].name, RECRUITMENTTAGS[selectedTagArray[k]].name]];
                    });
                  }
                }
              }
            }
          }
        }
      })

      if (listType == 'tag') {
        allIntersections.sort((a, b) => {
          if (a[1].length < b[1].length) return -1
          else return 1
        })
        $.each(allIntersections, (i, intersection) => {
          $result.append($('<tr>').append($('<td>', { text: i+1 }))
                .append($('<td>', { text: intersection[0].join(','), class: 'nowrap' }))
                .append($('<td>', { text: intersection[1].map((charId) => { return CHARACTERS[charId].name.split(' ')[1] || CHARACTERS[charId].name.split(' ')[0] }).join(', ') } ))
          );
        })
      } else {
        $.each(guaranteeSRSets, (k, arrSet) => {
          let duplicated = [];

          arrSet.sort((a, b) => a.length - b.length).forEach((arr, idx) => {
            for (let i = idx+1; i < arrSet.length; i++) {
              if (arr.every((value) => arrSet[i].includes(value))) {
                if (!duplicated.includes(i)) duplicated.push(i);
              }
            }
          })
          guaranteeSRSets[k] = arrSet.filter((arr, i) => !duplicated.includes(i));
        })

        $.each(guaranteeSets, (k, arrSet) => {
          let duplicated = [];

          arrSet.sort((a, b) => a.length - b.length).forEach((arr, idx) => {
            for (let i = idx+1; i < arrSet.length; i++) {
              if (arr.every((value) => arrSet[i].includes(value))) {
                if (!duplicated.includes(i)) duplicated.push(i);
              }
            }
          })
          guaranteeSets[k] = arrSet.filter((arr, i) => !duplicated.includes(i));
        })

        let chars = [ ...new Set(tagSets.flat())].sort((a, b) => {
          let weightsA = 0;
          let weightsB = 0;

          if ( CHARACTERS[a].rarity == CHARACTERS[b].rarity ) {
            if ( Object.keys(guaranteeSets).includes(String(a)) ) weightsA += 2;
            if ( Object.keys(guaranteeSRSets).includes(String(a)) ) weightsA += 1;
            if ( Object.keys(guaranteeSets).includes(String(b)) ) weightsB += 2;
            if ( Object.keys(guaranteeSRSets).includes(String(b)) ) weightsB += 1;

            if (weightsA == weightsB) return a < b ? -1 : 1;
            else if (weightsA > weightsB) return -1;
            else return 1;
          }
          else if (CHARACTERS[a].rarity > CHARACTERS[b].rarity) return -1;
          else return 1;
        });

        $.each(chars, (i, charId) => {
          let charInfo = CHARACTERS[charId];
          let charName = charInfo.name.split(' ')[1] || charInfo.name.split(' ')[0];
          let charTitle;
          let applyTags = [];
          let opt = {};
          let icon = '';

          if (charInfo.name.split(' ')[1]) charTitle = charInfo.name.split(' ')[0];
          selectedTagArray.forEach((tagId) => {
            if (RECRUITMENTTAGS[tagId].hasChar.includes(charId)) applyTags.push(RECRUITMENTTAGS[tagId].name)
          });

          if ( Object.keys(guaranteeSets).includes(String(charId)) ) {
            opt = { class: "guarantee", "data-bs-placement": "bottom", title: guaranteeSets[charId].map((tags) => tags.join(', ')).join("\n") };
            icon = '<span class="material-icons">stars</span>';
          }

          if ( Object.keys(guaranteeSRSets).includes(String(charId)) ) {
            let msg;

            guaranteeSRSets[charId].unshift(["必得SR:"]);
            msg = guaranteeSRSets[charId].map((tags) => tags.join(', ')).join("\n");
            $.extend(opt, { class: "guarantee", "data-bs-placement": "bottom" });
            opt.title ? opt.title += "\n" + msg : opt.title = msg
            icon += '<span class="material-icons">local_offer</span>';
          }

          $result.append($('<tr>').append($('<td>', opt)
              .append($('<span>', { text: charTitle, class: 'text-small' }))
              .append($('<span>', { text: charName, class: 'charName' }))
              .append($('<div>', { class: 'tagIcon' })
                .append(icon)) )
            .append($('<td>', { text: RARITY[charInfo.rarity], class: 'rarity' }))
            .append($('<td>', { text: applyTags.join(', ') }))
          );
        })
        $('.guarantee').tooltip();
      }
    }
  });

  createCharacterTags(RARITY);
  $(window).resize(()=> createCharacterTags(RARITY));

  $(document).on("click", '.triggerDiv',(event) => {
    let $element = $(event.currentTarget);
    $element.next('.collapse').collapse('toggle');
  });
})

function toggleStyle(listType) {
  let $title = $('#filtered thead tr');
  let initFlag = $('#listStyle').data('init');

  if (initFlag) localStorage.setItem("listSwitch", listType == 'char' ? 'tag' : 'char');

  if (localStorage.getItem("listSwitch") === "tag") {
    $title.empty();
    $title.append($('<th>', { text: '#' }))
          .append($('<th>', { text: '標籤', class: 'text-center' }))
          .append($('<th>', { text: '可能角色', class: 'text-center' }));
  } else {
    $title.empty();
    $title.append($('<th>', { text: '名字', class: 'text-center' }))
          .append($('<th>', { text: '稀有度', class: 'nowrap' }))
          .append($('<th>', { text: '應用標籤', class: 'text-center' }));
  }
  $('#listStyle').data('init', true);
}

function createCharacterTags(RARITY) {
  let partition = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 2 : 6

  $('.vContainer').empty();
  $.each(Object.entries(CHARACTERS).sort((a, b) => (a[1].rarity > b[1].rarity ? -1 : 1 )), (index, charInfo) => {
    let tagArr = RECRUITMENTTAGS.map((v) => { if (v.hasChar.includes(parseInt(charInfo[0]))) return v.name}).filter(Boolean);
    let newCharBlock = $('.charBlock:first').clone().removeClass('hide');
    let charHeaderContent = [RARITY[charInfo[1].rarity], charInfo[1].name.split(' ')[1] ? "<span class='text-small'>"+charInfo[1].name.split(' ')[0]+"</span>" : "<span class='text-small'>　</span>", charInfo[1].name.split(' ')[1] || charInfo[1].name.split(' ')[0]].join('<br>');

    newCharBlock.find('.triggerDiv').html(charHeaderContent)
    .attr('aria-controls', 'char_'+charInfo[0])
    .attr('data-bs-target', 'char_'+charInfo[0])
    .next().attr('id', 'char_'+charInfo[0]);
    if (!tagArr.length) { tagArr.push('目前徵才無法取得'); }
    $.each(tagArr, (_, tag) => {
      newCharBlock.find('tbody').append($('<tr>').append($('<td>', { text: tag })));
    })
    $('.vContainer').eq(index%partition).append(newCharBlock);
  })
}