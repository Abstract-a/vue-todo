<script setup>
import { ref } from 'vue';

let title = ref('title');
let text = ref('text');
let loading = ref(false);
</script>

<template>
  <div>
    <div>
      <form>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" required />
        <label for="text">Description</label>
        <textarea id="text" v-model="text" required />
        <button type="button">cancel</button>
        <button type="submit">
          {{ loading ? 'Submitting...' : 'Submit' }}
        </button>
      </form>
    </div>
  </div>
</template>
