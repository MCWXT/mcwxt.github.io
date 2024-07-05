const imports = (assembly) => {
  const name = assemblyApi = {
    url: "component/" + assembly + ".html",
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
  loading: $("loading"),
  nav: $(".nav"),
  naver: $(".naver")
}
dom.naver[0].style.height = window.getComputedStyle(dom.nav[0]).height;
const scroll = () => {
  const scrollTop = $(window).scrollTop();
  if (scrollTop >= parseFloat(window.getComputedStyle(dom.nav[0]).height) + 1 && dom.nav[0].style.backgroundColor !== "rgba(255, 255, 255, 0.8)") {
    dom.nav.css({
      "background-color": "#FFFFFFCC",
      
    });
  } else if (scrollTop <= parseFloat(window.getComputedStyle(dom.nav[0]).height) + 1 && dom.nav[0].style.backgroundColor !== "white") {
    dom.nav.css({
      "background-color": "white",
    });
  }
}
$(window).on('scroll', () => scroll());
var display = false;
const isDisplay = () => {
  if (dom.menu[0].style.animationName == "displayMenu" || null) {
    dom.menu.css({"-webkit-animation-name":"hideMenu"});
  } else {
    dom.menu.css({"-webkit-animation-name":"displayMenu"});
  }
  
  
}
const requestData = (dataName) => {
  return $.parseJSON($.ajax({
  url: "data/" + dataName,
  dataType: "json",
  async: false
}).responseText);
}
const code = (str) => {
  if (str.indexOf("base64") !== -1) {
    const decode = atob(str.replace("base64",""));
    const code = decodeURI(decode);
    return code;
  }
  const encode = encodeURI(str);
  const code = btoa(encode);
  return "base64" + code;
  }
dom.loading.fadeOut(1000);