<script setup>
import SingleComment from './SingleComment.vue';
import AddComment from './AddComment.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';
import { ref } from 'vue';

let loading = ref(true);
let comments = ref([]);
</script>

<template>
  <div>
    <BaseSpinner v-if="loading" />
    <div v-else>
      <AddComment />
      <div>
        <SingleComment v-for="comment in comments" :key="comment._id" comment />
      </div>
    </div>
  </div>
</template>
