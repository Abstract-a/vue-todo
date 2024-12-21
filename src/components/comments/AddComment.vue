<script setup>
import { ref } from 'vue';

let loading = ref(false);
let comment = ref('');
</script>
<template>
  <div>
    <form>
      <input
        type="text"
        placeholder="Write a comment"
        id="comment"
        v-model="comment"
        required
      />
      <button type="submit" disabled="loading">
        {{ loading ? 'Saving' : 'Save' }}
      </button>
    </form>
  </div>
</template>
