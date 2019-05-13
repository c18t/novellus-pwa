<template>
  <div class="home">
    <p id="load">Firebase SDK Loading&hellip;</p>
    <p id="book">
      <button @click="hoge">bbbbb</button>
    </p>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import * as firebase from "firebase/app";
import uuidv4 from "uuid/v4";

const _ReceiveDeviceResult : any[string] = [];
window.ReceiveDeviceResult = (uuid: string): string | null => {
  let data: string | undefined = _ReceiveDeviceResult[uuid];
  delete _ReceiveDeviceResult[uuid];
  return data == undefined ? null : data;
};

window.SetDeviceResult = (uuid: string, data: string) => {
  _ReceiveDeviceResult[uuid] = data;
}

var device: Device = {
  Alert: (message: string): void => {
    let uuid = uuidv4();
    window.Device_Alert(JSON.stringify({ UUID: uuid, message: message }));
    let data: string | null = null;
    let id: NodeJS.Timer | null = null;
    let count: number = 1000;
    id = setInterval(() => {
      if ((data = window.ReceiveDeviceResult(uuid)) != null) {
        clearInterval(id!);
      }
      else if (--count <= 0) {
        clearInterval(id!);
      }
    }, 10);
  },
  Time: (): Promise<string> => {
    let uuid = uuidv4();
    window.Device_Time(JSON.stringify({ UUID: uuid }));
    return new Promise<string>((resolve: (data: string) => void, reject: (reason?: any) => void) => {
      let data: string | null = null;
      let id: NodeJS.Timer | null = null;
      let count: number = 1000;
      id = setInterval(() => {
        if ((data = window.ReceiveDeviceResult(uuid)) != null) {
          clearInterval(id!);
          resolve(data);
        }
        else if (--count <= 0) {
          clearInterval(id!);
          reject();
        }
      }, 10);
    })
  }
}

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {

  hoge() {
    if (typeof window.Device_Time != "function") {
      window.Device_Time = (json: string) => {
        let req = JSON.parse(json);
        window.SetDeviceResult(req["UUID"], JSON.stringify({ time: "hogefuga" }));
      }
    }
    if (typeof window.Device_Alert != "function") {
      window.Device_Alert = (json: string) => {
        let req = JSON.parse(json);
        window.SetDeviceResult(req["UUID"], JSON.stringify({}));
        alert(req.message);
      }
    }

    device.Alert('Hello! ガワネイティブ');
    device.Time()
      .then(json => document.getElementById("book")!.innerHTML = json)
  }

  mounted() {
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
