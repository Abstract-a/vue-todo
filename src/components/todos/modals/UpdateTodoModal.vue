<script setup>
import { ref } from 'vue';

let title = ref('title');
let text = ref('text');
let loading = ref(false);
let show = ref(false);
</script>

<template>
  <div v-if="show">
    <div
      class="fixed left-[50%] top-[50%] z-[1000] mt-12 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 bg-[#d6d6d6] p-5 shadow-md sm:h-auto sm:w-[90%] sm:max-w-[500px] sm:rounded-lg"
    >
      <form>
        <label class="text-[20px] font-bold tracking-wider" for="title"
          >Title</label
        >
        <input
          class="mb-3 w-full rounded-md border border-gray-100 p-3"
          type="text"
          id="title"
          v-model="title"
          required
        />
        <label class="text-[20px] font-bold tracking-wider" for="text"
          >Description</label
        >
        <textarea
          class="mb-3 min-h-80 w-full resize-none overflow-auto rounded-md border border-gray-100 p-3"
          id="text"
          v-model="text"
          required
        />
        <button
          class="mr-3 cursor-pointer rounded-lg border-none bg-red-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-red-600 hover:opacity-90"
          type="button"
        >
          cancel
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
