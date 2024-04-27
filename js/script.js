const dom = {
  menu: $(".menu>div"),
  link: $(".friendLinkContainer>div"),
}
var display = false;
const isDisplay = () => {
  if (display == false) {
    dom.menu.css({"-webkit-animation-name":"displayMenu","display":"block"});
    display = true;
  } else {
    dom.menu.css({"-webkit-animation-name":"hideMenu","display":"block"});
    display = false;
  }
}
const totalData = $.parseJSON($.ajax({
  url: "data/data.json",
  dataType: "json",
  async: false
}).responseText);;

const links = () => {
  var partition = "";
  var project = "";
  for (var i = 0; i < totalData.friendLink.length; i++) {
    if (totalData.friendLink[i][1] == undefined) {
      project = `<a class="noContent" href="//qm.qq.com/q/dK9JkIho3e;">No Content!点击加入</a>`;
    }
    for (var num = 1; num < totalData.friendLink[i].length; num++) {
        project = project + `
              <a class="friendLinks" href="${totalData.friendLink[i][num].link}">
              <div class="linkIcon">
              <img src="${totalData.friendLink[i][num].icon}" alt="">
              </div>
              <div class="linkInfon">
              <h3>${totalData.friendLink[i][num].name}</h3>
              <h4>${totalData.friendLink[i][num].brief}</h4>
              </div>
              </a>`;
      }
    partition = partition + `
        <div class="friendLink">
          <div id="${totalData.friendLink[i][0].class}" class="linkTitle">
            <svg t="1710585330104" class="linksIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1626"><path d="M648.32 715.072l-124.992 125.056a224 224 0 0 1-316.8 0l-22.656-22.656a224 224 0 0 1 0-316.8L308.48 376.064l63.488 63.232-124.736 124.8a134.4 134.4 0 0 0-6.528 183.04l6.528 7.04 22.656 22.592a134.4 134.4 0 0 0 183.04 6.528l7.04-6.528 124.928-124.992 63.36 63.296z m-44.288-295.04a44.8 44.8 0 0 1 0 63.36L484.736 602.56a44.8 44.8 0 1 1-63.36-63.36l119.296-119.232a44.8 44.8 0 0 1 63.36 0z m236.032-213.504a224 224 0 0 1 0 316.8l-123.84 123.84-63.488-63.296 123.968-123.904a134.4 134.4 0 0 0 6.592-183.04l-6.592-7.04-22.592-22.592a134.4 134.4 0 0 0-183.04-6.592l-7.04 6.592-124.224 124.16-63.488-63.232 124.352-124.288a224 224 0 0 1 316.8 0l22.592 22.592z" p-id="1627"></path></svg>
            <h2>${totalData.friendLink[i][0].type}</h2>
            ${project}
          </div>
        </div>
        `
        project = "";
  }
  return partition;
}
dom.link.html(links());