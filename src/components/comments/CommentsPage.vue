<script setup>
import SingleComment from './SingleComment.vue';
import AddComment from './AddComment.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';
import { ref, inject } from 'vue';

const props = defineProps({
  id: String,
});
const loading = ref(false);
const comments = ref([]);
const authToken = inject('authToken');

async function getComments() {
  loading.value = true;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/comments/${props.id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken._value}`,
        },
      }
    );
    comments.value = response.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div
    class="z-[1000] h-[40%] w-screen bg-gray-200 md:h-[560px] md:min-w-[384px] md:max-w-[500px] md:rounded-md"
  >
    <BaseSpinner v-if="loading" />
    <div v-else class="flex h-full w-full flex-col items-start justify-center">
      <AddComment />
      <div
        class="mt-4 flex h-full w-full flex-col items-start justify-start overflow-auto overflow-x-hidden"
      >
        <SingleComment
          v-for="comment in comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
    </div>
  </div>
</template>
