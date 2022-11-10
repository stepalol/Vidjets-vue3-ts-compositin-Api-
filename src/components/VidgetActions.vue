<template>
  <div class="vidget-action" >
    <div class="vidget-action__add" @click="showTabs = true">
      <img src="@/assets/image/add.svg" alt="">
      <p>{{countVidgets}}/3</p>
    </div>
    <div class="vidget-action__tab" :class="{show: showTabs}">
      <div class="vidget-action__rate vidget-action__item" @click="emitChange('vgRate')">
        <img src="@/assets/image/rate-vidget.png" alt="">
        <div class="vidget-action__btn" :class="{red: modelValue.vgRate}">{{ modelValue.vgRate?  'Удaлить':'Dобавить'}}</div>
      </div>
      <div class="vidget-action__weather vidget-action__item"  @click="emitChange('vgWeather')">
        <img src="@/assets/image/weather-vidget.png" alt="">
        <div class="vidget-action__btn" :class="{red: modelValue.vgWeather}">{{ modelValue.vgWeather?  'Удaлить':'Dобавить'}}</div>
      </div>
      <div class="vidget-action__time vidget-action__item" @click="emitChange('vgTime')">
        <img src="@/assets/image/time-vidget.png" alt="">
        <div class="vidget-action__btn" :class="{red: modelValue.vgTime}">{{ modelValue.vgTime?  'Удaлить':'Dобавить'}}</div>
      </div>
      <div class="vidget-action__close" @click="showTabs = false">
        закрыть
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps, withDefaults, defineEmits, ref, computed,
} from 'vue';

interface propsActions {
  modelValue: {
    vgTime: boolean,
    vgRate: boolean,
    vgWeather: boolean,
  }
}
const showTabs = ref(false);
const props = withDefaults(defineProps<propsActions>(), {
  modelValue: () => ({
    vgTime: false,
    vgRate: false,
    vgWeather: false,
  }
  ),
});

const emit = defineEmits<{(e: 'changeVidget', value:string): void}>();

const emitChange = (value:string) => {
  emit('changeVidget', value);
};

const countVidgets = computed(() => {
  let count = 0;
  Object.values(props.modelValue).forEach((item) => {
    if (item === true) {
      count += 1;
    }
  });
  return count;
});

</script>

<style lang="scss">
.vidget-action {
  &__tab {
    display: flex; // flex
    justify-content: space-between;
    position: absolute;
    top: -100%;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: black;
    // transition: top 2.5s;
    &.show {
      // display: flex;
      top: 0;
    }
  }
  &__rate {
    background-image: url('~@/assets/image/rate2.png');
    background-position: right;

  }
  &__weather {
    background-image: url('~@/assets/image/weather.png');
  }
  &__time {
    background-image: url('~@/assets/image/time.png');
  }
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    filter: blur(7px);
    width: 32%;
    height: 100%;
    transition: filter 0.6s;
    img {
      border-radius: 35px;
      margin: 0 auto;
    }
    &:hover {
      filter: blur(0);
      cursor: pointer;
    }
  }

  &__btn {
    width: 245px;
    /* height: 40px; */
    margin: 0 auto;
    text-align: center;
    padding: 15px 0;
    background: #33bb33;
    border-radius: 16px;
    font-size: 24px;
    font-family: monospace;
    &.red {
      background: red;
    }
  }
  &__close {
    position: absolute;
    top: 20px;
    right: 40px;
    z-index: 2;
  }
  &__add {
    position: relative;
    padding: 5px;
    width: 55px;
    border: 1px solid white;
    border-radius: 11px;
    display: flex;
    width: 60px;
    transition:  border-radius 0.5s;
    cursor: pointer;
    img {
      transition: transform 0.6s;
    }
    &:hover {
      border-radius: 22px;
      img {
        transform: rotate(145deg);
      }
    }
    p {
      position: absolute;
      bottom: -30px
    }

  }
}
</style>
