<script setup>
import { ref } from 'vue';

let email = ref('');
let name = ref('');
let password = ref('');
let success = ref('');
let error = ref('');
</script>

<template>
  <div>
    <h1>Sign up</h1>
    <form action="">
      <input type="text" placeholder="Name" v-model="name" required />
      <input type="email" placeholder="Email" v-model="email" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <p v-if="error">{{ error }}</p>
      <p v-if="success">{{ success }}</p>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>
