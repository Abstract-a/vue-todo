<script setup>
import { ref, onMounted, onBeforeUnmount, inject } from 'vue';
import axios from 'axios';

const props = defineProps({
  onShow: Boolean,
});

const loading = ref(false);
const title = ref('');
const text = ref('');

const authToken = inject('authToken');
const emit = defineEmits(['addTodo', 'cancel']);

async function handleSubmit() {
  loading.value = true;
  try {
    const response = await axios.post(
      `http://localhost:5000/api/todos`,
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
    emit('addTodo', response.data);
    title.value = '';
    text.value = '';
    emit('cancel');
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

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
</script>

<template>
  <div v-if="onShow" @click.self="$emit('cancel')" class="backdrop">
    <div
      class="confirm-popup fixed left-[50%] top-[50%] z-[1000] flex w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg bg-gray-200 p-5 shadow-md"
    >
      <form @submit.prevent="handleSubmit()">
        <input
          type="text"
          v-model="title"
          id="title"
          required
          placeholder="title"
          class="mb-3 w-full rounded-md border border-gray-100 p-3"
        />
        <textarea
          id="text"
          v-model="text"
          required
          placeholder="text"
          class="mb-3 min-h-80 w-full resize-none overflow-auto rounded-md border border-gray-100 p-3"
        />
        <button
          @click="$emit('cancel')"
          type="button"
          class="mr-3 cursor-pointer rounded-lg border-none bg-red-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-red-600 hover:opacity-90"
        >
          Cancel
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
