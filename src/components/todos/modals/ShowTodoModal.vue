<script setup>
import CommentsPage from '../../comments/CommentsPage.vue';
import { ref } from 'vue';

let expanded = ref(false);
let show = ref(false);
let initialTitle = ref('initialTitle');
let initialText = ref('initialText');
let completed = ref(true);
let createdAt = ref('jan-02-1999');
let updatedAt = ref('jan-02-1999');
let completedAt = ref('jan-02-1999');
</script>

<template>
  <div
    v-if="show"
    class="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center bg-gray-500 md:flex-row md:gap-4"
  >
    <div
      class="relative z-[1000] flex h-[60%] w-screen min-w-[384px] flex-col items-center justify-center gap-3 bg-gray-200 p-5 shadow-md md:h-[560px] md:w-[90%] md:max-w-[500px] md:rounded-lg"
    >
      <button
        class="absolute left-0 top-0 mr-3 cursor-pointer overflow-hidden rounded-lg border-none p-3 text-red-500 transition-all duration-500 ease-in-out hover:bg-gray-300 hover:text-red-700"
        n
      >
        <svg
          height="2rem"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
      <h3 class="mb-4 mt-8 text-xl font-bold">{{ initialTitle }}</h3>
      <div
        :class="[
          'mx-auto h-[400px] w-full overflow-y-hidden whitespace-normal break-words',
          expanded ? 'overflow-y-scroll' : '',
        ]"
      >
        <p
          :class="[
            'px-3 text-left text-gray-700',
            expanded ? '' : 'line-clamp-4',
          ]"
        >
          {{ initialText }}
        </p>
        <span
          :class="[
            'mt-2 inline-block cursor-pointer text-blue-500',
            initialText.length < 260 ? 'hidden' : '',
          ]"
        >
          {{ expanded ? 'Show less' : 'Show more' }}
        </span>
      </div>
      <div class="flex w-full justify-between gap-4">
        <div class="flex flex-col gap-1">
          <p class="text-xs text-gray-500">date of creation</p>
          <p class="text-xs text-gray-500">{{ createdAt }}</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-xs text-gray-500">latest update</p>
          <p class="text-xs text-gray-500">{{ updatedAt }}</p>
        </div>
        <div v-if="completed" class="flex flex-col gap-1">
          <p class="text-xs text-gray-500">complete at</p>
          <p class="text-xs text-gray-500">{{ completedAt }}</p>
        </div>
      </div>
    </div>
    <CommentsPage id="id" />
  </div>
</template>
