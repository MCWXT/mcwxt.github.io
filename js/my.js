const data =  $.parseJSON($.ajax({
            url: "/js/data.json",
            dataType: "json",
            async: false
}).responseText);
const av = data.av;
const nm = data.nm;
const js = data.js;
const hp = data.hp;
var a = nm.length;
for (var num = 0;num < a;num++){
  if (!av[num]) {
    var newav = "/img/avatar.jpg";
  } else {
    var newav = av[num];
  }
  const len = 
  `<a href="${hp[num]}">
    <div class="a">
      <div class = "f">
        <div>
          <img src="${newav}" class="img">
        </div>
        
        <div>
          <p><b class = "name">${nm[num]}</b>${js[num]}</p>
        </div>
      </div>
    </div>
  </a>`
  document.write(len);
};