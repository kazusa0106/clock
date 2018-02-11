<template>
    <div class="wrapper">
        <div class="closeBtn BtnArea" @click="close"></div>
        <div class="navigator">

        </div>
        <div>
            right
        </div>
    </div>
</template>

<script>
import { remote } from "electron";

export default {
  methods: {
    close() {
      remote.getCurrentWindow().close();
    }
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
    background-color: gray;
  }
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
