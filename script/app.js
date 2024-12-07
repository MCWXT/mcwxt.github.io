import { ref, watch } from 'vue';
import { Router } from '/script/router.js';
export class App {
  constructor(routerConfig) {
    routerConfig.update = () => {
      this.loading = true;
      this.height = 0;
    }
    this.router = new Router(routerConfig);
    this.router.push(this.router.path.value);
    this.loading = true;
    this.height = 0;
  }
  onload(e) {
    window.scroll({
      top: 0,
      behavior: 'instant'
    });
    const win = e.target.contentWindow.document;
    this.height = win.documentElement.scrollHeight;
    win.onclick = (e) => this.router.click(e);
    this.loading = false;
  }
  stopScroll(e) {
    e.preventDefault();
  }
}