<script setup>
import { ref } from 'vue';
const emit = defineEmits(['search']);
let searchTerm = ref('');
function handleChange(e) {
  searchTerm.value = e.target.value;

  emit('search', searchTerm.value);
}
// function handleInputChange(e) {
// searchTerm.value = e.target.value
// }
</script>

<template>
  <div class="mr-4 w-[400px] md:mx-0">
    <input
      class="w-full rounded-md p-3"
      type="text"
      :value="searchTerm"
      @input="handleChange"
      placeholder="Search todos..."
    />
  </div>
</template>
