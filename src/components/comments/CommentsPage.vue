<script setup>
import SingleComment from './SingleComment.vue';
import AddComment from './AddComment.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';
import { ref } from 'vue';

let loading = ref(true);
let comments = ref([]);
</script>

<template>
  <div
    className="z-[1000] h-[40%] w-screen bg-gray-200 md:h-[560px] md:min-w-[384px] md:max-w-[500px] md:rounded-md"
  >
    <BaseSpinner v-if="loading" />
    <div
      v-else
      className="flex h-full w-full flex-col items-start justify-center"
    >
      <AddComment />
      <div
        className="mt-4 flex h-full w-full flex-col items-start justify-start overflow-auto overflow-x-hidden"
      >
        <SingleComment v-for="comment in comments" :key="comment._id" comment />
      </div>
    </div>
  </div>
</template>
