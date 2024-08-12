class Github {
  constructor() {
    this.user = 'MCWXT';
    this.repository = 'mcwxt.github.io';
    this.apiInterface = `https://api.github.com/repos/${this.user}/${this.repository}/`;
    this.html = `https://github.com/${this.user}/${this.repository}/`;
    this.issuesApi = this.apiInterface + 'issues';
    this.issuesHTML = this.html + 'issues';
  }
  issueHTML(num) {
    return this.issuesHTML + '/' + num;
  }
  issueApi(num) {
    return this.issuesApi + '/' + num;
  }
}
const github = new Github();