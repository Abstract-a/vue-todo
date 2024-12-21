<script setup>
import { ref } from 'vue';

let show = ref(true);
</script>
<template>
  <div v-show="show">
    <div>
      <p>Are you sure you want to delete this todo?</p>
      <div>
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>
  </div>
</template>
