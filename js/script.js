
const imports = (assembly) => {
  const name = assemblyApi = {
    url: "component/" + assembly + ".txt",
    dataType: "json",
    async: false
  }
  const assemblyData = $.ajax(this.assemblyApi).responseText;
  const assemblyDom = $(assembly);
  assemblyDom.html(assemblyData);
}

imports("header");
imports("footer");

const dom = {
  menu: $(".menu>div"),
  loading: $("loading")
}
var display = false;
const isDisplay = () => {
  if (dom.menu[0].style.animationName == "displayMenu" || null) {
    dom.menu.css({"-webkit-animation-name":"hideMenu"});
  } else {
    dom.menu.css({"-webkit-animation-name":"displayMenu"});
  }
  
  
}
const totalData = $.parseJSON($.ajax({
  url: "data/data.json",
  dataType: "json",
  async: false
}).responseText);

dom.loading.fadeOut(1000);