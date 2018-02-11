<template>
  <div class="wrapper">
    <div class="closeBtn BtnArea" @click="close"></div>
    <div class="navigator BtnArea">
      <ul class="BtnArea">
        <li v-for="(menu,index) in menuList" :key="index" @click="navigate(menu.path)">{{menu.name}}</li>
      </ul>
    </div>
    <div>
      <SettingsPanel :path="path" />
    </div>
  </div>
</template>

<script>
import { remote } from "electron";
const dialog = remote.dialog;

import SettingsPanel from "./settings/SettingsPanel.vue";

export default {
  components: {
    SettingsPanel
  },
  data() {
    return {
      menuList: [
        {
          name: "设置背景图片",
          path: "setBackground"
        }
      ],
      path: ""
    };
  },
  methods: {
    close() {
      remote.getCurrentWindow().close();
    },
    methods: {
      navigate(path) {
        this.path = path;
      }
    }
    // openImageFile() {
    //   dialog.showOpenDialog(
    //     {
    //       title: "选择图片",
    //       filters: [
    //         { name: "Images", extensions: ["jpg", "png", "gif"] },
    //         { name: "All Files", extensions: ["*"] }
    //       ]
    //     },
    //     filePath => {
    //       // console.log(filePath);
    //       this.$;
    //     }
    //   );
    // }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  .navigator {
    width: 150px;
    color: white;
    background-color: #333152;
    overflow: hidden;
    ul {
      overflow: auto;
      li {
        &:hover {
          background-color: #46507b;
        }
        padding: 10px;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}

.navigator {
  text-align: center;
}

.closeBtn {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  margin: 5px;
  background-image: url("../assets/img/close.png");
  height: 16px;
  width: 16px;
  background-size: 16px 16px;
}
</style>
