<template>
  <div class="weather" >
    <Preloader v-if="!currentWeather.weather" />
    <template v-else>
      <div class="weather__title">Погода</div>
      <div class="weather__delete handle"></div>
      <div class="weather__location">Выбранный регион:<br /> <span @click="focus" > {{currentWeather.name}} </span></div>
      <div class="weather__block">
        <div class="weather__home">
          <span>{{Math.round(currentWeather.main.temp)}}</span><br>
          <div class="weather__forecast">
            <span> Макс: {{Math.round(currentWeather.main.temp_max)}}</span>
            <span>Мин: {{Math.floor(currentWeather.main.temp_min)}}</span>
          </div>
        </div>
        <div class="weather__current">
          <img :src="`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`" alt="">
          <span>{{currentWeather.weather[0].description}}</span>

        </div>
      </div>
      <select-custom
        class="test"
        :placeholder="'Выберите город'"
        @valueInput="valueInput"
        :filtered-list="filteredCity"
        @select="selectCity"
      />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import SelectCustom from '@/components/SelectCustom.vue';
import Preloader from '@/components/Preloader.vue';
import cities from '@/assets/json/cities.json';
import { WeatherData, Сity } from '@/interfaces/Iweather';

const store = useStore();
const currentWeather = computed <WeatherData>(() => store.getters.CURRENT_WEATHER);
let coords:{lat: string, lon: string} = { lat: '55.75583', lon: '37.61778' };

const inputCity = ref('');
store.dispatch('getForecastWeather', coords);

const getForecastWeather = () => {
  store.dispatch('getForecastWeather', coords);
};

function focus() {
  const test: HTMLElement | null = document.querySelector('.test input');
  if (test) {
    test.focus();
  }
}

const valueInput = (e:string) => {
  inputCity.value = e;
};

const filteredCity = computed(() => {
  if (inputCity.value === '') return [];
  const search:string = inputCity.value.slice(0, 1).toLocaleUpperCase();

  const test: {[key: string]:Сity[]} = cities;
  const tempFilter: string[] = [];
  if (!test[search]) return tempFilter;

  test[search].forEach((item: Сity) => {
    if (item.name.slice(0, inputCity.value.length).toLowerCase() === inputCity.value.toLowerCase()) {
      tempFilter.push(item.name);
    }
  });
  return tempFilter;
});

const selectCity = (e: string) => {
  const search = e.slice(0, 1).toLocaleUpperCase();
  const test: {[key: string]:Сity[]} = cities;
  test[search].forEach((item: Сity) => {
    if (item.name.toLowerCase() === e.toLowerCase()) {
      coords = item.coords;
      store.dispatch('getForecastWeather', item.coords);
    }
  });
};

const updateForecastWeather = setInterval(getForecastWeather, 180000);

onBeforeUnmount(() => {
  clearInterval(updateForecastWeather);
});
</script>
<style lang="scss">
  .weather{
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px 20px 10px;
    border: 1px solid rgba(255, 255, 255, 0.54);
    border-radius: 35px;
    position: relative;
    max-height: 380px;
    font-family: sans-serif;
    align-self: flex-start;
    min-height: 201px;
    justify-content: center;
    &__title {
      align-self: flex-start;
      font-size: 40px;
      font-family: monospace;
      padding: 0 0 0 23px;
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
  &__location {
    align-self: start;
    padding: 0 0 0 23px;
    font-size: 22px;
    span {
      font-size: 26px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  &__block {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }
  &__current {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 150px;
      margin-top: -35px;
    }
    span {
      text-align: center;
      width: 100%;
      display: block;
      margin: -30px 0 20px 0;
      font-size: 18px;
    }
  }
  &__home {
    width: 50%;
    & > span:nth-child(1) {
      font-size: 58px;
      margin: 10px 0;
      display: flex;
      justify-content: center;
    }
  }
  &__forecast {
    font-size: 19px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
