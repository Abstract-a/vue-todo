<script setup>
import { ref } from 'vue';

let searchTerm = ref('');
</script>

<template>
  <div>
    <input type="text" v-model="searchTerm" placeholder="Search todos..." />
  </div>
</template>
