<script setup>
import axios from 'axios';
import DelteCommentModal from './modals/DeleteCommentModal.vue';
import { ref, inject } from 'vue';
const props = defineProps({
  comment: Object,
});
console.log(props.comment);
let commentProp = ref([]);
let currentComment = ref(commentProp.comment);
let loading = ref(false);
let editing = ref(false);
const authToken = inject('authToken');

async function handleDelete() {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/comments/${comment.comment._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // ondeletecomment
  } catch (err) {
    console.error(err);
  } finally {
    //showconfirmdelete
  }
}

async function handleSubmit() {
  loading.value = true;
  try {
    const response = await axios.put(
      `http://localhost:5000/api/comments/${comment.comment._id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken._value}`,
        },
      },
      {
        comment: props.comment.comment,
      }
    );
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="w-full pb-2">
    <div v-if="editing" class="mx-2 flex w-full rounded-sm bg-gray-400 py-3">
      <textarea
        id=""
        v-model="props.comment.comment"
        required
        type="text"
        class="mx-auto w-[90%] rounded-md border-2 border-gray-900 px-2 text-left text-[13px]"
      />
    </div>
    <div v-else class="mx-4 rounded-lg bg-gray-400 p-3">
      <h3 class="break-words px-2 text-left text-[15px]">
        {{ props.comment.comment }}
      </h3>
    </div>
    <div class="mx-4 flex items-center justify-start gap-1">
      <p class="text-xs text-gray-500">{{ props.comment.createdAt }}</p>
      •
      <button
        v-if="editing"
        type="button"
        :disabled="loading"
        class="font-bold text-green-500 transition-all duration-300 ease-in-out hover:text-green-800 hover:underline"
      >
        {{ loading ? 'saving...' : 'save' }}
      </button>
      <button
        v-if="!editing"
        class="text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-800 hover:underline"
      >
        Edit
      </button>
      •
      <button
        class="text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-800 hover:underline"
      >
        Delete
      </button>
    </div>
    <DelteCommentModal id="props.comment.comment._id" />
  </div>
</template>
