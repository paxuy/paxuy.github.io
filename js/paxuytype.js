//---------Programm---------

let jsonObj = loadJSON("../paxuytype/texts/texts.json");
let speedtext = jsonObj[2];

document.getElementById("inp").addEventListener("input", updateText);

document.getElementById("speedtext").addEventListener("click", focusInput)
function focusInput() {
    document.getElementById("inp").focus();
}

document.getElementById("inp").addEventListener('paste', e => e.preventDefault());
document.getElementById("inp").addEventListener('drop', e => e.preventDefault());


document.getElementById("inp").addEventListener("input", startTimer);
function startTimer() {
    document.getElementById("inp").removeEventListener("input", startTimer);
    runTimer = true;
    setTimeout(timer, 1000);

}

let time = 0;
let runTimer = false;

function timer() {
    let s, m;
    time++;
    s = time % 60;
    m = (time-s)/60;
    if (s<10) {
        s = "0" + s;
    }
    if (m<10) {
        m = "0" + m;
    }
    document.getElementById('timer').innerHTML = m + ":" + s;
    if (runTimer) {
        setTimeout(timer, 1000);
    }
    
}

function stopTimer() {
    runTimer = false;
}


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
let text = document.getElementById("speedtext");

document.getElementById("inp").focus();
document.getElementById("inp").value = " ";

text.childNodes[0].childNodes[0].id = "current";

function updateText() {

    document.getElementById("current").id = "";

    let currentInput = getInputvalue();

    //Space
    if (currentInput === "  ") {
        let wordCorrect = true;
        for (let i = 0; i < text.childNodes[currentWord].childElementCount; i++) {
            if (text.childNodes[currentWord].childNodes[i].classList.contains("wrong")) {
                wordCorrect = false;
            }
        }
        if (wordCorrect) {
            text.childNodes[currentWord].classList.remove("wrongWord");
            text.childNodes[currentWord].classList.add("correctWord");
        }
        else{
            text.childNodes[currentWord].classList.remove("correctWord");
            text.childNodes[currentWord].classList.add("wrongWord");
        }
        currentWord++;
        currentLetter = 0;
        text.childNodes[currentWord].childNodes[currentLetter].id = "current";
        document.getElementById("inp").value = " ";
    }

    //Richtig
    else if (currentInput === " " + words[currentWord][currentLetter]) {

        text.childNodes[currentWord].childNodes[currentLetter].classList.add('correct');
        currentLetter++;
        text.childNodes[currentWord].childNodes[currentLetter].id = "current";
        document.getElementById("inp").value = " ";
    }

    //Löschen
    else if (currentInput === "") {

        if (currentWord === 0 && currentLetter === 0) {
            text.childNodes[0].childNodes[0].id = "current";
        }
        else if (currentLetter === 0) {
            currentWord--;
            currentLetter = words[currentWord].length;
            if (text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 2].classList.contains("extraWrong")) {
                
                text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 2].outerHTML = "";
                text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 1].id = "current";
            }
            else if (!text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 2].hasAttribute("class") || text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 2].className === "") {
                let breakFor = false;
                for (let y = currentWord; y >= 0; y--) {
                    for (let i = text.childNodes[y].childElementCount-1; i >= 0; i--) {
                        if(text.childNodes[y].childNodes[i].hasAttribute("class") && text.childNodes[y].childNodes[i].className !== ""){
                            
                            text.childNodes[y].childNodes[i+1].id = "current";
                            currentLetter = i+1;
                            currentWord = y;
                            
                            breakFor = true;
                            break;
                        }
                    }
                    if (breakFor) {
                        break;
                    }
                }
            }
            else {
                if (text.childNodes[currentWord].childNodes[currentLetter].className === "wrong") {
                    text.childNodes[currentWord].childNodes[currentLetter].innerText = words[currentWord][currentLetter];
                }
                text.childNodes[currentWord].childNodes[currentLetter].className = "";
                text.childNodes[currentWord].childNodes[currentLetter].id = "current";
            }
        }
        else if (text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 2].classList.contains("extraWrong")) {
            text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 2].outerHTML = "";
            text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 1].id = "current";
        }
        else {
            currentLetter--;
            if (text.childNodes[currentWord].childNodes[currentLetter].className === "wrong") {
                text.childNodes[currentWord].childNodes[currentLetter].innerText = words[currentWord][currentLetter];
            }
            text.childNodes[currentWord].childNodes[currentLetter].className = "";
            text.childNodes[currentWord].childNodes[currentLetter].id = "current";
        }
        document.getElementById("inp").value = " ";
    }

    //Wrong
    else {
        if (currentLetter < words[currentWord].length) {
            text.childNodes[currentWord].childNodes[currentLetter].innerText = currentInput.charAt(1);
            text.childNodes[currentWord].childNodes[currentLetter].classList.add('wrong');
            currentLetter++;
            text.childNodes[currentWord].childNodes[currentLetter].id = "current";
        }
        else if (currentLetter === words[currentWord].length) {
            let extraWrong = document.createElement("span");
            extraWrong.innerText = currentInput.charAt(1);
            extraWrong.className = "extraWrong";
            text.childNodes[currentWord].insertBefore(extraWrong, text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 1]);
            text.childNodes[currentWord].childNodes[text.childNodes[currentWord].childElementCount - 1].id = "current";
        }
        document.getElementById("inp").value = " ";
    }

    //Finish
    if (currentWord === words.length-1 && currentLetter === words[words.length-1].length) {
        finish();
    }

    //Debug
    /*
    document.getElementById("debug").innerText = `Current Word-Letter(${currentWord}-${currentLetter}): -${words[currentWord][currentLetter]}-
    Current Input: -${currentInput}-`;
    */
}

function typing() {
    document.querySelectorAll("body > p:not(.speedtext)").style
}

function finish() {
    stopTimer();
    document.getElementById("inp").disabled = true;
    let correctChar;
    let wrongChar;
    let correctWords;
    let wrongWords;
    let wpm;
    let accuracy;
    document.getElementById("result").innerText = ``;
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
    if (document.getElementById("inp").value === words[currentWord] + " ") {
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
    if (getInputvalue().charAt(getInputvalue().length - 1) === " ") {
        document.getElementById("inp").value = "";
    }
}