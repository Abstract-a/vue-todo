<script setup>
import { ref, inject, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

const props = defineProps({
  todo: Object,
});

let loading = ref(false);
const authToken = inject('authToken');
const emit = defineEmits(['cancel', 'updateTodo']);

function handleKeyDown(e) {
  if (e.key === 'Escape') {
    emit('cancel');
  }
}
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

async function handleSubmit(e) {
  loading.value = true;
  try {
    const response = await axios.put(
      `http://localhost:5000/api/todos/${props.todo._id}`,
      {
        title: title.value,
        text: text.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken._value}`,
        },
      }
    );
    emit('updateTodo', response.data);
    emit('cancel');
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
    emit('cancel');
  }
}
</script>

<template>
  <div class="backdrop" @click.self="$emit('cancel')">
    <div
      class="fixed left-[50%] top-[50%] z-[1000] mt-12 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 bg-[#d6d6d6] p-5 shadow-md sm:h-auto sm:w-[90%] sm:max-w-[500px] sm:rounded-lg"
    >
      <form @submit.prevent="handleSubmit">
        <label
          class="text-[20px] w-full pb-2 block text-left font-bold tracking-wider"
          for="title"
          >Title</label
        >
        <input
          class="mb-3 w-full rounded-md border border-gray-100 p-3"
          type="text"
          id="title"
          v-model="props.todo.title"
          required
        />
        <label
          class="text-[20px] font-bold block pb-2 w-full text-left tracking-wider"
          for="text"
          >Description</label
        >
        <textarea
          class="mb-3 min-h-80 w-full resize-none overflow-auto rounded-md border border-gray-100 p-3"
          id="text"
          v-model="props.todo.text"
          required
        />
        <button
          class="mr-3 cursor-pointer rounded-lg border-none bg-red-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-red-600 hover:opacity-90"
          type="button"
          @click="$emit('cancel')"
        >
          cancel
        </button>
        <button
          class="cursor-pointer rounded-lg border-none bg-green-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-green-600 hover:opacity-90"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Submitting...' : 'Submit' }}
        </button>
      </form>
    </div>
  </div>
</template>
