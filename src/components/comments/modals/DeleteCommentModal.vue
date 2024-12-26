<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: String,
  onShow: Boolean,
});

let show = ref(false);
</script>

<template>
  <div v-if="onShow" class="z-[1000] backdrop" @click.self="$emit('cancel')">
    <div
      class="fixed left-[50%] top-[50%] z-[1000] flex w-[90%] max-w-96 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg bg-gray-200 p-5 shadow-md"
    >
      <p class="py-2">Are you sure you want to delete this comment?</p>
      <div class="flex items-center justify-center gap-4">
        <button
          @click="$emit('confirm')"
          class="cursor-pointer rounded-lg border-none bg-red-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-red-600 hover:opacity-90"
        >
          yes
        </button>
        <button
          @click="$emit('cancel')"
          class="cursor-pointer rounded-lg border-none bg-green-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-green-600 hover:opacity-90"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>
