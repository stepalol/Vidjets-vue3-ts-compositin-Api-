<template>
  <div class="time">
    <div class="time__title">Время</div>
    <div class="time__current">
      {{timeUtc(clock.gmt)}}
      <span :class="{'show': hidden}">:</span>
      {{ editMinute}}
      <span :class="{'show': hidden}">:</span>
      {{editSecond}}
    </div>
    <label for="search" class="time__search" @click.stop>
      <input
        type="text"
        id="search"
        autocomplete="off"
        placeholder="Выберите странну"
        v-model="inputCity"
        @click="showDropdown = true"
        @input="showDropdown = true"
        >
      <div class="dropdown" :class="{open}">
        <dropdouwn-list class="dropdown-item" :filtered-list="filteredCity" @close="closeDropdown"/>
      </div>
    </label>
    <div class="time-extra">
      <div class="time-extra__item" v-for="item in extraTime" :key="item.name">
        <div class="time-extra__name">{{item.name}}</div>
        <div class="time-extra__clock">
          {{timeUtc(item.gmt)}}
          <span :class="{'show': hidden}">:</span>
          {{editMinute}}
          <span :class="{'show': hidden}" >:</span>
          {{editSecond}}
        </div>
        <div class="time-extra__delete"></div>
      </div>
    </div>
    <div class="time__delete"></div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed, onMounted, onUnmounted, reactive, ref,
} from 'vue';
import moment from 'moment';
import { useStore } from 'vuex';
import DropdouwnList from './DropdouwnList.vue';

interface timeS {
  time:string,
  name:string,
  gmt:number,
}

const store = useStore();
const allFilter = ref([]);
const extraTime = ref([] as Array<timeS>);
const inputCity = ref('');
const hidden = ref(true);
const showDropdown = ref(false);
const clock = reactive({
  second: 0,
  minute: 0,
  hour: 0,
  gmt: 0,
  utc: 0,
});

const editTime = (time:number) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

const closeDropdown = async (name:string) => {
  inputCity.value = '';
  showDropdown.value = false;
  const newTime: timeS = await store.dispatch('getExtraTime', name);
  extraTime.value.push(newTime);
};

const timeUtc = (hourUtc:number) => {
  let hour = clock.utc + hourUtc;
  if (hour < 0) {
    hour = 24 - hour;
  }
  if (hour >= 24) {
    hour -= 24;
  }
  if (hour < 10) {
    return `0${hour}`;
  }
  return hour;
};

const interval = setInterval(() => {
  clock.second += 1;
  if (clock.second >= 60) {
    clock.second = 0;
    clock.minute += 1;
  }
  if (clock.minute >= 60) {
    clock.minute = 0;
    clock.utc += 1;
  }
  if (hidden.value) {
    hidden.value = false;
  } else {
    hidden.value = true;
  }
}, 1000);

const editSecond = computed(() => editTime(clock.second));
const editMinute = computed(() => editTime(clock.minute));
const open = computed(() => {
  if (inputCity.value !== '' && showDropdown.value) {
    return true;
  }
  return false;
});
const filteredCity = computed(() => {
  if (inputCity.value === '') return [];

  const temporaryArray:Array<{name: string, city:string}> = [];
  allFilter.value.forEach((item:string) => {
    const searchCity = item.split('/')[1];
    if (!searchCity) return;

    if (searchCity.slice(0, inputCity.value.length).toLocaleLowerCase() === inputCity.value.toLocaleLowerCase()) {
      const name = {
        name: item,
        city: item.split('/')[1],
      };
      temporaryArray.push(name);
    }
  });

  return temporaryArray;
});
const hide = () => {
  showDropdown.value = false;
};
onMounted(async () => {
  clock.second = +(moment().format(' ss '));
  clock.minute = +(moment().format(' mm '));
  // eslint-disable-next-line prefer-destructuring
  clock.gmt = +(moment().format('Z').split(':')[0]);
  clock.utc = +(moment().utc().format('HH'));
  allFilter.value = await store.dispatch('getTimeZone');
  document.addEventListener('click', hide);
});

onUnmounted(() => {
  clearInterval(interval);
  document.removeEventListener('click', hide);
});

</script>

<style lang="scss">
.time {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 20px 10px;
  border: 1px solid rgba(255, 255, 255, 0.54);
  border-radius: 35px;
  position: relative;
  max-height: 380px;
  width: 100%;
  &__title {
    align-self: flex-start;
    font-size: 40px;
    font-family: monospace;
    padding: 0 0 0 23px;
  }
  &__current {
    width: 175px;
    display: flex;
    font-family: 'LED1';
    font-size: 64px;
    & span {
      padding: 0 4px;
    }
    & .show {
      opacity: 0;
    }
  }
  &__delete {
    position: absolute;
    top: 15px;
    right: 15px;
    overflow: hidden;
    font-size: 20px;
    width: 25px;
    height: 20px;
    cursor: pointer;
    &::before,&::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        width: 20px;
        height: 5px;
        transition: background-color 0.3s;
        background-color: white;
        border-radius: 10px;
      }
      &::after {
        transform-origin: right;
        transform: rotate(-45deg);
        left: 0;

      }
      &::before {
        transform-origin: left;
        transform: rotate(45deg);
        right: 0;

      }
      &:hover {
        &::before,&::after {
          background-color: red;
        }
      }
  }
  &__search {
    width: 100%;
    position: relative;
    input {
      outline: none;
      background: transparent;
      border: 1px solid #959595;
      width: 90%;
      margin: 0 5%;
      border-radius: 10px;
      height: 38px;
      color: white;
      font-size: 17px;
      padding: 0 12px;
      &:focus, &:hover {
        border: 1px solid white;
      }
      &::placeholder {
        font-style: italic;
      }
    }
    .dropdown {
      position: absolute;
      width: 86%;
      margin: 0 7%;
      max-height: 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: auto;
      transition: max-height 0.3s;
      background: black;
      z-index: 3;

      &.open {
        max-height: 230px;
        border: 1px solid white;
        border-top: none;
      }
      &-item {
        padding: 7px 15px;
        font-size: 600;
        cursor: pointer;
        &:hover {
          background: white;
          color: black;
        }
      }
    }

  }
  .time-extra {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 25px;
    max-height: 178px;
    overflow: auto;
    &__item {
      width: 48%;
      margin: 1%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      border: 1px solid white;
      position: relative;

    }
    &__name {
      font-size: 16px;
      padding: 0 0 7px 0;
    }
    &__clock {
      display: flex;
      font-size: 31px;
      font-family: 'LED1';
      span {
        padding: 0 4px;
      }
      & .show {
        opacity: 0;
      }
    }
    &__delete {
      position: absolute;
      top: 5px;
      right: 5px;
      overflow: hidden;
      font-size: 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;

      &::before,&::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        width: 16px;
        height: 2px;
        transition: background-color 0.3s;
        background-color: white;
        border-radius: 10px;
      }
      &::after {
        transform-origin: right;
        transform: rotate(-45deg);
        left: 0;

      }
      &::before {
        transform-origin: left;
        transform: rotate(45deg);
        right: 0;

      }
      &:hover {
        &::before,&::after {
          background-color: red;
        }
      }
    }
    &::-webkit-scrollbar {
      width: 5px;
      cursor: pointer;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
      cursor: pointer;
    }
    &::-webkit-scrollbar-thumb {
      background-color: white;
      border-radius: 20px;
      cursor: pointer;
    }
  }
}
</style>
