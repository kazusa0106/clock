<template>
  <div class="wrapper">
    <div class="bkg" :style="style">
      <!-- <div class="clock"></div> -->
      <div class="modal">
        <Clock/>
      </div>
    </div>
  </div>
</template>

<script>
import Clock from "./clock";
const { remote } = require("electron");

const { Menu, MenuItem } = remote;
export default {
  components: {
    Clock
  },
  data() {
    return {
      bkgUrl: "001.png"
    };
  },
  computed: {
    style() {
      return {
        // backgroundImage: "url('img/001.png')"
      };
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  background-repeat: no-repeat;
  background-color: transparent;
  border-radius: 100px;
  background-image: url("../assets/img/001.png");
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
      background-color: rgba(255, 255, 255, 0.3);
    }
    height: 200px;
    width: 200px;
    background-repeat: no-repeat;
    background-image: url("../assets/img/Clocks@2x.png");
    background-position: 50% 50%;
    background-size: 200px 200px;
  }
}
</style>
