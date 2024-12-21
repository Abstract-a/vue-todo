<script setup>
import { ref } from 'vue';

let email = ref('');
let password = ref('');
let error = ref('');
</script>

<template>
  <div>
    <h1>Sign in</h1>
    <form action="">
      <input type="email" placeholder="Email" v-model="email" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <p v-if="error">{{ error }}</p>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>
