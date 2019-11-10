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
    window.ShowNovel('https://www.aozora.gr.jp/cards/000148/files/773_14560.html');
  }

  mounted() {
    window.onerror = (msg, file, line, column, err) => {
      document.getElementById("result")!.innerHTML = msg + (file||"") + ':' + line;
    };
  }
}
</script>
