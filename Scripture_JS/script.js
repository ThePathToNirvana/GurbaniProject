//script file
loadCB("myLarivaar");
loadCB("readingMode1");
loadCB("dark_light")


let IsLangAvailable = [];

for (i = 0; i < Lang.length; i++) {
  if (arrayOfVerses.length == Lang[i].length) {
    IsLangAvailable[i] = true;
  } else {
    IsLangAvailable[i] = false;
  }
}

for (i = 0; i < Lang.length; i++) {
  if (IsLangAvailable[i] == true) {
    document.getElementById('LangCont'+i).style.display = 'block';
  } else {
    document.getElementById('LangCont'+i).style.display = 'none';
  }
}


for (i=0;i<46;i++){
  document.getElementById("LangName"+[i]).innerHTML = LangName[i];
}

for (i=0;i<46;i++){
  loadCB('Lang'+[i]);
}

for (i = 0; i < Lang.IsLangAvailable; i++) {
  if (IsLangAvailable[i] == true) {
    loadCB("Lang"+i);
  } 
}

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

toggleDarkLight();
toggleReadingMode();
document.getElementById("titleScriptureAngNo").innerHTML = scriptureName + '<br/> Displaying: Ang ' + AngNumb.toString() + ' of ' + lastAngNo;

//function

function AngNoCalculator() {
  var currentSite = window.location.href;
  let currentStr = currentSiteStrFinder(currentSite);
  let AngNo = parseInt(currentStr);
  return AngNo;
}

function angSearch() {
  var x = document.getElementById("AngNo").value;
  if (x <= lastAngNo && x >= 1) {
    var str = "" + x
    var pad = "0000"
    var finalStr = pad.substring(0, pad.length - str.length) + str
    var currentSite = window.location.href;
    var currentStr = currentSiteStrFinder(currentSite);
    var newSite = currentSite.replace(currentStr, finalStr);
    window.open(newSite, "_self");
  } else {
    document.getElementById("demo1").innerHTML = "Type a number between 1 and " + lastAngNo.toString();
  }
}

function angBack() {
  var currentSite = window.location.href;
  let currentStr = currentSiteStrFinder(currentSite);
  let finalNoNoZeros = parseInt(currentStr)-1;
  let finalNumStrNoZeros = finalNoNoZeros.toString();
  let zeros = '0000'
  let finalStr = zeros.substring(0, zeros.length - finalNumStrNoZeros.length) + finalNumStrNoZeros;
  
  let newSite = currentSite.replace(currentStr, finalStr);
  window.open(newSite, "_self");
}

function angForw() {
  var currentSite = window.location.href;
  let currentStr = currentSiteStrFinder(currentSite);
  let finalNoNoZeros = parseInt(currentStr)+1;
  let finalNumStrNoZeros = finalNoNoZeros.toString();
  let zeros = '0000'
  let finalStr = zeros.substring(0, zeros.length - finalNumStrNoZeros.length) + finalNumStrNoZeros;
  
  let newSite = currentSite.replace(currentStr, finalStr);
  window.open(newSite, "_self");
}

function currentSiteStrFinder(currentSite) {
  let currentStr = ''
  for (i=0;i<lastAngNo;i++) {
    let iStr = [i+1].toString()
    let zeros = '0000'
    let final = zeros.substring(0, zeros.length - iStr.length) + iStr; 
    var n = currentSite.search('/' + final + '.html');
    if (n > 0) {
      currentStr = final;
      break;
    }
  }
  return currentStr;
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

//

function toggleReadingMode(x) {
  saveCB("myLarivaar");
  saveCB("readingMode1");
  for (i=0;i<46;i++){
    saveCB('Lang'+[i]);
  }
  for (i = 0; i < Lang.IsLangAvailable; i++) {
    if (IsLangAvailable[i] == true) {
      saveCB("Lang"+i);
    } 
  }
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
  for (i = 0; i < Lang.length; i++) {
    if (IsLangAvailable[i] == true) {
      if (document.getElementById("Lang"+i).checked == true) {
        tableStr += '<tr><td><a style="font-size:' + fontTransSize +'px;">';
        for (j=0; j < larivaarArray.length-1; j++) {
          tableStr += Lang[i][j] + '&nbsp';
        }
        tableStr += Lang[i][larivaarArray.length-1];
        tableStr += '</a></td></tr>';
      }
    }
  }
  tableStr += '</table>';
  tableStr += '<div><button onclick="angForw()" class="pageBottomNextBtn">Next Ang »</button></div>'
  return tableStr;
}

function readingModeOff() {
  let tableStr = '';
  for (i=0; i < larivaarArray.length; i++) {
    tableStr += '<div><table class="tableOfVerses">';
    if (i%2 == 1) {
      trStr = '<tr class="evenDiv1">';
    } else {
      trStr = '<tr>';
    }
    tableStr += trStr;
    tableStr += '<td style="width:70px"><a class="unselectable">' + AngNumb.toString() + ':' + [i+1].toString() +'</a><a class="unselectable"><br/>' + '<button class="tableOfVersesBtn" onclick=\'copyToClipboard("CopyInput' + i.toString() + '")\'>❐</button>' + '</a></td>';
    tableStr += '<td><p style="font-size:' + fontVerseSize +'px;">' + larivaarArray[i] +'</p></td></tr>';
    for (j=0; j < Lang.length; j++) {
      if (IsLangAvailable[j] == true) {
        if (document.getElementById("Lang"+j).checked == true) {
          tableStr += trStr + '<td><a class="unselectable"><img src="' + LangFlag[j] + '" width="30" height="20"></a>';
          tableStr += '</td><td>';
          tableStr += '<p style="font-size:' + fontTransSize +'px;">' + Lang[j][i] + '</p></td></tr>';
        }
      }
    }
    tableStr += '</table></div>';
  }
  if (AngNumb != lastAngNo) {
    if (larivaarArray.length%2 == 1) {
      trStr = '<div class="evenDiv1"><table><tr>';
      tableStr += trStr + '<td colspan="2"><button onclick="angForw()" class="pageBottomNextBtn">Next Ang »</button></td></tr></table></div>';
    } else {
      trStr = '<div class="evenDiv1"><table><tr>';
      tableStr += trStr + '<td colspan="2"><button onclick="angForw()" class="pageBottomNextBtn">Next Ang »</button></td></tr></table></div>';
    }
  }
  tableStr += '<div style="position:absolute;left:-9999px;">';
  for (i=0; i < larivaarArray.length; i++) {
    tableStr += '<a id="CopyInput' + i.toString() + '">' + AngNumb.toString() + ':' + [i+1].toString() + ' - ' + larivaarArray[i];
    for (j=0; j < Lang.length; j++) {
      if (IsLangAvailable[j] == true) {
        if (document.getElementById("Lang"+j).checked == true) {
          tableStr += ' ' + Lang[j][i];
        }
      }
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
  saveCB("dark_light");
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

