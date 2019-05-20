<template>
  <div class="home">
    <p id="book">
      <button @click="hoge">bbbbb</button>
    </p>
    <div id="result"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import * as firebase from "firebase/app";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {

  hoge() {
  }

  mounted() {
    window.onerror = (msg, file, line, column, err) => {
      document.getElementById("result")!.innerHTML = msg + (file||"") + ':' + line;
    };
  }
}
</script>
