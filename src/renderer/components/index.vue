<template>
  <div class="wrapper">
    <div class="bkg">
      <div class="modal">
        <Clock/>
      </div>
      <img class="customImage" :src="bkgUrl" />
    </div>
  </div>
</template>

<script>
import Clock from "./clock";
const { remote, ipcRenderer } = require("electron");
import fs from "fs";
import defaultImg from "../assets/img/001.png";

const { Menu, MenuItem, nativeImage } = remote;
const ipc = ipcRenderer;
export default {
  components: {
    Clock
  },
  data() {
    return {
      bkgUrl: "001.png"
    };
  },
  mounted() {
    ipc.on("bkgChange", () => {
      this.reloadBkg();
    });
    this.reloadBkg();
    // Notification.requestPermission().then(function(permission) {
    //   if (permission === "granted") {
    //     console.log("用户允许通知");
    //     const notification = new Notification("abc", { body: 12321 });
    //   } else if (permission === "denied") {
    //     console.log("用户拒绝通知");
    //   }
    // });
  },
  methods: {
    reloadBkg() {
      const path = `${remote.app.getPath("userData")}/clockBkg/bkg.png`;
      if (!fs.existsSync(path)) {
        // this.bkgUrl = nativeImage.createFromBuffer(defaultImg).toDataURL();
        this.bkgUrl = defaultImg;
      } else {
        this.bkgUrl = nativeImage.createFromPath(path).toDataURL();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  background-repeat: no-repeat;
  background-color: transparent;
  border-radius: 100px;
  // background-image: url("../assets/img/001.png");
  background-size: 200px 200px;
  overflow: hidden;
  .bkg {
    .modal {
      height: 100%;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }
    .customImage {
      position: absolute;
      left: 0px;
      top: 0px;
      opacity: 0.5;
      border-radius: 100px;
      max-width: 100%;
    }
    height: 200px;
    width: 200px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-image: url("../assets/img/Clocks@2x.png");
    background-position: 50% 50%;
    background-size: 200px 200px;
  }
}
</style>
