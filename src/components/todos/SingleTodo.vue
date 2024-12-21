<script setup>
import { ref } from 'vue';

let isCompleted = ref(false);
</script>

<template>
  <div>
    <li>
      <div>
        <button>
          {{ isCompleted }}
        </button>
        <div>
          <h3></h3>
        </div>
      </div>
    </li>
  </div>
</template>
