import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount("#app");
