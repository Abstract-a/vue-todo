<script setup>
import TodosView from './views/TodosView.vue';
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
    <div clas="flex">
      <RouterLink
        class="font-semibold pr-4 tracking-wider transition-all duration-300 ease-in-out hover:opacity-80"
        to="/signin"
        >Signin</RouterLink
      >
      <RouterLink
        class="font-semibold tracking-wider transition-all duration-300 ease-in-out hover:opacity-80"
        to="/signup"
        >Signup</RouterLink
      >
    </div>
  </nav>
  <RouterView />
</template>
