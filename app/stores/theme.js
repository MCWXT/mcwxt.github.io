import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
	state: () => ({
		current: "light"
	}),

	actions: {
		init() {
			if (typeof window === "undefined") return;
			this.current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		},
		toggleTheme() {
			const style = document.createElement("style");
			style.textContent = `
* {
  transition: color 0.2s linear, 
              background-color 0.2s linear, 
              border-color 0.2s linear,
              border 0.2s linear; /* 如需改变边框粗细/样式也加上 */
  backface-visibility: hidden;
  will-change: color, border-color;
}
`;
			document.head.appendChild(style);
			setTimeout(() => {
				style.remove();
			}, 800);
			this.current = this.current === "dark" ? "light" : "dark";
			document.documentElement.setAttribute("data-theme", this.current);
		},
		isDark() {
			if (this.current == "dark") {
				return true;
			}
			return false;
		}
	}
});
