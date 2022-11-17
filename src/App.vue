<template>
  <Main />
</template>

<script lang="ts" setup>
import Main from './views/Main.vue';

</script>

<style lang="scss">
body, p {
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: black;
  color: white;
}
* {
  box-sizing: border-box;

  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

</style>
