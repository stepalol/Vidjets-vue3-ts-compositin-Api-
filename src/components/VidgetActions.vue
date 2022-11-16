<template>
  <div class="vidget-action" >
    <div class="vidget-action__add" @click="showMenu" :class="{emty: !countVidgets}">
      <img src="@/assets/image/add.svg" alt="">
      <p>{{countVidgets}}/3</p>
    </div>
    <div class="vidget-action__tab" :class="{show: showTabs, close: closeTabs}">
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
      <div class="vidget-action__close" @click="closeMenu">
        +
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
const closeTabs = ref(false);

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

const showMenu = () => {
  showTabs.value = true;
  closeTabs.value = false;
};

const closeMenu = () => {
  showTabs.value = false;
  closeTabs.value = true;
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
    overflow: hidden;

    &.show {
      top: 0;
      .vidget-action__rate {
        left: 0;
      }
      .vidget-action__time {
        right: 0;
      }
      .vidget-action__weather {
        bottom: 0;
      }
      .vidget-action__close {
        right: 40px;
      }

    }
    &.close {
      transition-delay: 0.7s;
    }
  }
  &__rate {
    background-image: url('~@/assets/image/rate2.png');
    background-position: right;
    transition: transform  0.4s, left 0.7s, filter 0.4s;
    left: -100%;

  }
  &__weather {
    background-image: url('~@/assets/image/weather.png');
    transition: transform  0.4s, bottom 0.7s, filter 0.4s;
    bottom: -100%;
  }
  &__time {
    background-image: url('~@/assets/image/time.png');
    transition: transform  0.4s, right 0.7s, filter 0.4s;
    right: -100%;
  }
  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 33.3%;
    height: 100%;
    filter: brightness(0.5);
    // transition: filter 0.6s;
    img {
      border-radius: 10%;
      margin: 0 auto;
      width: 62%;
    }
    &:hover {
      filter: brightness(1);
      transform: scale(1.01);
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
    right: -100%;
    z-index: 2;
    font-size: 60px;
    font-weight: 700;
    width: 75px;
    height: 75px;
    border: 3px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transform: rotate(45deg);
    cursor: pointer;
    transition: background 0.3s,color 0.3s,border 0.3s, right 0.7s;
    &:hover {
      background: white;
      color: black;
      border: 3px solid black
    }
  }
  &__add {
    padding: 5px;
    border: 1px solid white;
    border-radius: 11px;
    display: flex;
    width: 60px;
    transition:  border-radius 0.5s;
    margin: 20px 0 0 20px;
    position: absolute;
    bottom: 70px;
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
      bottom: -47px;
      pointer-events: none;
      font-size: 32px;
      font-family: cursive;
    }
    &.emty {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      right: 0;
      margin: 0 auto;

      animation-duration: 2.0s;
      animation-iteration-count: infinite;
      &:before,&::after {
        position: absolute;
        top: -2px;
        left: -2px;
        right: 0;
        margin: 0 auto;
        content: '';
        display: block;
        width: 60px;
        border-radius: 11px;
        height: 60px;

        animation-iteration-count: infinite;
        border: 1px solid white;
      }
      &:before {
        animation-name: pulse_2;
        animation-duration: 2.0s;
      }

      &::after {
        animation-name: pulse_3;
        animation-duration: 2.5s;
      }
    }

  }
}

@keyframes pulse_2 {
  from {
    opacity: 1;
    transform: scale(1, 1);
  }

  to {
    opacity: 0;
    transform: scale(2.5, 2.5);
  }
}

@keyframes pulse_3 {
  from {
    opacity: 1;
    transform: scale(1, 1);
  }

  to {
    opacity: 0;
    transform: scale(3.85, 3.85);
  }
}
</style>
