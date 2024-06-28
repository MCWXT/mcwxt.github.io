dom.link =  $(".friendLinkContainer>div");
const links = () => {
  var partition = "";
  var project = "";
  for (var i = 0; i < totalData.friendLink.length; i++) {
    if (totalData.friendLink[i][1] == undefined) {
      project = `<a class="noContent" href="//qm.qq.com/q/dK9JkIho3e;">No Content!点击加入</a>`;
    }
    for (var num = 1; num < totalData.friendLink[i].length; num++) {
      project = project + `
              <a class="friendLinks" href="link.html?target=${totalData.friendLink[i][num].link}">
              <div class="linkIcon">
              <img src="${totalData.friendLink[i][num].icon}" alt="">
              </div>
              <div class="linkInfo">
              <h3>${totalData.friendLink[i][num].name}</h3>
              <h4>${totalData.friendLink[i][num].brief}</h4>
              </div>
              </a>`;
    }
    partition = partition + `
        <div class="friendLink">
          <div id="${totalData.friendLink[i][0].class}" class="linkTitle">
            <i class="bi bi-link-45deg linksIcons"></i>
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