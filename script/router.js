import { ref, reactive, watch } from 'vue';
import { _wr } from '/script/script.js';
export class Router {
  baseUrl = 'https://mcwxt.top';
  constructor(config = {}) {
    this.path = ref(window.location.pathname || (window.location.pathname = config.defaultPath));
    this.route = reactive({path: this.path.value, component: config[404], name: 'Not Found', params: {}});
    watch(this.path, (path) => this.push(path));
    this.config = config;
    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');
    window.addEventListener('pushState', () => this.update());
    window.addEventListener('replaceState', () => this.update());
    window.onpopstate = () => this.update();
    onclick = (e) => this.click(e);
  }
  click(e) {
    if (e.target.nodeName.toLocaleLowerCase() === 'a' && e.target.href.indexOf(window.location.origin) != -1) {
      e.preventDefault();
      this.to(e.target.href);
    }
  }
  match(path) {
    for (let route of this.config.routes) {
      const pathRegex = new RegExp(
        '^' + route.path
        .replace(/([.+*?=^!:${}()|\[\]\/\\])/g, '\$1') // 转义正则特殊字符
        .replace(/:([a-zA-Z0-9_]+)/g, '(.+)') // 替换动态参数部分
        +
        '$' // 结束符
      );
      const match = path.match(pathRegex);
      if (match) {
        const params = {};
        if (route.path.includes(':')) {
          const paramNames = route.path.match(/:([a-zA-Z0-9_]+)/g).map(param => param.substring(1));
          paramNames.forEach((param, index) => {
            params[param] = match[index + 1];
          });
        }
        route.path = path;
        route.params = params;
        return route;
      }
    }
    return { path, component: this.config[404], name: 'Not Found'};
  }
  push(path) {
    Object.assign(this.route, this.match(path));
    window.route = this.route;
    document.title = this.config.title.replace('{{*}}', this.route.name || this.route.link || '');
    this.route.link && (window.location.href = this.route.link);
  }
  update() {
    this.path.value = window.location.pathname;
    return {
      function: this.config.update(this.route),
    }
  }
  to(path) {
    const url = new URL(path, this.baseUrl);
    parent.history.pushState({}, '', url.pathname + url.hash + url.search);
  }
}