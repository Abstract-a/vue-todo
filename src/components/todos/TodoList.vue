<script setup>
import axios from 'axios';
import SingleTodo from './SingleTodo.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';
import { ref, inject, provide, onMounted, computed } from 'vue';
import SearchTodos from './SearchTodos.vue';
import AddTodo from './AddTodo.vue';

let loading = ref(false);
let todos = ref([]);
const filteredTodos = ref([]);
let error = ref('');
const authToken = inject('authToken');
const showAddTodo = ref(false);

const sortedTodos = computed(() => {
  return filteredTodos.value.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
});

function handleAddTodo(newTodo) {
  filteredTodos.value.push(newTodo);
}

function handleDeleteTodo(id) {
  todos.value = todos.value.filter((todo) => todo._id !== id);
  filteredTodos.value = filteredTodos.value.filter((todo) => todo._id !== id);
}

function handleUpdateTodo(updatedTodo) {
  todos.value.map((todo) =>
    todo._id === updatedTodo._id ? updatedTodo : todo
  );
}

function handleCompleted(id, newCompletedStatus) {
  todos.map((todo) =>
    todo._id === id ? { ...todo, completed: newCompletedStatus } : todo
  );
}

function handleSearch(searchTerm) {
  const lowercasedTerm = searchTerm.toLowerCase();
  filteredTodos.value = todos.value.filter((todo) => {
    return todo.title.toLowerCase().includes(lowercasedTerm);
  });
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
    filteredTodos.value = response.data;
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
        <SearchTodos @search="handleSearch" />
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
          v-for="todo in sortedTodos"
          :key="todo._id"
          :todo="todo"
          @delete-todo="handleDeleteTodo"
          @update-todo="handleUpdateTodo"
        />
      </ul>
      <AddTodo
        :onShow="showAddTodo"
        @add-todo="handleAddTodo"
        @cancel="onCancel"
      />
    </div>
  </div>
</template>
