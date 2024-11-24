import { ref, watch } from 'vue';
import { Router } from '/script/router.js';
export class App {
  constructor(routerConfig) {
    this.router = new Router(routerConfig);
    this.src = this.router.location;
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
    win.onclick = (e) => this.router.onclick(e);
    this.loading = false;
  }
  stopScroll(e) {
    e.preventDefault();
  }
}