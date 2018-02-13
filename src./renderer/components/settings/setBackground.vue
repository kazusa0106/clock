<template>
  <div class="wrapper">
    <div class="imgWrapper">
      <div class="myBkg BtnArea" @dblclick="selectImg" title="双击选择图片">
        <div class="tips BtnArea" v-if="imgPath===''">双击选择图片</div>
        <img id="img" class="bkgImg" :src="imgPath" v-if="imgPath!==''" />
      </div>
    </div>
    <div class="buttons BtnArea">
      <div class="btn BtnArea" @click="save" v-if="imgPath!==''">保存</div>
    </div>
  </div>
  </div>
</template>

<script>
// require("expose-loader?$!jquery");
import { remote, ipcRenderer } from "electron";
import Cropper from "Cropperjs";
import "../../libs/crop/cropper.css";
import fs from "fs";
import fse from "fs-extra-p";
const ipc = ipcRenderer;
// import $ from "jQuery";

const dialog = remote.dialog;
const nativeImage = remote.nativeImage;
export default {
  data() {
    return {
      imgPath: "",
      dialogOpenTag: false,
      mycropper: null
    };
  },
  mounted() {},
  methods: {
    selectImg(e) {
      if (this.moveTag) {
        return;
      }
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
            this.imgPath = nativeImage.createFromPath(path[0]).toDataURL();
            this.$nextTick(() => {
              if (!this.mycropper) {
                var image = document.getElementById("img");
                this.mycropper = new Cropper(image, {
                  viewMode: 1,
                  dragMode: "move",
                  aspectRatio: 1 / 1,
                  cropBoxMovable: false,
                  cropBoxResizable: false,
                  toggleDragModeOnDblclick: false
                });
              } else {
                this.mycropper.replace(this.imgPath, false);
              }
            });
          }
        }
      );
    },
    save() {
      this.res = this.mycropper
        .getCroppedCanvas({
          width: 200,
          height: 200
        })
        .toDataURL();

      const path = remote.app.getPath("userData") + "/clockBkg/";
      if (fs.existsSync(path)) {
        fs.writeFileSync(
          `${path}/bkg.png`,
          nativeImage.createFromDataURL(this.res).toPNG()
        );
      } else {
        fs.mkdirSync(path);
        const file = fse.createWriteStream(`${path}/bkg.png`);
        file.write(nativeImage.createFromDataURL(this.res).toPNG());
        file.end();
      }
      remote.app.getFileIcon(
        remote.app.getPath("exe"),
        { size: "small" },
        (error, icon) => {
          if (!error) {
            dialog.showMessageBox({
              type: "none",
              message: "保存成功",
              icon
            });
          }
        }
      );

      ipc.send("bus", "mainWindow", "bkgChange");
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
      color: #b3b3b3;
    }
    .myBkg {
      border: 1px #848181;
      border-style: dotted;
      overflow: hidden;
      height: 300px;
      width: 400px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      display: flex;
      background: transparent;
      .bkgImg {
        max-width: 100%;
      }
    }
  }
  .buttons {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    cursor: pointer;
    width: 100px;
    text-align: center;
    line-height: 30px;
    color: #b3b3b3;
    &:hover {
      color: #373a5d;
    }
  }
}
</style>
