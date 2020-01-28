loadCB("myLarivaar");
loadCB("myEng");
loadCB("myPun");
loadCB("readingMode1");
loadCB("dark_light")

let larivaarArray = [];
let AngNumb = AngNoCalculator();
let fontVerseSize;
let fontTransSize;

if (typeof(Storage) !== "undefined") {
  fontVerseSize = parseInt(localStorage.getItem("fontSizeVerse"));
  if (isNaN(fontVerseSize) == true) {
    fontVerseSize = 16;
  } 
}

if (typeof(Storage) !== "undefined") {
  fontTransSize = parseInt(localStorage.getItem("fontSizeTrans"));
  if (isNaN(fontTransSize) == true) {
    fontTransSize = 16;
  } 
}

if (AngNumb == 1) {
  document.getElementById("PreviousAngBtn").style.display = "none";
} else if (AngNumb == lastAngNo) {
  document.getElementById("NextAngBtn").style.display = "none";

}


PreviousAngBtn

toggleDarkLight();
toggleReadingMode();
document.getElementById("titleScriptureAngNo").innerHTML = scriptureName + '<br/> Displaying: Ang ' + AngNumb.toString();

// functions




function AngNoCalculator() {
  var str = window.location.href;
  var AngNo = parseInt(str.charAt(str.length-9) + str.charAt(str.length-8) + str.charAt(str.length-7) + str.charAt(str.length-6));
  return AngNo;
}

function angSearch() {
  var x = document.getElementById("AngNo").value;
  if (x <= lastAngNo && x >= 1) {
    var str = "" + x
    var pad = "0000"
    var ans = pad.substring(0, pad.length - str.length) + str
    var site1 = window.location.href;
    var newSite = site1.substring(0, site1.length-9) + ans + ".html"
    window.open(newSite, "_self");
  } else {
    document.getElementById("demo1").innerHTML = "Type a number between 1 and 1430";
  }
}

function angBack() {
  var str = window.location.href;
  var res = parseInt(str.charAt(str.length-9) + str.charAt(str.length-8) + str.charAt(str.length-7) + str.charAt(str.length-6));
  var str1 = "" + (res - 1);
  var pad = "0000"
  var ans = pad.substring(0, pad.length - str1.length) + str1
  var newSite = str.substring(0, str.length-9) + ans + ".html"
  window.open(newSite, "_self");

}

function angForw() {
  var str = window.location.href;
  var res = parseInt(str.charAt(str.length-9) + str.charAt(str.length-8) + str.charAt(str.length-7) + str.charAt(str.length-6));
  var str1 = "" + (res + 1);
  var pad = "0000"
  var ans = pad.substring(0, pad.length - str1.length) + str1
  var newSite = str.substring(0, str.length-9) + ans + ".html"
  window.open(newSite, "_self");
}

var input = document.getElementById("AngNo");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("AngBtn").click();
  }
});

function larivaarFn() {
  if (document.getElementById("myLarivaar").checked == true){
    LarivaarAssistColour();
  } else {
    LarivaarAssistColourless();
  }
}

function LarivaarAssistColour() {
  larivaarArray = [""];
  for (i = 0; i < arrayOfVerses.length; i++) {
    res = [""];
    res = arrayOfVerses[i].split(" ");
    var ress = "";
    for (j = 0; j < res.length; j++) {
      if (res[j].includes("॥")== true || j%2==0 ){
        ress += "<font>" + res[j] + "</font>";
      } else {
        ress += "<font color=\"orange\">" + res[j] + "</font>"
      }
    } 
    larivaarArray[i] = ress;
  }
}

function LarivaarAssistColourless() {
  larivaarArray = [""];
  for (i = 0; i < arrayOfVerses.length; i++) {
    res = [""];
    res = arrayOfVerses[i].split(" ");
    var ress = "";
    for (j = 0; j < res.length; j++) {
      if (res[j].includes("॥")== true || j%2==0 ){
        ress += "<font>" + res[j] + "</font>";
      } else {
        ress += "<font>" + res[j] + "</font>"
      }
    } 
    larivaarArray[i] = ress;
  }
}

function toggleReadingMode() {
  saveCB("myLarivaar");
  saveCB("readingMode1");
  saveCB("myEng");
  saveCB("myPun");
  larivaarFn()
  if (document.getElementById("readingMode1").checked == true) {
    document.getElementById('verses').innerHTML = readingModeOn();
  } else {
    document.getElementById('verses').innerHTML = readingModeOff();
  }
}

function readingModeOn() {
  let tableStr = '<table class="tableOfVerses">';
  tableStr += '<tr><td><a style="font-size:' + fontVerseSize +'px;">';
  for (i=0; i < larivaarArray.length; i++) {
    tableStr += larivaarArray[i];
  }
  tableStr += '</a></td></tr>';
  if (document.getElementById("myEng").checked == true) {
    tableStr += '<tr><td><a style="font-size:' + fontTransSize +'px;">';
    for (i=0; i < larivaarArray.length-1; i++) {
      tableStr += Eng[i] + '&nbsp';
    }
    tableStr += Eng[larivaarArray.length-1];
    tableStr += '</a></td></tr>';
  }
  if (document.getElementById("myPun").checked == true) {
    tableStr += '<tr><td><a style="font-size:' + fontTransSize +'px;">';
    for (i=0; i < larivaarArray.length-1; i++) {
      tableStr += Pun[i] + '&nbsp';
    }
    tableStr += Pun[larivaarArray.length-1];
    tableStr += '</a></td></tr>';
  }
  tableStr += '</table>';
  tableStr += '<div><button onclick="angForw()" class="pageBottomNextBtn">Next Ang »</button></div>'
  return tableStr;
}

function readingModeOff() {
  let tableStr = '<table class="tableOfVerses">';
  for (i=0; i < larivaarArray.length; i++) {
    tableStr += '<tr>';
    tableStr += '<td style="width:70px"><div class="unselectable">' + AngNumb.toString() + ':' + i.toString() +'</div><a class="unselectable"><br/>' + '<button class="tableOfVersesBtn" onclick=\'copyToClipboard("CopyInput' + i.toString() + '")\'>❐</button>' + '</a></td>';
    tableStr += '<td><p style="font-size:' + fontVerseSize +'px;">' + larivaarArray[i] +'</p>';
    if (document.getElementById("myEng").checked == true) {
      tableStr += '<p style="font-size:' + fontTransSize +'px;">' + Eng[i] + '</p>';
    }
    if (document.getElementById("myPun").checked == true) {
      tableStr += '<p style="font-size:' + fontTransSize +'px;">' + Pun[i] + '</p>';
    }
    tableStr += '</td>' + '</tr>';
  }
  if (AngNumb != lastAngNo) {
    tableStr += '<tr><td colspan="2"><button onclick="angForw()" class="pageBottomNextBtn">Next Ang »</button></td></tr>'
  }
  tableStr += '</table><div style="position:absolute;left:-9999px;">';
  for (i=0; i < larivaarArray.length; i++) {
    tableStr += '<a id="CopyInput' + i.toString() + '">' + AngNumb.toString() + ':' + i.toString() + ' - ' + larivaarArray[i];
    if (document.getElementById("myEng").checked == true) {
    tableStr += ' ' + Eng[i];
    }
    if (document.getElementById("myPun").checked == true) {
    tableStr += ' ' + Pun[i];
    }
    tableStr += '</a>';
  }
  tableStr += '</div>';
  return tableStr;
}

function myIncreaseFnVerse() {
  fontVerseSize += 1;
  localStorage.setItem("fontSizeVerse", fontVerseSize);
  toggleReadingMode()
}
function myDecreaseFnVerse() {
  fontVerseSize += -1;
  localStorage.setItem("fontSizeVerse", fontVerseSize);
  toggleReadingMode()
}
function myIncreaseFnTrans() {
  fontTransSize += 1;
  localStorage.setItem("fontSizeTrans", fontTransSize);
  toggleReadingMode()
}
function myDecreaseFnTrans() {
  fontTransSize += -1;
  localStorage.setItem("fontSizeTrans", fontTransSize);
  toggleReadingMode()
}

function copyToClipboard(x) {
  var copyText = document.getElementById(x).innerHTML;
  selectText(x);
  document.execCommand("Copy");
  cleanText = copyText.replace(/<\/?[^>]+(>|$)/g, "");
  alert("Copied verse: " + cleanText);
}

function selectText(node) {
    node = document.getElementById(node);
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}

function saveCB(xval){
    var checkbox = document.getElementById(xval);
    localStorage.setItem(xval, checkbox.checked);
}

function loadCB(xval){    
    var checked = JSON.parse(localStorage.getItem(xval));
    document.getElementById(xval).checked = checked;
}

function toggleDarkLight() {
  saveCB("dark_light")
  var checkBC = document.getElementById("dark_light");
  if (checkBC.checked == true){
    document.getElementById("divColourBG").style.backgroundImage = "linear-gradient(" + mainColourBGDark + ", " + secondColourBGDark + ")";
    document.getElementById("divColourBG").style.color = backupColourBGDark;
    document.getElementById("divWhiteBG").style.backgroundColor = "#262626";    
    document.getElementById("divWhiteBG").style.color = "#eee";
  document.getElementById("divBorderBG").style.WebkitBorderImage = "url(https://1.bp.blogspot.com/--Rt3Ki16D3U/Xiwjl-Qe4nI/AAAAAAAAAJM/un2uzxUbZPsCmH5XNcDeHx18xEHkn0Y0wCLcBGAsYHQ/s1600/GurbaniProjectBackgroundDark.png) 300 stretch";  /* Code for Safari 5 */
  document.getElementById("divBorderBG").style.OBorderImage = "url(https://1.bp.blogspot.com/--Rt3Ki16D3U/Xiwjl-Qe4nI/AAAAAAAAAJM/un2uzxUbZPsCmH5XNcDeHx18xEHkn0Y0wCLcBGAsYHQ/s1600/GurbaniProjectBackgroundDark.png) 300 stretch";  /* Code for Opera 12 */
  document.getElementById("divBorderBG").style.borderImage = "url(https://1.bp.blogspot.com/--Rt3Ki16D3U/Xiwjl-Qe4nI/AAAAAAAAAJM/un2uzxUbZPsCmH5XNcDeHx18xEHkn0Y0wCLcBGAsYHQ/s1600/GurbaniProjectBackgroundDark.png) 300 stretch";

    document.getElementById("divGoldBG1").style.backgroundImage = "linear-gradient(#665700, #5e4a07)";
    document.getElementById("divGoldBG1").style.backgroundColor = "#5e4a07";    
    document.getElementById("divGoldBG2").style.backgroundImage = "linear-gradient(#665700, #5e4a07)";
    document.getElementById("divGoldBG2").style.backgroundColor = "#5e4a07";    
    document.getElementById("divGoldBG3").style.backgroundImage = "linear-gradient(#5e4a07, #57420d)";
    document.getElementById("divGoldBG3").style.backgroundColor = "#5e4a07";    
    document.getElementById("divGoldBG4").style.backgroundImage = "linear-gradient(to bottom right, #5e4a07, #4f3a13)";
    document.getElementById("divGoldBG4").style.backgroundColor = "#5e4a07";    

    document.getElementById("optionsMenu").style.backgroundImage = "linear-gradient(#242424, #2b2b2b)";
    document.getElementById("optionsMenu").style.backgroundColor = "#2b2b2b";    
    document.getElementById("optionsMenu").style.color = "#eee";
    document.getElementById("footerDiv").style.backgroundImage = "linear-gradient(#242424, #2b2b2b)";
    document.getElementById("footerDiv").style.backgroundColor = "#2b2b2b";    
    document.documentElement.style.setProperty('--text-highlight-text-colour', 'black');

  } else {
    document.getElementById("divColourBG").style.backgroundImage = "linear-gradient(" + mainColourBG + ", " + secondColourBG + ")";
    document.getElementById("divColourBG").style.color = backupColourBG;
      document.getElementById("divWhiteBG").style.backgroundColor = "#eee";
    document.getElementById("divWhiteBG").style.color = "#111";
    
  document.getElementById("divBorderBG").style.WebkitBorderImage = "url(https://1.bp.blogspot.com/-ruYBMvZBfv4/Xil0uy0x9LI/AAAAAAAAAJA/ED8-Sq892pAQpMXfge3BO7Vo8Bca9CvowCLcBGAsYHQ/s1600/GurbaniProjectBackground2.png) 300 stretch";  /* Code for Safari 5 */
  document.getElementById("divBorderBG").style.OBorderImage = "url(https://1.bp.blogspot.com/-ruYBMvZBfv4/Xil0uy0x9LI/AAAAAAAAAJA/ED8-Sq892pAQpMXfge3BO7Vo8Bca9CvowCLcBGAsYHQ/s1600/GurbaniProjectBackground2.png) 300 stretch";  /* Code for Opera 12 */
  document.getElementById("divBorderBG").style.borderImage = "url(https://1.bp.blogspot.com/-ruYBMvZBfv4/Xil0uy0x9LI/AAAAAAAAAJA/ED8-Sq892pAQpMXfge3BO7Vo8Bca9CvowCLcBGAsYHQ/s1600/GurbaniProjectBackground2.png) 300 stretch";

    document.getElementById("divGoldBG1").style.backgroundImage = "linear-gradient(#FFD700, #edb910)";
    document.getElementById("divGoldBG1").style.backgroundColor = "#edb910";    
    document.getElementById("divGoldBG2").style.backgroundImage = "linear-gradient(#FFD700, #edb910)";
    document.getElementById("divGoldBG2").style.backgroundColor = "#edb910";    
    document.getElementById("divGoldBG3").style.backgroundImage = "linear-gradient(#edb910, #DAA520)";
    document.getElementById("divGoldBG3").style.backgroundColor = "#edb910";    
    document.getElementById("divGoldBG4").style.backgroundImage = "linear-gradient(to bottom right, #edb910, #c79230)";
    document.getElementById("divGoldBG4").style.backgroundColor = "#edb910";    

    document.getElementById("optionsMenu").style.backgroundImage = "linear-gradient(#ededed, #dbdbdb)";
    document.getElementById("optionsMenu").style.backgroundColor = "#dbdbdb";    
    document.getElementById("optionsMenu").style.color = "#111";
    document.getElementById("footerDiv").style.backgroundImage = "linear-gradient(#575757, #6d6d6d)";
    document.getElementById("footerDiv").style.backgroundColor = "#6d6d6d";    
    document.documentElement.style.setProperty('--text-highlight-text-colour', 'white');

  }
}

//template fuctions
function toggleOptions() {
  var xTemp = document.getElementById("optionsMenu");
  if (xTemp.style.display === "block") {
    xTemp.style.display = "none";
  } else {
    xTemp.style.display = "block";
  }
}
function toggleMenu() {
  var xTemp = document.getElementById("mainMenu");
  if (xTemp.style.display === "block") {
    xTemp.style.display = "none";
  } else {
    xTemp.style.display = "block";
  }
}
function myFunction(xTemp) {
  var yTemp = document.getElementById("mainMenu");
  if (xTemp.matches) { // If media query matches
  } else {
    yTemp.style.display = "none";
  }
}

var xTemp = window.matchMedia("(max-width: 650px)")
myFunction(xTemp) // Call listener function at run time
xTemp.addListener(myFunction) // Attach listener function on state changes