<script setup>
import { ref, inject } from 'vue';
import axios from 'axios';

const props = defineProps({
  id: String,
});

let loading = ref(false);
let comment = ref('');
const authToken = inject('authToken');

async function handleSumit() {
  loading.value = true;
  try {
    const response = await axios.post(
      `http://localhost:5000/api/comments`,
      {
        todo: props.id,
        comment: comment.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken._value}`,
        },
      }
    );
    comment.value = '';
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <div class="flex w-full gap-4">
    <form @submit.prevent="handleSubmit" class="flex w-full">
      <input
        type="text"
        placeholder="Write a comment"
        id="comment"
        v-model="comment"
        required
        class="m-3 w-[80%] rounded-md p-3"
      />
      <button
        type="submit"
        :disabled="loading"
        class="m-3 cursor-pointer rounded-lg border-none bg-green-500 px-6 text-white transition-all duration-500 ease-in-out hover:bg-green-600 hover:opacity-90"
      >
        {{ loading ? 'Saving' : 'Save' }}
      </button>
    </form>
  </div>
</template>
