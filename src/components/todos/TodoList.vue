<script setup>
import axios from 'axios';
import SingleTodo from './SingleTodo.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';
import { ref, inject, onMounted } from 'vue';
import SearchTodos from './SearchTodos.vue';
import AddTodo from './AddTodo.vue';

let loading = ref(false);
let todos = ref([]);
let error = ref('');
const authToken = inject('authToken');
const showAddTodo = ref(false);

function handleAddTodo(newTodo) {
  todos.value.push(newTodo);
}

function handleDeleteTodo(id) {
  todos.value.filter((todo) => todo._id !== id);
}

function handleUpdateTodo(updatedTodo) {
  todos.value.map((todo) =>
    todo._id === updatedtodo._id ? updatedTodo : todo
  );
}

function sortTodos(todos) {
  return todos.value.sort((a, b) => {
    if (a.completed === b.completed) {
      return 0;
    }
    return a.completed ? 1 : -1;
  });
}

function handleCompleted(id, newCompletedStatus) {
  todos.map((todo) =>
    todo._id === id ? { ...todo, completed: newCompletedStatus } : todo
  );
}

function handleSeach(searchTerm) {
  const lowercasedTerm = searchTerm.toLowerCase();
  todos.value.filter((todo) =>
    todo.title.toLowerCase().includes(lowercasedTerm)
  );
}

function onCancel() {
  showAddTodo.value = false;
}
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
          @click="
            () => {
              showAddTodo = !showAddTodo;
            }
          "
          class="cursor-pointer rounded-md border-none bg-green-500 px-6 py-3 text-base text-white transition-all duration-500 ease-in-out hover:bg-green-600 md:mr-0"
        >
          Add
        </button>
      </div>
      <ul class="m-0 list-none p-0">
        <SingleTodo
          v-for="todo in todos"
          :key="todo._id"
          :todo="todo"
          v-on:delete-todo="handleDeleteTodo"
        />
      </ul>
      <AddTodo
        :onShow="showAddTodo"
        v-on:add-todo="handleAddTodo"
        v-on:cancel="onCancel"
      />
    </div>
  </div>
</template>
