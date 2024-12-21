<script setup>
import DeleteTodoModal from './modals/DeleteTodoModal.vue';
import UpdateTodoModal from './modals/UpdateTodoModal.vue';
import ShowTodoModal from './modals/ShowTodoModal.vue';

import { ref } from 'vue';

let isCompleted = ref(true);
let title = ref('title');
</script>

<template>
  <div class="m-auto">
    <li
      class="mb-3 flex cursor-pointer items-center justify-between rounded-md bg-slate-100 p-4 shadow-md"
    >
      <div class="flex gap-3">
        <button
          class="ml-3 cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-green-500"
        >
          {{ isCompleted }}
        </button>
        <div class="flex gap-3">
          <h3
            :class="[
              'cursor-pointer text-left text-[14px] font-bold md:text-lg',
              isCompleted
                ? 'italic text-gray-600 line-through opacity-70 transition-all duration-500 ease-in-out hover:text-gray-700 hover:opacity-100'
                : '',
            ]"
          >
            {{ title }}
          </h3>
        </div>
      </div>
      <div class="flex flex-row gap-1">
        <button
          class="ml-3 cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-green-500"
          disabled="isCompleted"
        >
          modeeditionicon
        </button>
        <button
          class="ml-3 cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-red-600"
        >
          delete
        </button>
      </div>
    </li>
    <DeleteTodoModal />
    <UpdateTodoModal />
    <ShowTodoModal />
  </div>
</template>
