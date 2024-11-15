import { ref, watch } from 'vue';
export class Router {
  constructor(config = {}) {
    this.routes = config.routes;
    this.location = ref(this.routes[this.path] ? this.routes[this.path].location : config[404]);
    this.path = ref(window.location.pathname || (window.location.pathname = config.defaultPath));
    watch(this.path, (path) => this.update(this.routes, path));
    this.config = config;
  }
  update(routes, path) {
    routes[path].historyGo && (window.location.href = routes[path].location);
    this.location.value = routes[path] ? routes[path].location : this.config[404];
    return {
      function: this.config.update(this.routes, this.path, this.location),
    }
  }
}