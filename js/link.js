function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
const link = getQueryString("target");
const linkUrl = document.querySelector(".linkUrl");
const linkButton = document.querySelector(".linkButton");
const linkOf = () => {
    return "http:" + (link || "//mcwxt.top");
}
linkUrl.innerHTML = linkOf();
linkButton.addEventListener('click',() => {
  window.open(linkOf());
});