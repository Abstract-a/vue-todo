<script setup>
import { ref } from 'vue';

let loading = ref(false);
let comment = ref('');
</script>
<template>
  <div className="flex w-full gap-4">
    <form className="flex w-full">
      <input
        type="text"
        placeholder="Write a comment"
        id="comment"
        v-model="comment"
        required
        className="m-3 w-[80%] rounded-md p-3"
      />
      <button
        type="submit"
        disabled="loading"
        className="m-3 cursor-pointer rounded-lg border-none bg-green-500 px-6 text-white transition-all duration-500 ease-in-out hover:bg-green-600 hover:opacity-90"
      >
        {{ loading ? 'Saving' : 'Save' }}
      </button>
    </form>
  </div>
</template>
