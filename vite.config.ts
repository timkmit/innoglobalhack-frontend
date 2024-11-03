import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],
	define: {
		__IS_DEV__: JSON.stringify(true),
		__API__: JSON.stringify("https://api.pepper-coding.ru"),
	},
	resolve: {
		alias: [{ find: "@", replacement: "/src" }],
	},
});
