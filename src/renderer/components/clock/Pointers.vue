<template>
  <div class="wrapper">
    <div class="center">

    </div>
    <pointer :pointerStyle="pointerStyleHour">
      <div class="hour"></div>
    </pointer>
    <pointer :pointerStyle="pointerStyleMin">
      <div class="min"></div>
    </pointer>
    <pointer :pointerStyle="pointerStyleSecond">
      <div class="second"></div>
    </pointer>
  </div>
</template>

<script>
import pointer from "./abstractPointer";

export default {
  components: {
    pointer
  },
  data() {
    const date = new Date();
    return {
      hour: 0,
      min: 0,
      second: 0
    };
  },
  mounted() {
    setInterval(() => {
      // this.hour = (this.hour + 1) % 60;
      const ms = new Date().getTime() % (24 * 60 * 60 * 1000);
      this.hour = (ms / (60 * 60 * 1000) + 8) % 24;
      this.min = ms / (60 * 1000);
      this.second = ms / 1000;
    }, 10);
  },
  computed: {
    pointerStyleHour() {
      return {
        transform: `rotate(${(this.hour * 30) % 360}deg)`
      };
    },
    pointerStyleMin() {
      return {
        transform: `rotate(${(this.min * 6) % 360}deg)`
      };
    },
    pointerStyleSecond() {
      return {
        transform: `rotate(${(this.second * 6) % 360}deg)`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .center {
    width: 7px;
    height: 7px;
    background-position: 50% 50%;
    background-size: 7px 7px;
    background: url("../../assets/img/yuan1.png");
    z-index: 1;
  }
  .hour {
    width: 100%;
    height: 60%;
    position: relative;
    top: 40%;
    border-radius: 100px;
    background: url("../../assets/img/Minutehand@2x.png");
  }
  .min {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0px;
    border-radius: 100px;
    background: url("../../assets/img/Minutehand@2x.png");
  }
  .second {
    width: 1px;
    height: 100%;
    position: relative;
    top: 0%;
    border-radius: 100px;
    background: #6b2626;
  }
}
</style>

