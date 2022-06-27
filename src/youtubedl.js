
window.onload = function() {

  var videoUrls =  "Outdated";
  console.log("Our extension has loaded", videoUrls);
}

var container = document.getElementById("actions"); /*clasa contaier YT*/
var btn = document.createElement("button");    /*cream element cu parametrii sai*/
btn.className = "style-scope yt-icon-button";
btn.setAttribute("role","button");
btn.innerText = "Download";

container.appendChild(btn); /*append button in container*/
