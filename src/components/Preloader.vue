<template>
    <div class="preloader" v-if="!error">
        <div class="preloader__text">Loading...</div>
        <div class="preloader__wrapper">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
            <span class="line line-4"></span>
            <span class="line line-5"></span>
            <span class="line line-6"></span>
            <span class="line line-7"></span>
            <span class="line line-8"></span>
            <span class="line line-9"></span>
            <span class="line line-10"></span>
            <span class="line line-11"></span>
            <span class="line line-12"></span>
            <span class="line line-13"></span>
            <span class="line line-14"></span>
            <span class="line line-15"></span>
            <span class="line line-16"></span>
            <span class="line line-17"></span>
            <span class="line line-18"></span>
        </div>
    </div>
    <div class="error" v-else>
      <p><span>ошибка</span> <br>сервер не отвечает попробуйте позже!</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from 'vue';

const error = ref(false);

const showErrror = () => {
  console.log('no eror');

  error.value = true;
};

const intervalError = setTimeout(showErrror, 50000);

onBeforeUnmount(() => {
  clearTimeout(intervalError);
});
</script>

<style lang="scss">
.preloader {
  width: 200px;
  height: 70px;
  &__text {
    color: #fff;
    margin: 5px 0;
    text-transform: uppercase;
    text-align: center;
    font-family: 'Arial', sans-serif;
    font-size: 22px;
    letter-spacing: 2px;
  }
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.755);
    margin: 0 -4px;
    border-radius: 20px;
    overflow: hidden;
    padding: 3px 0;
  }
  & .line {
    width: 7px;
    height: 21px;
    background: #fff;
    margin: 0 1px;
    display: inline-block;
    animation: fade-in 6000ms infinite ease-in-out;
    opacity: 0;
    margin: 0 5px 0 0;
    border-radius: 3px;
    &:first-child {
    }
    &:last-child {
      margin: 0;
    }
  }
}
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    font-size: 18px;
  }
  span {
    font-size: 27px;
  }
}
@for $i from 1 through 18 {
  .preloader .line-#{$i} {
    animation-delay: ($i * 100ms);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  9% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity:0
  }
  100% {
    opacity: 0;
  }
}
</style>
