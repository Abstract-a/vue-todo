<script setup>
import { ref } from 'vue';

let show = ref(false);
</script>

<template>
  <div v-if="show">
    <div>
      <p>Are you sure you want to delete this ocmment?</p>
      <div>
        <button>yes</button>
        <button>No</button>
      </div>
    </div>
  </div>
</template>
