<script setup>
import axios from 'axios';
import SingleTodo from './SingleTodo.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';
import { ref } from 'vue';
import SearchTodos from './SearchTodos.vue';
import AddTodo from './AddTodo.vue';
</script>

<template>
  <div>
    <BaseSpinner v-if="loading" />
    <div v-else>
      <div>
        <SearchTodos />
        <button>Add</button>
      </div>
      <u>
        <SingleTodo v-for="todo in todos" :key="todo._id" todo />
      </u>
      <AddTodo />
    </div>
  </div>
</template>
