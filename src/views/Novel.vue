<template>
  <div class="novel">
    <p id="book">
      <button @click="hoge">bbbbb</button>
    </p>
    <div id="result"></div>
  </div>
</template>

<style lang="stylus" scoped>
#result {
  font-family: 'Yu Mincho', YuMincho, 'Hiragino Mincho ProN', 'Hiragino Mincho Pro', 'HGP明朝B', serif;
  -webkit-font-feature-settings: 'pkna';
  font-feature-settings: 'pkna';
  font-size: 17px;
  line-height: 1.9;
  letter-spacing: 0.03em;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;

  p {
    text-indent: 1em;
    margin-left: 30px;
  }
  ruby {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Yu Gothic", YuGothic, Verdana, Meiryo, "M+ 1p", sans-serif;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import encoding from "encoding-japanese";
import device from "../device";
export default class Home extends Vue {

  hoge() {
    device.Fetch('https://www.aozora.gr.jp/cards/000148/files/773_14560.html')
//    device.Fetch('https://bin.chimata.org/keshipon.cgi')
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

  mounted() {
    window.onerror = (msg, file, line, column, err) => {
      document.getElementById("result")!.innerHTML = msg + (file||"") + ':' + line;
    };
  }
}
</script>
