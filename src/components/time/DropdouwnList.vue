<template v-if="props.filteredList.lengt">
  <div :class="attr.class" v-for="item in props.filteredList" :key="item.city">
    <div class="time-extra__time" @mousedown.stop.prevent="emitGetTime(item.name)">{{item.city }}</div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps, withDefaults, useAttrs, defineEmits,
} from 'vue';

interface Props {
  filteredList: Array<{city: string, name: string}>
}
const emit = defineEmits<{(e: 'close', name:string): void}>();

const emitGetTime = (name:string) => {
  emit('close', name);
};
const attr = useAttrs();
const props = withDefaults(defineProps<Props>(), {
  filteredList: () => ([]),
});

</script>
