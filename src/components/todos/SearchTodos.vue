<script setup>
import { ref } from 'vue';

let searchTerm = ref('');
// function handleInputChange(e) {
// searchTerm.value = e.target.value
// }
</script>

<template>
  <div class="mr-4 w-[400px] md:mx-0">
    <input
      class="w-full rounded-md p-3"
      type="text"
      v-model="searchTerm"
      placeholder="Search todos..."
    />
  </div>
</template>
