<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

let email = ref('');
let password = ref('');
let error = ref('');
const setAuthToken = inject('setAuthToken');
const router = useRouter();

async function login() {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', {
      email: email.value,
      password: password.value,
    });
    //localstorage.setItem('jwt', response.data.token);
    setAuthToken(response.data.token);
    router.push('/');
  } catch (err) {
    error.value = 'Invalid email or password. Please try again';
  }
}
</script>

<template>
  <div
    class="mx-auto mt-12 flex h-[calc(100vh-3rem)] w-screen flex-col gap-8 rounded-lg bg-gray-200 pt-40 shadow-lg sm:mt-0 sm:h-[400px] sm:w-[400px] sm:gap-4 sm:pt-0"
  >
    <h1 class="pt-6 text-center text-xl font-bold">Sign in</h1>
    <form
      @submit.prevent="login"
      class="flex flex-col gap-8 sm:gap-4"
      action=""
    >
      <input
        class="mx-2 rounded-md border border-gray-400 p-2 text-lg font-medium tracking-wide"
        type="email"
        placeholder="Email"
        v-model="email"
        required
      />
      <input
        class="mx-2 rounded-md border border-gray-400 p-2 text-lg font-medium tracking-wide"
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <p v-if="error" class="pl-2 text-left text-red-500">{{ error }}</p>
      <button
        type="submit"
        class="mx-2 cursor-pointer rounded-lg border-none bg-blue-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-blue-600 hover:opacity-90"
      >
        Sign In
      </button>
    </form>
  </div>
</template>
