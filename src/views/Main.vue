<template>
  <div class="positions-vidget">
    <my-time />
    <my-weather />
  </div>
</template>

<script lang="ts" setup>
import MyTime from '@/components/time/Time.vue';
import MyWeather from '@/components/weather/Weather.vue';

</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: black;
  color: white;
  padding:  20px 0 0 0 ;
}
.positions-vidget {
  display: flex;
  flex-wrap: wrap;
  & div:nth-child(2n) {
    padding: 0 15px;
  }
}
</style>
