<template>
<div class="rate">
    <div class="rate__title">Курс</div>
    <div class="rate__delete"></div>
    <select-custom :placeholder="'Выберите валюту'"/>
</div>
</template>

<script lang="ts" setup>
import SelectCustom from '@/components/SelectCustom.vue';
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

}
</style>
