var encrptedMessage = "U2FsdGVkX19bJE+J7TkRSdK2tKA/+WMtlOmvEETrX4Cfee9beGHNna50eXstVcBXp9AnfP6V4f089zRRvfSsXiN6vEz8zuQosQWXbmMYH7aPx1qgv9kh8JI2tYmkbRgmKl8Ob21lmja1tFOhEGTag9l9ZB8aQNYZW5xvo/t14nzMUOFnOtb5zT5XE19yNW1rXhQbDc+jBQe+1BfutLEtP8XnD/MuJQ/1AA56KJgsu6+LJu6rckm+3hWdv18+ZrWoCrWLtkPeda3NYy/paSprTwEvvN8KvyjkOzNs4110bHhNUtSFRPyD5ctc4s0B9RiFkr3eV3iHwlO6SJRgYaB3myWfJ+kaZ233nCYPTjSy0lbWKw2WgTEUosvDkTKPEoouj0oDpNQqEr5Z259xDHqeETZGg4xXPOu6SrTQpkDTNmVBNnHAD4mvVCTO2opagXPY6aay6VYh0n6thpTR+8dvd5poNUyoTQcKVwb78Bco5raYTcqHNaW96h3w7meaZU43KU2IPhJTJA1NvvTDMu/FPFyI9zGFpSovQRRlQZI+cAU98mcR0Z9ai0QGSWBWz0JOD3J4Kaq9vLj31EE9Ug0wtBxb/Hu3QmC3aj6ve0oZUcVHuVDqFRheLSIm8OzUG2A2dBLRpqo0OBok/8tL7QEN0eOfvB7bWf26CKOO5SDe5Uy/AiYbltAYP6OWewNfaezE9yLXdOW+Z/hOx2qCvgr85rrPxF2W6TWOpvIMj35bV9CD2FcRzZqSO83f8Lh7H/tHR6/Ke2UUTnBPjF7C3Uhwtkiqf3fBfyjbsM7i3areQz4="


function hashString(string) {
    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(string);
    return shaObj.getHash("HEX");
}

// Store the hash of the correct input
// const correctInputHash = hashString('correct input');

// Then, when you get user input, you can hash it and compare it to the stored hash
function checkInput(userInput) {
    const userInputHash = hashString(userInput);
    return userInputHash === correctInputHash;
}

// console.log(checkInput('correct input')); // Prints true
// console.log(checkInput('incorrect input')); // Prints false


// Encryption function
function encryptMessage(message, key) {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf16.parse(message), key).toString();
}

// Decryption function
function decryptMessage(ciphertext, key) {
    if (!ciphertext) {
        return 'error';
    }
    var bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf16);
}

// Usage
// var key = 'my secret key'; // This is your seed
// var originalMessage = 'Hello, World!';

// var encryptedMessage = encryptMessage(originalMessage, key);
// console.log('Encrypted Message: ' + encryptedMessage);

// var decryptedMessage = decryptMessage(encryptedMessage, key);
// console.log('Decrypted Message: ' + decryptedMessage); // Prints 'Hello, World!'



// function updateDecryptMessage(key) {
//     // var key = hashString(answer);
//     // console.log(key);
//     var message = document.getElementById('encryptedMessage').innerText;
//     // console.log(document.getElementById('encryptedMessage').innerText);
//     var decryptedMessage = decryptMessage(message, key);
//     // console.log(decryptedMessage);
//     // document.getElementById('decryptedMessage').innerText = decryptedMessage;
//     return decryptedMessage;
// }




window.onload = function () {
    // document.getElementById('encryptedMessage').innerText = encryptMessage(document.getElementById('message').innerText, hashString('egri'));

    document.getElementById('encrypted1').innerText = encrptedMessage;
    document.getElementById('decrypted1').innerText = encrptedMessage;
    // document.getElementById('encrypted2').innerText = encryptMessage(document.getElementById('part2').innerText, key2);
    // document.getElementById('encrypted3').innerText = encryptMessage(document.getElementById('part3').innerText, key3);
    // document.getElementById('encrypted4').innerText = encryptMessage(document.getElementById('part4').innerText, key4);
    // document.getElementById('encrypted5').innerText = encryptMessage(document.getElementById('part5').innerText, key5);

};


// document.getElementById('answerForm').addEventListener('submit', function (event) {
//     // This prevents the form from submitting normally
//     event.preventDefault();

//     // Get the user's answer
//     var answer = document.getElementById('answer1').value +
//         document.getElementById('answer2').value +
//         document.getElementById('answer3').value +
//         document.getElementById('answer4').value +
//         document.getElementById('answer5').value;

//     // Call your function
//     updateDecryptMessage(answer);
// });

function checkAnswer(answer, number) {
    if (!answer) {
        return;
    }
    var hashedAnswer = hashString(answer);

    switch (number) {
        case 1:
            document.getElementById('decrypted1').innerText = decryptMessage(document.getElementById('encrypted1').innerText, hashedAnswer);
            break;
        // case 2:
        //     document.getElementById('decrypted2').innerText = decryptMessage(document.getElementById('encrypted2').innerText, hashedAnswer);
        //     break;
        // case 3:
        //     document.getElementById('decrypted3').innerText = decryptMessage(document.getElementById('encrypted3').innerText, hashedAnswer);
        //     break;
        // case 4:
        //     document.getElementById('decrypted4').innerText = decryptMessage(document.getElementById('encrypted4').innerText, hashedAnswer);
        //     break;
        // case 5:
        //     document.getElementById('decrypted5').innerText = decryptMessage(document.getElementById('encrypted5').innerText, hashedAnswer);
        //     break;
        default:
            break;
    }
}


document.getElementById('answerForm').addEventListener('submit', function (event) {
    // This prevents the form from submitting normally
    event.preventDefault();

    // Get the current question
    // var form = document.getElementById('answerForm');
    // var currentQuestion = form.getAttribute('data-current-question');

    for (var index = 1; index < 2; index++) {
        checkAnswer(document.getElementById('answer' + index).value, index);
        
    }
});





