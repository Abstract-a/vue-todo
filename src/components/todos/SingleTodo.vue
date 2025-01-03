<script setup>
import DeleteTodoModal from './modals/DeleteTodoModal.vue';
import UpdateTodoModal from './modals/UpdateTodoModal.vue';
import ShowTodoModal from './modals/ShowTodoModal.vue';
import { ref, inject } from 'vue';
import axios from 'axios';

const props = defineProps({
  todo: Object,
});
const emit = defineEmits(['deleteTodo']);
const authToken = inject('authToken');
const confirmDeletePopup = ref(false);
const confirmShowPopup = ref(false);
const confirmUpdatePopup = ref(false);
async function handleDelete() {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/todos/${props.todo._id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken._value}`,
        },
      }
    );
    emit('deleteTodo', response.data.id);
  } catch (err) {
    console.error(err);
  } finally {
    confirmDeletePopup.value = false;
  }
}

async function handleCompleted(e) {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/todos/${props.todo._id}`,
      {
        title: props.todo.title,
        text: props.todo.text,
        completed: !props.todo.completed,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken._value}`,
        },
      }
    );
    // setUpdateDate
    props.todo.completed = !props.todo.completed;
    //onCompleted()
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <div class="m-auto">
    <li
      @click.self="confirmShowPopup = true"
      class="mb-3 flex cursor-pointer items-center justify-between rounded-md bg-slate-100 p-4 shadow-md"
    >
      <div class="flex gap-3">
        <button
          class="ml-3 cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-green-500"
          @click="handleCompleted"
        >
          <svg
            v-if="props.todo.completed"
            height="1.5rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            >
            <path
              class="fill-gray-700"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
            />
          </svg>
          <svg
            v-else
            height="1.5rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            >
            <path
              class="fill-gray-700"
              d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
            />
          </svg>
        </button>
        <div class="flex gap-3">
          <h3
            :class="[
              ' text-left cursor-default text-[14px] font-bold md:text-lg',
              props.todo.completed
                ? 'italic text-gray-600 line-through opacity-70'
                : '',
            ]"
          >
            {{ props.todo.title }}
          </h3>
        </div>
      </div>
      <div class="flex flex-row gap-1">
        <button
          class="ml-3 cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-green-500"
          :disabled="props.todo.completed"
          @click="confirmUpdatePopup = true"
        >
          <svg
            height="1.5rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            >
            <path
              :class="[
                props.todo.completed
                  ? 'fill-gray-400 cursor-default'
                  : 'fill-gray-700',
              ]"
              d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
            />
          </svg>
        </button>
        <button
          class="ml-3 cursor-pointer border-none bg-none text-base transition-colors duration-300 ease-in-out hover:text-red-600"
          @click="confirmDeletePopup = true"
        >
          <svg
            height="1.5rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            >
            <path
              class="fill-gray-700"
              d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
            />
          </svg>
        </button>
      </div>
    </li>
    <DeleteTodoModal
      v-if="confirmDeletePopup"
      @cancel="confirmDeletePopup = false"
      :id="props.todo._id"
      @confirm="handleDelete"
    />
    <UpdateTodoModal
      :todo="todo"
      v-if="confirmUpdatePopup"
      @cancel="confirmUpdatePopup = false"
    />
    <ShowTodoModal
      :todo="todo"
      v-if="confirmShowPopup"
      @cancel="confirmShowPopup = false"
    />
  </div>
</template>
