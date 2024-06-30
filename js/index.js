dom.link =  $(".friendLinkContainer>div");
const linkData = requestData("link.json");

var partition = "";
var project = "";
for (var i = 0; i < linkData.friendLink.length; i++) {
  if (linkData.friendLink[i][1] == undefined) {
    project = `<a class="noContent" href="//qm.qq.com/q/dK9JkIho3e;">No Content!点击加入</a>`;
  }
  for (var num = 1; num < linkData.friendLink[i].length; num++) {
    project = project + `
            
            <a href="link.html?target=${linkData.friendLink[i][num].link}">
            <div class="linkIcon">
            <img src="${linkData.friendLink[i][num].icon}" alt="">
            </div>
            <div class="linkInfo">
            <h3>${linkData.friendLink[i][num].name}</h3>
            <h4>${linkData.friendLink[i][num].brief}</h4>
            </div>
            </a>
            
            `;
  }
  partition = partition + `
      <div class="friendLink">
        <div id="${linkData.friendLink[i][0].class}" class="linkTitle">
          <i class="bi bi-link-45deg linksIcon"></i>
          <h2>${linkData.friendLink[i][0].type}</h2>
          <div class="friendLinks">${project}</div>
        </div>
      </div>
      `
  project = "";
}

dom.link.html(partition);