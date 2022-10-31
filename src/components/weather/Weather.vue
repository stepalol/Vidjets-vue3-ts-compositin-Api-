<template>
  <div class="weather" v-if="currentWeather.weather">
    <div class="weather__title">Погода</div>
    <div class="weather__delete"></div>
    <div class="weather__location">Выбранный регион: <span > {{currentWeather.name}} </span></div>
    <div class="weather__block">
      <div class="weather__home">
        <span>{{currentWeather.main.temp}}</span><br>
        <span> Макс: {{currentWeather.main.temp_min}}</span>
        <span>Мин: {{currentWeather.main.temp_max}}</span>
      </div>
      <div class="weather__current">
        <img :src="`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`" alt="">
        <span>{{currentWeather.weather[0].description}}</span>

      </div>
    </div>
    <div class="weather__search">
      <label for="weather-search">
        <input type="text" id="weather-search">
      </label>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const currentWeather = computed <any>(() => store.getters.CURRENT_WEATHER);
store.dispatch('getForecastWeather');

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
    font-size: 18px;
    span {
      font-size: 20px;
    }
  }
  &__block {
    display: flex;
  }
  &__current {
    img {
      width: 150px;
    }
  }
}
</style>
