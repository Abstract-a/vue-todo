<script setup>
import { ref } from 'vue';

let expanded = ref(false);
let initialTitle = ref('initialTitle');
let initialText = ref('initialText');
</script>

<template>
  <div>
    <div>
      <button>ClearIcon</button>
      <h3>{{ initialTitle }}</h3>
      <div>
        <p>
          {{ initialText }}
        </p>
        <span>
          {{ expanded ? 'Show less' : 'Show more' }}
        </span>
      </div>
      <div></div>
    </div>
  </div>
</template>
