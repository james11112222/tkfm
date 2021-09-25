$(function(){
  $('.btn-check').each((i, v) => v.value = i);
  toastr.options = { "preventDuplicates": true };
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
      let tagSets = [];
      let guaranteeSets = {};
      let guaranteeSRSets = {};
      let leaderTag;

      if (selectedTagArray.includes('20')) leaderTag = true;
      selectedTagArray.forEach((v) => {
        tagSets.push(leaderTag ? RECRUITMENTTAGS[v].hasChar : RECRUITMENTTAGS[v].hasChar.filter((char) => CHARACTERS[char].rarity < 3));
      });

      tagSets.forEach((v, i) => {
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

                if (intersection.length == 1) {
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

      $.each(guaranteeSRSets, (k, arrSet) => {
        let duplicated = []

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
        let duplicated = []

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
        let rarity;
        let opt = {};
        let icon = '';

        if (charInfo.name.split(' ')[1]) charTitle = charInfo.name.split(' ')[0];
        switch (charInfo.rarity) {
          case 0:
            rarity = 'N';
          break;
          case 1:
            rarity = 'R';
          break;
          case 2:
            rarity = 'SR';
          break;
          case 3:
            rarity = 'SSR';
        }

        selectedTagArray.forEach((tagId) => {
          if (RECRUITMENTTAGS[tagId].hasChar.includes(charId)) applyTags.push(RECRUITMENTTAGS[tagId].name)
        });

        if ( Object.keys(guaranteeSets).includes(String(charId)) ) {
          opt = { class: "guarantee", "data-bs-placement": "bottom", title: guaranteeSets[charId].map((tags) => tags.join(', ')).join("\n") }
          icon = '<span class="material-icons">stars</span>'
        }

        if ( Object.keys(guaranteeSRSets).includes(String(charId)) ) {
          let msg;

          guaranteeSRSets[charId].unshift(["必得SR:"]);
          msg = guaranteeSRSets[charId].map((tags) => tags.join(', ')).join("\n");
          $.extend(opt, { class: "guarantee", "data-bs-placement": "bottom" });
          opt.title ? opt.title += "\n" + msg : opt.title = msg
          icon += '<span class="material-icons">local_offer</span>'
        }

        $result.append($('<tr>').append($('<td>', opt)
            .append($('<span>', { text: charTitle, class: 'text-small' }))
            .append($('<span>', { text: charName, class: 'charName' }))
            .append($('<div>', { class: 'tagIcon' })
              .append(icon)) )
          .append($('<td>', { text: rarity }))
          .append($('<td>', { text: applyTags.join(', ') }))
        );
      })
      $('.guarantee').tooltip();
    }
  })
})