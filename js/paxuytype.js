//---------Programm---------

let jsonObj = loadJSON("../paxuytype/texts/texts.json");
let speedtext = jsonObj[0];

/*
let correct = document.createElement('span');
correct.id = "correct";
document.getElementById("speedtext").append(correct);
correct = document.getElementById("correct");

let coming = document.createElement('span');
coming.id = "coming";
document.getElementById("speedtext").append(coming);

coming = document.getElementById("coming");
*/
/*
speedtext.split("").forEach(letter => {
    let spa = document.createElement('span');
        spa.innerHTML = letter;
    document.getElementById("speedtext").append(spa);
});
*/
var spans = document.getElementById("speedtext").childNodes;


//document.getElementById("coming").innerHTML = speedtext;



/*
document.getElementById("inp").addEventListener("input", trigger);
function trigger() {
    document.getElementById("inp").value += "got it";
}
*/

//document.getElementById("inp").addEventListener("input", updateOutput);
//document.getElementById("inp").addEventListener("input", checkInput);
document.getElementById("inp").addEventListener("input", updateText);
//document.getElementById("inp").addEventListener("input", reset);


let words = speedtext.split(" ");
let currentWord = 0;
for (let i = 0; i < words.length; i++) {
    let wordSpan = document.createElement('span');
    wordSpan.class = "word";
    words[i] = words[i].split("");
    words[i].forEach(letter => {
        let letterSpan = document.createElement('span');
        letterSpan.innerText = letter;
        wordSpan.append(letterSpan);
    });
    let spaceSpan = document.createElement('span');
    spaceSpan.innerText = " ";
    wordSpan.append(spaceSpan);
    document.getElementById("speedtext").append(wordSpan);
}


let letters = speedtext;
let currentLetter = 0;
var text = document.getElementById("speedtext");
let wrongExist = false;
document.getElementById("inp").focus();
document.getElementById("inp").value = " ";
function nextWord() {
    currentLetter += words[currentWord].length
}

/*
function cursor() {
    for (let i = text.childNodes[currentWord].childElementCount-1; i >= 0; i--) {
        if (text.childNodes[currentWord].childNodes[i].id !== "") {
            text.childNodes[currentWord].childNodes[i].id = "";
            text.childNodes[currentWord].childNodes[i+1].id = "current";
        }
        
    }
}*/

text.childNodes[0].childNodes[0].id = "current";

function updateText() {
    
    document.getElementById("current").id = "";

    document.getElementById("debug").innerText = `-${spans[currentLetter].innerText}-`;

    let currentInput = getInputvalue();
    if(currentInput === "  "){
        let wordCorrect = true;
        for (let i = 0; i < text.childNodes[currentWord].childElementCount; i++) {
            if (text.childNodes[currentWord].childNodes[i].classList.contains("wrong")) {
                wordCorrect = false;
            }
        }
        if (wordCorrect) {
            text.childNodes[currentWord].classList.add("correctWord");
        }
        currentWord++;
        currentLetter = 0;
        text.childNodes[currentWord].childNodes[currentLetter].id = "current";
        document.getElementById("inp").value = " ";
    }
    //Richtig
    else if (currentInput === " " + words[currentWord][currentLetter]){

        text.childNodes[currentWord].childNodes[currentLetter].classList.add('correct');
        currentLetter++;
        text.childNodes[currentWord].childNodes[currentLetter].id = "current";
        document.getElementById("inp").value = " ";
    }/*
    else if(currentInput === " "){
        document.getElementById("currentWrong").outerHTML = "";
        wrongExist = false;

    }*/
    //Löschen
    else if(currentInput === ""){
        if (currentLetter === 0) {
            currentWord--;
            currentLetter = words[currentWord].length-1;
        }
        else{
            currentLetter--;
        }
        if (text.childNodes[currentWord].childNodes[currentLetter].className === "wrong") {
            text.childNodes[currentWord].childNodes[currentLetter].innerText = words[currentWord][currentLetter];
        }
        text.childNodes[currentWord].childNodes[currentLetter].className = "";
        text.childNodes[currentWord].childNodes[currentLetter].id = "current";
        document.getElementById("inp").value = " ";
    }
    //Wrong
    else{
        if (currentLetter < words[currentWord].length) {
            text.childNodes[currentWord].childNodes[currentLetter].innerText = currentInput.charAt(1);
            text.childNodes[currentWord].childNodes[currentLetter].classList.add('wrong');
            currentLetter++;
            text.childNodes[currentWord].childNodes[currentLetter].id = "current";
        }
        else if (currentLetter === words[currentWord].length) {
            if (text.childNodes[currentWord].childNodes[currentLetter].classList.contains("wrong")) {
                let extraWrong = document.createElement("span");
                extraWrong.innerText = currentInput.charAt(1);
                extraWrong.className = "extraWrong";
                extraWrong.id = "current";
                text.childNodes[currentWord].append(extraWrong);
            }else{
                text.childNodes[currentWord].childNodes[currentLetter].innerText = currentInput.charAt(1);
                text.childNodes[currentWord].childNodes[currentLetter].classList.add('wrong');
                text.childNodes[currentWord].childNodes[currentLetter].id = "current";

                /*
                let extraWrong = document.createElement("span");
                extraWrong.innerText = currentInput.charAt(1);
                extraWrong.className = "extraWrong";
                text.childNodes[currentWord].append(extraWrong);
                */
            }

        }
        
        document.getElementById("inp").value = " ";


        /*
        if (!wrongExist) {
            let wrong = document.createElement('span');
            wrong.id = "currentWrong";
            text.insertBefore(wrong, text.children[currentLetter]);
            wrongExist = true;
        }
        
        //Skip wrong characters with space
        if (currentInput.charAt(currentInput.length - 1) === " ") {
            document.getElementById("speedtext").childNodes[currentLetter].id = "";
            document.getElementById("speedtext").childNodes[currentLetter].classList.add('wrong');
            currentLetter++;
            document.getElementById("inp").value = " ";
            wrongExist = false;
        }//Show wrong characters
        else{
            document.getElementById("currentWrong").innerText = currentInput.slice(1);
        }
        */
        
    }

    

/*
    if (getInputvalue() === letters[currentLetter]) {
        
        

        correct.innerText += letters[currentLetter];
        if (letters[currentLetter] !== " ") {
            coming.innerText = coming.innerText.slice(1);
        }
        else{
            coming.innerText = coming.innerText;
        }
        currentLetter++;
        document.getElementById("inp").value = "";

    }
    document.getElementById("debug").innerText = `n=${currentLetter}  Letter: -${letters[currentLetter]}-`;
    */
}


//document.getElementById("inp").addEventListener("keydown", ifDelete);
function ifDelete(event){
   var KeyID = event.keyCode;
   switch(KeyID){
      case 8: case 46:

      break; 
      default:
      break;
   }
}



//---------Functions---------

function loadJSON(path) {
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null)
    return JSON.parse(request.responseText);
}

function updateOutput() {
    document.getElementById("output").innerHTML = document.getElementById("inp").value;
}

function checkInput() {
    if(document.getElementById("inp").value === words[currentWord] + " "){
        let elem = document.createElement('span');
        elem.id = "correct";
        elem.innerHTML = words[currentWord] + " ";
        document.getElementById("output").append(elem);
        currentWord++;
        document.getElementById("inp").value = "";
    }
}

function getInputvalue() {
    return document.getElementById("inp").value;
}

function reset() {
    if (getInputvalue().charAt(getInputvalue().length-1) === " ") {
        document.getElementById("inp").value = "";
    }
}

