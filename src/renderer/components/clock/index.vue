<template>
    <div class="clock">
        <!-- <div class="tag quarter" v-for="(q,index) in 4" :key="`${index}quarter`" :style="getRotate1(index)">

        </div>
        <div class="tag hour" v-for="(q,index) in 12" :key="`${index}hour`" v-if="index%3!==0" :style="getRotate2(index)">

        </div>
        <div class="tag min" v-for="(q,index) in 60" :key="`${index}min`" v-if="index%5!==0" :style="getRotate3(index)">

        </div> -->
        <Pointers/>
    </div>
</template>

<script>
import Pointers from "./Pointers";
export default {
  components: {
    Pointers
  },
  data() {
    return {};
  },
  methods: {
    getRotate1(index) {
      const obj = {
        transform: `rotate(${index * 90}deg)`
      };
      return obj;
    },
    getRotate2(index) {
      const obj = {
        transform: `rotate(${index * 30}deg)`
      };
      return obj;
    },
    getRotate3(index) {
      const obj = {
        transform: `rotate(${index * 6}deg)`
      };
      return obj;
    }
  }
};
</script>

<style lang="scss" scoped>
.clock {
  background: url("../../assets/img/scale@2x.png");
  background-size: 160px 160px;
  height: 160px;
  width: 160px;
  position: relative;
  // background-color: rgba(255, 255, 255, 0.2);
  .tag {
    &.quarter {
      width: 10px;
      height: 10px;
      transform-origin: 5px 90px;
      position: absolute;
      left: 0px;
      left: 85px;
    }
    &.hour {
      width: 5px;
      height: 5px;
      transform-origin: 2.5px 90px;
      position: absolute;
      left: 87.5px;
    }
    &.min {
      width: 2px;
      height: 2px;
      transform-origin: 1px 90px;
      position: absolute;
      left: 89px;
    }
    border-radius: 500px;
    background-color: black;
    // transform: rotate(0deg);
  }
}
</style>