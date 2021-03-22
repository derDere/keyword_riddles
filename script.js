(function () {

  const ABC = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzÄäÖöÜüß,.?!@€+-#*:;'^°\"§$%&/()=´`²³{[]}\\~µ|<>さサざザしシѪꙚѨꙜѬѮヲやヤんンꙀꙂꙄꙆꙈҀѺОУꙊѰѲѴѶԘꙞꙠꙢꙤꙦꙨꙪふフづヅじジぢヂらラわワをѠѼꙌѾꙎѢꙐꙬꙮꚘꚚԀԔԖԠԢҦꚊꚀꚄちチずズつツꙒꙔꙖѤѦꙘꚌꚔꚎꚖꚂԂԄԈԊԌԎԆꚐꚈꚆꚒԞ";

  function generateDataDOM(data) {
    let list = document.getElementById('lines');
    for(let line of data) {
      let li = document.createElement('li');
      for(let word of line) {
        let ele;
        if (word) {
          ele = document.createElement('span');
          ele.className = "word";
          ele.innerText = word;
        } else {
          ele = document.createElement('input');
          ele.type = "text";
          ele.className = "entry";
          ele.value = '';
          ele.addEventListener('keyup', () => {renderData(data);});
        }
        li.appendChild(ele);
      }
      list.appendChild(li);
    }
  }

  function renderData(data) {
    let inputs = [...document.getElementsByClassName('entry')];
    for(let input of inputs) {
      let lineIndex = inputs.indexOf(input);
      let parent = input.parentElement;
      let spans = parent.children;
      let dataLine = data[lineIndex];
      let deLine = decrypt(dataLine, input.value);
      for(let wordIndex in deLine) {
        if (deLine[wordIndex]) {
          spans[wordIndex].innerText = deLine[wordIndex];
        }
      }
    }
  }

  function decryptSingle(line, keychar) {
    let offset = ABC.indexOf(keychar);
    if (offset < 0) return data;
    let newLine = [];
    for(let word of line) {
      if (word) {
        let newWord = '';
        for(let char of word) {
          let index = ABC.indexOf(char);
          if (index >= 0) {
            let i = (index - offset);
            while (i < 0) {
              i += ABC.length;
            }
            let c = ABC[i];
            newWord += c;
          } else {
            newWord += char;
          }
        }
        newLine.push(newWord);
      } else {
        newLine.push(false);
      }
    }
    return newLine;
  }

  function decrypt(data, key) {
    var result = data;
    for(let c of key) {
      result = decryptSingle(result, c);
    }
    return result;
  }

  var data = JSON.parse(atob(document.location.search.substr(1)));

  generateDataDOM(data);

  renderData(data);

  //W1siXHUzMDYxXHVhNjZjXHUwNDY0XHUwNDY0XHVhNjk2IixmYWxzZSwiRSJdXQ==
})();
