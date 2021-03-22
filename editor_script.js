function addLine() {
  var ol = document.getElementById('editor');

  var li = document.createElement('li');
  li.className = "line";

  var txb = document.createElement('input');
  txb.className = "linetxb";
  txb.addEventListener('keyup', fillSelect);
  li.appendChild(txb);

  var select = document.createElement('select');
  select.className = "kwsel";
  select.addEventListener('change', createData);
  li.appendChild(select);

  var delbtn = document.createElement('button');
  delbtn.className = "delbtn";
  delbtn.innerText = "Entfernen";
  delbtn.addEventListener('click', removeLine);
  li.appendChild(delbtn);

  ol.appendChild(li);

  createData();
}

function fillSelect(event) {
  let txb = event.srcElement;
  let select = txb.nextSibling;
  let words = txb.value.split(" ");
  select.innerHTML = '';
  for(let word of words) {
    let opt = document.createElement('option');
    opt.value = word;
    opt.innerText = word;
    select.appendChild(opt);
  }
  createData();
}

function removeLine(event) {
  let btn = event.srcElement;
  let li = btn.parentElement;
  let txb = btn.previousSibling.previousSibling;
  if(txb.value.length <= 0 || confirm("Wollen Sie diese Zeile wirklich entfernen?")) {
    li.remove();
  }
  createData();
}

function encryptSingle(line, keychar) {
  let offset = ABC.indexOf(keychar);
  if (offset < 0) return data;
  let newLine = [];
  for(let word of line) {
    if (word) {
      let newWord = '';
      for(let char of word) {
        let index = ABC.indexOf(char);
        if (index >= 0) {
          let i = (index + offset) % ABC.length;
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

const ABC = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzÄäÖöÜüß,.?!@€+-#*:;'^°\"§$%&/()=´`²³{[]}\\~µ|<>さサざザしシѪꙚѨꙜѬѮヲやヤんンꙀꙂꙄꙆꙈҀѺОУꙊѰѲѴѶԘꙞꙠꙢꙤꙦꙨꙪふフづヅじジぢヂらラわワをѠѼꙌѾꙎѢꙐꙬꙮꚘꚚԀԔԖԠԢҦꚊꚀꚄちチずズつツꙒꙔꙖѤѦꙘꚌꚔꚎꚖꚂԂԄԈԊԌԎԆꚐꚈꚆꚒԞ";

function encrypt(data, key) {
  var result = data;
  for(let c of key) {
    result = encryptSingle(result, c);
  }
  return result;
}

function JSONencode(obj) {
  var json = JSON.stringify(obj);
  json  = json.replace(/[\u007F-\uFFFF]/g, function(chr) {
      return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4);
  });
  return json;
}

function createData() {
  var ol = document.getElementById('editor');
  var lis = ol.children;
  var lines = [];
  for(let li of lis) {
    let str = li.children[0].value;
    let words = str.split(' ');
    let kw = li.children[1].value;
    let kwi = words.indexOf(kw);
    words[kwi] = false;
    let line = encrypt(words, kw);
    lines.push(line);
  }
  var jj = JSONencode(lines);
  var b64 = btoa(jj);
  var linkHref = document.location.origin + '?' + b64;
  var link = document.getElementById('link');
  link.href = linkHref;
  link.innerText = linkHref;
  var frame = document.getElementById('testframe');
  frame.src = linkHref;
}
