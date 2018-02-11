<template>
    <div class="wrapper">
        <div class="imgWrapper">
            <div class="myBkg BtnArea" @click="selectImg">
                <div class="tips BtnArea" @click="selectImg" v-if="imgPath===''">点击选择图片</div>
                <img :src="imgPath" />
            </div>
        </div>
        <div class="BtnArea buttons">
            <!-- <span class="btn" @click="selectImg">选择图片</span> -->
            <span class="btn">保存</span>
        </div>
    </div>
</template>

<script>
import { remote } from "electron";
const dialog = remote.dialog;
const nativeImage = remote.nativeImage;
export default {
  data() {
    return {
      imgPath: "",
      dialogOpenTag: false
    };
  },
  mounted() {},
  methods: {
    selectImg() {
      if (this.dialogOpenTag) {
        return;
      }
      this.dialogOpenTag = true;
      dialog.showOpenDialog(
        {
          title: "选择图片",
          filters: [
            { name: "Images", extensions: ["jpg", "png", "gif"] },
            { name: "All Files", extensions: ["*"] }
          ]
        },
        path => {
          this.dialogOpenTag = false;
          if (path) {
            console.log(path[0]);
            this.imgPath = nativeImage.createFromPath(path[0]).toDataURL();
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  flex-direction: column;
  .imgWrapper {
    overflow: hidden;
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    .tips {
      cursor: pointer;
      position: absolute;
    }
    .myBkg {
      border-radius: 200px;
      border: 1px #848181;
      border-style: dotted;
      overflow: hidden;
      height: 200px;
      width: 200px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      display: flex;
      background: transparent;
    }
  }
  .buttons {
    height: 30px;
  }
  .btn {
    cursor: pointer;
  }
}
</style>
