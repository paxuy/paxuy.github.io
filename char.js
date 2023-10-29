"use strict";

const body = document.querySelector("body");
const p = document.querySelector("p");
body.addEventListener("click", function () {
  if (body.id === "paul") {
    body.style.backgroundColor = "red";
    body.style.color = "black";
    p.innerText = "Charlotte";
    body.id = "char";
  } else {
    body.style.backgroundColor = "blue";
    body.style.color = "white";
    p.innerText = "Paul";
    body.id = "paul";
  }
});
