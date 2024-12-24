<script setup>
import { provide, ref } from 'vue';
import { RouterView } from 'vue-router';
import SignoutButton from './components/auth/SignoutButton.vue';

const token = ref(localStorage.getItem('authToken'));

const setToken = (newToken) => {
  token.value = newToken;
  if (newToken) {
    localStorage.setItem('authToken', newToken);
  } else {
    localStorage.removeItem('authToken');
  }
};
provide('authToken', token);
provide('setAuthToken', setToken);
</script>

<template>
  <!-- <TodosView /> -->
  <nav
    class="fixed left-0 top-0 z-[1000] flex h-12 w-screen items-center justify-between bg-gray-800 px-3 text-white sm:px-10"
  >
    <RouterLink
      class="text-2xl font-semibold tracking-widest transition-all duration-300 ease-in-out hover:opacity-80"
      to="/"
      >home</RouterLink
    >
    <div class="flex gap-4" v-if="!token">
      <RouterLink
        class="font-semibold tracking-wider transition-all duration-300 ease-in-out hover:opacity-80"
        to="/signin"
        >Signin</RouterLink
      >
      <RouterLink
        class="font-semibold tracking-wider transition-all duration-300 ease-in-out hover:opacity-80"
        to="/signup"
        >Signup</RouterLink
      >
    </div>
    <div v-else class="flex gap-4">
      <RouterLink
        class="font-semibold tracking-wider transition-all duration-300 ease-in-out hover:opacity-80"
        to="/signin"
        ><SignoutButton
      /></RouterLink>
    </div>
  </nav>
  <RouterView />
</template>
