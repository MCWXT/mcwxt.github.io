import { ref, watch } from '/cdn_modules/vue@3.5.13/vue.esm-browser.prod.min.js';
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
    const iframeDocument = e.target.contentWindow.document;
    //this.height = iframeDocument.documentElement.offsetHeight;
    iframeDocument.onclick = (e) => this.router.click(e);
    const resizeObserver = new ResizeObserver((entries) => {
      this.height = entries[0].contentRect.height;
    });
    resizeObserver.observe(iframeDocument.documentElement);
    this.loading = false;
  }
  stopScroll(e) {
    e.preventDefault();
  }
}