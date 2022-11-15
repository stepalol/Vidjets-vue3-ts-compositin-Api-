<template>
<div class="rate">
    <div class="rate__title">Курс</div>
    <div class="rate__delete"></div>
    <div class="rate__block" v-if="showRate?.CharCode">
        <div class="rate__current">
          <div>
            <p>{{showRate.CharCode}}</p>
            <p>( {{showRate.Name}} )</p>
          </div>
          <div>
            <p>{{showRate.Value.toFixed(2)}} RUB</p>
          </div>
        </div>
        <div class="rate__move">
          <img :src="graphic" alt="">
        </div>
    </div>
    <select-custom
      :placeholder="'Выберите валюту'"
      :filtered-list="filteredRate"
      @valueInput="valueInput"
      @select="selectRate"
    />
</div>
</template>

<script lang="ts" setup>
import SelectCustom from '@/components/SelectCustom.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { Course } from '@/interfaces/Irate';

const store = useStore();
store.dispatch('getRate');
const currentRate = computed <Course[]>(() => store.getters.CURRENT_RATE);
const search = ref('');

const valueInput = (e:string) => {
  search.value = e;
};
const defaultRate = ref<string | undefined>('USD');

const filteredRate = computed(() => {
  if (search.value === '') return [];
  const tempFilted:string[] = [];
  currentRate.value.forEach((item: Course) => {
    if (item.Name.slice(0, search.value.length).toLowerCase() === search.value.toLowerCase()
      || item.CharCode.slice(0, search.value.length).toLowerCase() === search.value.toLowerCase()) {
      tempFilted.push(item.CharCode);
    }
  });
  return tempFilted;
});

const showRate = computed(() => {
  const filtered = currentRate.value.filter((item:Course) => item.CharCode === defaultRate.value);
  return filtered[0];
});

const graphic = computed(() => {
  if (showRate.value.Value > showRate.value.Previous) {
    return require('@/assets/image/up.png');
  }
  console.log('showRate.value.Value', showRate.value.Value);
  console.log(' showRate.value.Previous', showRate.value.Previous);
  return require('@/assets/image/down.png');
});

const selectRate = (item: string) => {
  defaultRate.value = item;
};
</script>

<style lang="scss">
.rate{
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

    &__block {
      display: flex;
    }
    &__current {
      width: 65%;
      padding: 15px 0 0 23px;
      & div:nth-child(1) {
        p:nth-child(1) {
          font-size: 36px;
        }
        p:nth-child(2) {
          font-size: 20px;
        }
      }
      & div:nth-child(2) {
        font-size: 28px;
        margin: 25px 0 10px 0;
      }
    }

    &__move {
      width: 38%;
      img {
        width: 100%;
        padding: 0 22px 0 0;
      }
    }

}
</style>
