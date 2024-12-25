<script setup>
import axios from 'axios';
import SingleTodo from '../todos/SingleTodo.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';
import { ref, inject, onMounted } from 'vue';
import SearchTodos from './SearchTodos.vue';
import AddTodo from './AddTodo.vue';

let loading = ref(false);
let todos = ref([]);
let error = ref('');
const authToken = inject('authToken');

async function getTodos() {
  try {
    loading.value = true;
    const response = await axios.get('http://localhost:5000/api/todos', {
      headers: {
        Authorization: `Bearer ${authToken._value}`,
      },
    });
    todos.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch todos';
    console.log(err);
  } finally {
    loading.value = false;
  }
}
onMounted(() => getTodos());
</script>

<template>
  <div
    class="z-[900] mt-12 h-[calc(100vh-3rem)] w-screen min-w-[320px] overflow-auto bg-[#d6d6d6] p-5 text-center shadow-md sm:h-[500px] sm:max-w-[600px] sm:rounded-xl"
  >
    <BaseSpinner v-if="loading" />
    <div v-else>
      <div class="flex items-center justify-between pb-4">
        <SearchTodos />
        <button
          class="cursor-pointer rounded-md border-none bg-green-500 px-6 py-3 text-base text-white transition-all duration-500 ease-in-out hover:bg-green-600 md:mr-0"
        >
          Add
        </button>
      </div>
      <ul class="m-0 list-none p-0">
        <SingleTodo v-for="todo in todos" :key="todo._id" :todo="todo" />
      </ul>
      <AddTodo />
    </div>
  </div>
</template>
