<template>
  <div class="time">
    <div class="time__current">
      <!-- eslint-disable-next-line max-len-->
      <p>{{editHour}}<span :class="{'show': show}" >:</span>{{ editMinute}}<span :class="{'show': show}">:</span>{{editSecond}}</p>
    </div>
    <label for="search" class="time__search">
      <input type="text" id="search" autocomplete="off" placeholder="Введите странну">
      <div class="list">
        <div class="list-item"></div>
      </div>
    </label>
    <ul class="time-extra">
      <li>
        <div class="time-extra__time">1</div>
        <div class="time-extra__name">we</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {
  computed, onMounted, onUnmounted, reactive, ref, watch,
} from 'vue';
import moment from 'moment';
import { useStore } from 'vuex';

const store = useStore();
const allFilter = ref(null);
const show = ref(true);
const clock = reactive({
  second: 0,
  minute: 0,
  hour: 0,
});

const editTime = (time:any) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

const interval = setInterval(() => {
  clock.second += 1;
  if (clock.second >= 60) {
    clock.second = 0;
    clock.minute += 1;
  }
  if (clock.minute >= 60) {
    clock.minute = 0;
    clock.hour += 1;
  }
  if (clock.hour >= 24) {
    clock.hour = 0;
  }
  if (show.value) {
    show.value = false;
  } else {
    show.value = true;
  }
}, 1000);

const editSecond = computed(() => editTime(clock.second));
const editMinute = computed(() => editTime(clock.minute));
const editHour = computed(() => editTime(clock.hour));

onMounted(async () => {
  allFilter.value = await store.dispatch('getTimeZone');
  clock.second = +(moment().format(' ss '));
  clock.minute = +(moment().format(' mm '));
  clock.hour = +(moment().format(' HH '));
});

onUnmounted(() => { clearInterval(interval); console.log('destroy'); });

</script>

<style lang="scss" scoped>
.time {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__current {
    font-family: 'LED1';
    font-size: 64px;
    & span {
      padding: 0 4px;
    }
    & .show {
      opacity: 0;
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
    .list {
      position: absolute;
      width: 86%;
      margin: 0 7%;
      height: 230px;
      border: 1px solid white;
      border-top: none;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: auto;
    }
  }
}
</style>
