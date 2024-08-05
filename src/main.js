import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@flaticon/flaticon-uicons/css/all/all.css"; // Import Uicons CSS globally


const app = createApp(App);
app.use(createPinia());
app.use(Toast);
app.use(router);

app.mount("#app");
