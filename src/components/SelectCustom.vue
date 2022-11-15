<template v-if="props.filteredList.lengt">
    <div class="select-custom">
      <label>
        <input
          type="text"
          autocomplete="off"
          :placeholder="placeholder"
          v-model="inputCity"
          @input="showDropdown = true, emitValueInput(inputCity)"
        />
    </label>
    <div class="dropdown" :class="{open}">
        <div  class="dropdown__item" v-for="item in props.filteredList" :id="item + Math.random()"
        :key="item + Math.random()" @click="emitGetTime(item)">
          <div class="dropdown__name" >{{item}}</div>
        </div>
        <div class="dropdown__item" v-if="!props.filteredList.length">
          <div class="dropdown__name" >Ничего не найдено!</div>
        </div>
      </div>
    </div>

  </template>

<script lang="ts" setup>
import {
  defineProps, withDefaults, defineEmits, computed, ref, watch,
} from 'vue';

interface Props {
  filteredList: string[],
  placeholder: string,
}

const emit = defineEmits<{(e: 'select', name: string): void,
  (e: 'valueInput', name: string): void,
}>();

const inputCity = ref('');
const showDropdown = ref(false);

const emitGetTime = (item: string) => {
  inputCity.value = '';
  showDropdown.value = false;
  emit('select', item);
};

const props = withDefaults(defineProps<Props>(), {
  filteredList: () => ([]),
});

const emitValueInput = (value:string) => {
  emit('valueInput', value);
};

const hide = () => {
  showDropdown.value = false;
};

const open = computed(() => {
  if (inputCity.value !== '' && showDropdown.value) {
    return true;
  }
  return false;
});
watch(showDropdown, () => {
  if (showDropdown.value) {
    document.addEventListener('click', hide);
  } else {
    document.removeEventListener('click', hide);
  }
});

</script>

<style lang="scss">
.select-custom {
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
    overflow: hidden;
    transition: max-height 0.1s;
    background: black;
    z-index: 3;

    &.open {
      max-height: 230px;
      border: 1px solid white;
      border-top: none;
      overflow: auto;
    }
    &__item {
      padding: 7px 15px;
      font-size: 600;
      cursor: pointer;
      &:hover {
        background: white;
        color: black;
      }
    }
    &::-webkit-scrollbar {
      background: transparent;
      width: 6px;
      margin: 0 2px 0 0;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: white;
      width: 4px;
      border-radius: 4px;
    }
  }

}
</style>
