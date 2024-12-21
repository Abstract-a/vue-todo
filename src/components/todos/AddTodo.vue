<script setup>
import { ref } from 'vue';

let loading = ref(false);
let title = ref('todo title');
let text = ref('todo text');
</script>

<template>
  <div>
    <div
      class="confirm-popup fixed left-[50%] top-[50%] z-[1000] flex w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg bg-gray-200 p-5 shadow-md"
    >
      <form>
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
          class="mr-3 cursor-pointer rounded-lg border-none bg-red-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-red-600 hover:opacity-90"
        >
          Cancel
        </button>
        <button
          class="cursor-pointer rounded-lg border-none bg-green-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-green-600 hover:opacity-90"
          type="submit"
          disabled="loading"
        >
          {{ loading ? 'Submitting...' : 'Submit' }}
        </button>
      </form>
    </div>
  </div>
</template>
