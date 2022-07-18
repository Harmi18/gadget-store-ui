import { createApp } from "vue";
import App from "./App.vue";
import router from "../src/router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "../src/plugins/font-awsome";
import { store } from "./store/store";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { Vuex } from "vuex";
// import "@/assets/main.css";
// import VueLocalStorage from "vue-localstorage";

const app = createApp(App);
app.use(store);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
