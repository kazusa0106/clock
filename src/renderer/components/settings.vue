<template>
  <div class="wrapper">
    <div class="closeBtn BtnArea" @click="close"></div>
    <div class="navigator">
      <ul class="BtnArea">
        <li v-for="(menu,index) in menuList" :key="index" @click="navigate(menu.path)">{{menu.name}}</li>
      </ul>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { remote } from "electron";

export default {
  data() {
    return {
      menuList: [
        {
          path: "/backGrounds",
          name: "设置背景图片"
        }
      ]
    };
  },
  methods: {
    navigate(path) {
      this.$router.push(path);
    },
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
    flex-shrink: 0;
    width: 150px;
    background-color: #373a5d;
    ul {
      li {
        color: white;
        text-align: center;
        height: 20px;
        line-height: 20px;
        padding: 10px;
        cursor: pointer;
        &:hover {
          background-color: #6d77b9;
        }
      }
    }
  }
  .view {
    flex: 1;
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
