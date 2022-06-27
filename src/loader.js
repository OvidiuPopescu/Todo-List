s = document.createElement("script");              /*variabila in care se afla un element script...*/
s.src = chrome.runtime.getURL("src/youtubedl.js"); /*...a carui surs este acest fisier*/

s.onload = function () {
    this.remove();
}

document.head.appendChild(s); /*append s to header element of the page*/
