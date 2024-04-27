const userDom = document.querySelector(".MCWXT");
const userDataApi = {
  url: "api/bilibli.php",
  dataType: "json",
  async: false
};
const dataApi = {
  url: "js/data.json",
  dataType: "json",
  async: false
};
if (document.cookie) {
  const person = document.cookie;
  document.querySelector(".x").innerHTML ="你好 " + person + "！ 欢迎来到我的个人博客！今天感觉如何?";
} else {
  person();
}
const http = document.querySelector("#http");
const sound = document.querySelector("#muyu-sound");
const data = ajax(dataApi);
sound.src = data.music;
const name = data.name;
const url = data.url;
var i = name.length,
    val2 = "";
for (var num = 0;num < i;num++){
  var val = `<a class="lj" href="${url[num]}">${name[num]}</a>`;
  var val2 = val2 + val;
};
http.innerHTML = val2;
function one() {
  console.log('成功1');
  document.getElementById("if").src = "/http.html";
}
function two() {
  console.log('成功2');
  document.getElementById("if").src = "https://qm.qq.com/q/D4iKnxzeI8";
  window.open('https://qm.qq.com/q/1ceXDeevOk')
}
function three() {
  console.log('成功3');
  document.getElementById("if").src = "https://c.runoob.com/";
}
function isPlay() {
  if (sound.paused) {
    sound.play();
  } else if (sound.play()) {
    sound.pause();
  }
}
function person() {
  const person = prompt("name")
  if (person!=null && person!=""){
    document.cookie = person;
    document.querySelector(".x").innerHTML ="你好 " + person + "！ 欢迎来到我的个人博客！今天感觉如何?";
  }
}
function ajax(url){
  const unprocessedData = $.ajax(url).responseText;
  const data = $.parseJSON(unprocessedData);
  return data;
}
function user() {
  const data = ajax(userDataApi).data;
  const content = `<p id="xx"><b id="MCWXT">${data.uname}</b> ${data.sex}<b class="boy"> ${data.birthday} </b> ${data.rank} &nbsp uid：${data.mid}</p>`;
  userDom = content;
}
user()