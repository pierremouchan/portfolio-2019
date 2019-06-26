<template>
  <div class="cursor"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.cursor {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: $red;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: $foreground;
}
</style>
