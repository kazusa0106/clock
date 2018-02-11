<template>
    <div>
        <!-- <img :src="imgPath" class="myBkg" /> -->
        <el-button>选择图片</el-button>
        <el-button>保存</el-button>
    </div>
</template>

<script>
import { remote } from "electron";
const dialog = remote.dialog;
const nativeImage = remote.nativeImage;
export default {
  data() {
    return {
      imgPath: ""
    };
  },
  mounted() {
    dialog.showOpenDialog(
      {
        title: "选择图片",
        filters: [
          { name: "Images", extensions: ["jpg", "png", "gif"] },
          { name: "All Files", extensions: ["*"] }
        ]
      },
      path => {
        if (path) {
          console.log(path[0]);
          this.imgPath = nativeImage.createFromPath(path[0]).toDataURL();
        }
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.myBkg {
  height: 200px;
  width: 200px;
}
</style>
