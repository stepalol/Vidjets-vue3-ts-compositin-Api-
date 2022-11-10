<template>
  <div class="positions-vidget" >
    <my-time v-if="widgetsShow.vgTime"/>
    <my-weather v-if="widgetsShow.vgWeather"/>
    <my-rate v-if="widgetsShow.vgRate"/>
  </div>
  <vidgets-action v-model="widgetsShow" @change-vidget="changeShowVidets" />
</template>

<script lang="ts" setup>
import MyTime from '@/components/time/Time.vue';
import MyWeather from '@/components/weather/Weather.vue';
import MyRate from '@/components/rate/Rate.vue';
import Sortable from 'sortablejs';
import { onMounted, reactive } from 'vue';
import VidgetsAction from '@/components/VidgetActions.vue';

interface propsActions {
    vgTime: boolean,
    vgRate: boolean,
    vgWeather: boolean,
}

const widgetsShow = reactive<propsActions>({
  vgTime: false,
  vgRate: false,
  vgWeather: false,
});
const changeShowVidets = (value: any) => {
  widgetsShow[value] = !widgetsShow[value];
};

onMounted(() => {
  Sortable.create(document.querySelector('.positions-vidget'), {
    ghostClass: 'sortable-ghost',
    dragClass: 'sortable-drag',
    forceFallback: false,
  });
});
</script>

<style lang="scss">

.sortable-drag {
  background-color: white;
  opacity: 0;
}

.sortable-ghost {
  opacity: 1;
  border: 4px solid rgb(233, 193, 35);
}
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
  &>div:nth-child(2n) {
    margin: 0 15px;
  }
}
</style>
