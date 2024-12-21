<script setup>
import { ref } from 'vue';

let loading = ref(false);
let title = ref('todo title');
let text = ref('todo text');
</script>

<template>
  <div>
    <div>
      <form>
        <input
          type="text"
          v-model="title"
          id="title"
          required
          placeholder="title"
        />
        <textarea id="text" v-model="text" required placeholder="text" />
        <button>Cancel</button>
        <button type="submit" disabled="loading">
          {{ loading ? 'Submitting...' : 'Submit' }}
        </button>
      </form>
    </div>
  </div>
</template>
