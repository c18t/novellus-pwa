<template>
  <div class="home">
    <p id="load">Firebase SDK Loading&hellip;</p>
    <p id="book"></p>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
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
  mounted() {
    fetch("book.html")
      .then(response => {
        return response.text();
      })
      .then(responseText => {
        document.getElementById("book")!.innerHTML = responseText;
      });

    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyC2eTEc31KWhEutmuSgT2VSwoB6Z5ENBfE",
      authDomain: "org-chimata-novellus.firebaseapp.com",
      databaseURL: "https://org-chimata-novellus.firebaseio.com",
      projectId: "org-chimata-novellus",
      storageBucket: "org-chimata-novellus.appspot.com",
      messagingSenderId: "435739869162"
    };
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    function isProperty(value: string): value is keyof firebase.app.App {
      return value === "auth" || value === "database" || value === "messaging" || value === "storage";
    }
    try {
      let app = firebase.initializeApp(config);
      let features = ["auth", "database", "messaging", "storage"].filter(
        feature => isProperty(feature) && typeof app[feature] === "function"
      );
      document.getElementById("load")!.innerHTML = `Firebase SDK loaded with ${features.join(", ")}`;
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
      document.getElementById("load")!.innerHTML = "Error loading the Firebase SDK, check the console.";
    }
  }
}
</script>
