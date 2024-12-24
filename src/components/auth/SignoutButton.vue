<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const router = useRouter();
const setAuthToken = inject('setAuthToken');

function signout() {
  setAuthToken(null);
  router.push('/signin');
}
</script>
<template>
  <button
    @click="signout"
    class="font-semibold tracking-wider transition-all duration-300 ease-in-out hover:opacity-80"
  >
    Sign Out
  </button>
</template>
