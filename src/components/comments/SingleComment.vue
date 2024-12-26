<script setup>
import axios from 'axios';
import DeleteCommentModal from './modals/DeleteCommentModal.vue';
import { ref, inject } from 'vue';
const props = defineProps({
  comment: Object,
});
let commentProp = ref([]);
let currentComment = ref(commentProp.comment);
const showDeletePopup = ref(false);
let loading = ref(false);
let editing = ref(false);
const authToken = inject('authToken');
const emit = defineEmits(['deleteComment', 'updateComment']);

async function handleDelete() {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/comments/${props.comment._id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken._value}`,
        },
      }
    );
    emit('deleteComment', response.data.id);
  } catch (err) {
    console.error(err);
  } finally {
    showDeletePopup.value = false;
  }
}
function handleCancel() {
  showDeletePopup.value = false;
}

async function handleEdit() {
  loading.value = true;

  try {
    const response = await axios.put(
      `http://localhost:5000/api/comments/${props.comment._id}`,
      {
        comment: props.comment.comment,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken._value}`,
        },
      }
    );
    emit('updateComment', response.data);
    editing.value = false;
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
        @click="handleEdit"
        class="font-bold text-green-500 transition-all duration-300 ease-in-out hover:text-green-800 hover:underline"
      >
        {{ loading ? 'saving...' : 'save' }}
      </button>
      <button
        v-if="!editing"
        @click="editing = true"
        class="text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-800 hover:underline"
      >
        Edit
      </button>
      •
      <button
        @click="showDeletePopup = true"
        class="text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-800 hover:underline"
      >
        Delete
      </button>
    </div>
    <DeleteCommentModal
      :onShow="showDeletePopup"
      v-on:confirm="handleDelete"
      v-on:cancel="handleCancel"
    />
  </div>
</template>
