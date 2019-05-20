import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.config.errorHandler = (err, vm, info) => {
  document.getElementById("result")!.textContent = err.message;
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
