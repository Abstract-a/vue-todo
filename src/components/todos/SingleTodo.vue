<script setup>
import DeleteTodoModal from '../modals/DeleteTodoModal.vue';
import UpdateTodoModal from '../modals/UpdateTodoModal.vue';
import ShowTodoModal from '../modals/ShowTodoModal.vue';

import { ref } from 'vue';

let isCompleted = ref(true);
let title = ref('title');
</script>

<template>
  <div>
    <li>
      <div>
        <button>
          {{ isCompleted }}
        </button>
        <div>
          <h3>{{ title }}</h3>
        </div>
      </div>
      <div>
        <button>modeeditionicon</button>
        <button>delete</button>
      </div>
    </li>
    <DeleteTodoModal />
    <UpdateTodoModal />
    <ShowTodoModal />
  </div>
</template>
