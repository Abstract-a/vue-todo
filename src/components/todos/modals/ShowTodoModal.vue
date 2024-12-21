<script setup>
import CommentsPage from '@/components/comments/CommentsPage.vue';
import { Comment, ref } from 'vue';

let expanded = ref(false);
let initialTitle = ref('initialTitle');
let initialText = ref('initialText');
let completed = ref(true);
let createdAt = ref('jan-02-1999');
let updatedAt = ref('jan-02-1999');
let completedAt = ref('jan-02-1999');
</script>

<template>
  <div
    class="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center bg-gray-500 md:flex-row md:gap-4"
  >
    <div
      class="relative z-[1000] flex h-[60%] w-screen min-w-[384px] flex-col items-center justify-center gap-3 bg-gray-200 p-5 shadow-md md:h-[560px] md:w-[90%] md:max-w-[500px] md:rounded-lg"
    >
      <button
        class="absolute left-0 top-0 mr-3 cursor-pointer overflow-hidden rounded-lg border-none p-3 text-red-500 transition-all duration-500 ease-in-out hover:bg-gray-300 hover:text-red-700"
        n
      >
        ClearIcon
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
