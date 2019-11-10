import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import device from "./device";
import encoding from "encoding-japanese";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.config.errorHandler = (err, vm, info) => {
  document.getElementById("result")!.textContent = err.message;
};

window.ShowNovel = (url: string) => {
  device.Fetch(url)
    .then(response => {
      try {
        const contentBase64 = JSON.parse(response).content;
        const contentBinary = encoding.base64Decode(contentBase64);
        const contentSJIS = encoding.convert(contentBinary, { from: "BINARY", to: "SJIS" }) as number[];
        const contentUnicode = encoding.convert(contentSJIS, { from: "SJIS", to: "UNICODE" }) as number[];
        const content = encoding.codeToString(contentUnicode);
        document.getElementById("result")!.innerHTML = content;
        // let elem = new DOMParser().parseFromString(content, "text/html").querySelector(".main_text");
        // if (elem != null) {
        //   document.getElementById("result")!.innerHTML = elem.outerHTML || "";
        // }
      } catch (error) {
          document.getElementById("result")!.textContent = error;
      }
    });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
