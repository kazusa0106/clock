<template>
    <div class="pointer" :style="pointerStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: ["pointerStyle"]
  //   computed: {
  //     originStyle() {
  //       if (this.origin) {
  //         return {
  //           transformOrigin: this.origin
  //         };
  //       }
  //       return {};
  //     }
  //   }
};
</script>

<style lang="scss" scoped>
.pointer {
  width: 10px;
  height: 90px;
  // background: white;
  position: absolute;
  display: flex;
  justify-content: center;
  // align-items: center;
  z-index: 0;
  top: 0px;
  // box-shadow: 3px 3px 1.5px 1.5px #1d1b1b;
  transform-origin: 5px 80px;
}
</style>

