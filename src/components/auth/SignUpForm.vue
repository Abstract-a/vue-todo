<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

let email = ref('');
let name = ref('');
let password = ref('');
let success = ref('');
let error = ref('');

const router = useRouter();

async function signup() {
  //error.value = '';
  //success.value = '';
  try {
    const response = await axios.post('http://localhost:5000/api/users', {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    if (response.status === 201) {
      success.value = 'Registration successful! you can now log in';
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    }
  } catch (err) {
    console.error(err);
    if (err.response) {
      error.value = 'Registration failed';
    } else {
      error.value = 'Something went wrong, please try again';
    }
  }
}
</script>

<template>
  <div
    class="mx-auto mt-12 flex h-[calc(100vh-3rem)] w-screen flex-col gap-8 rounded-lg bg-gray-200 pt-40 shadow-lg sm:mt-0 sm:h-[400px] sm:w-[400px] sm:gap-4 sm:pt-0"
  >
    <h1 class="pt-6 text-center text-xl font-bold">Sign up</h1>
    <form @submit.prevent="signup" class="flex flex-col gap-8 sm:gap-4">
      <input
        type="text"
        placeholder="Name"
        v-model="name"
        required
        class="mx-2 rounded-md border border-gray-400 p-2 text-lg font-medium tracking-wide"
      />
      <input
        type="email"
        placeholder="Email"
        v-model="email"
        required
        class="mx-2 rounded-md border border-gray-400 p-2 text-lg font-medium tracking-wide"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
        class="mx-2 rounded-md border border-gray-400 p-2 text-lg font-medium tracking-wide"
      />
      <p v-if="error" class="pl-2 text-left text-red-500">{{ error }}</p>
      <p v-if="success" class="pl-2 text-left text-green-500">
        {{ success }}
      </p>
      <button
        type="submit"
        class="mx-2 cursor-pointer rounded-lg border-none bg-blue-500 px-6 py-3 text-white transition-all duration-500 ease-in-out hover:bg-blue-600 hover:opacity-90"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>
