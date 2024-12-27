<script setup>
import SingleComment from './SingleComment.vue';
import AddComment from './AddComment.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';
import axios from 'axios';
import { ref, inject, onMounted, computed } from 'vue';

const props = defineProps({
  id: String,
});
const loading = ref(false);
const comments = ref([]);
const authToken = inject('authToken');

const sortedComments = computed(() => {
  return comments.value.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
});
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

function handleAddComment(newComment) {
  comments.value.push(newComment);
}

function handleUpdateComment(updatedComment) {
  comments.value.map((comment) =>
    comment._id === updatedComment._id ? updatedComment : comment
  );
}

function handleDeleteComment(id) {
  comments.value = comments.value.filter((comment) => comment._id !== id);
}
onMounted(() => getComments());
</script>

<template>
  <div
    class="z-[1000] h-[40%] w-screen bg-gray-200 md:h-[560px] md:min-w-[384px] md:max-w-[500px] md:rounded-md"
  >
    <BaseSpinner v-if="loading" />
    <div v-else class="flex h-full w-full flex-col items-start justify-center">
      <AddComment @add-comment="handleAddComment" :id="props.id" />
      <div
        class="mt-4 flex h-full w-full flex-col items-start justify-start overflow-auto overflow-x-hidden"
      >
        <SingleComment
          v-for="comment in sortedComments"
          :key="comment._id"
          :comment="comment"
          @delete-comment="handleDeleteComment"
          @update-comment="handleUpdateComment"
        />
      </div>
    </div>
  </div>
</template>
