import { ref, watch } from 'vue';
import { _wr } from '/script/script.js';
export class Router {
  constructor(config = {}) {
    this.routes = config.routes;
    this.path = ref(window.location.pathname || (window.location.pathname = config.defaultPath));
    this.location = ref(this.routes[this.path.value] ? this.routes[this.path.value].location : config[404]);
    watch(this.path, (path) => this.push(path));
    this.config = config;
    history.pushState = _wr('pushState');
    window.addEventListener('pushState', () => this.update());
    window.onpopstate = () => this.update();
    onclick = (e) => this.onclick(e);
  }
  onclick(e) {
    if (e.target.nodeName.toLocaleLowerCase() === 'a' && e.target.href.indexOf(location.origin) != -1) {
        e.preventDefault();
        this.to(new URL(e.target.href));
      }
  }
  push(path) {
    this.location.value = this.routes[path] ? this.routes[path].location : this.config[404];
    this.routes[path] && this.routes[path].historyGo && (window.location.href = this.routes[path].location);
    return {
      function: this.config.update(this.routes, this.path, this.location),
    }
  }
  update() {
    return this.path.value = location.pathname;
  }
  to(url) {
    parent.history.pushState({}, '', url.pathname + url.hash + url.search);
  }
}   