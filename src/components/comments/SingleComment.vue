<script setup>
import DelteCommentModal from './modals/DeleteCommentModal.vue';
import { ref } from 'vue';
let commentProp = ref([]);
let currentComment = ref(commentProp.comment);
let loading = ref(false);
let editing = ref(false);
</script>

<template>
  <div>
    <div v-if="editing">
      <textarea id="" v-model="currentComment" required type="text" />
    </div>
    <div v-else>
      <h3>{{ comment.comment }}</h3>
    </div>
    <div>
      <p>{{ comment.createdAt }}</p>
      •
      <button v-if="editing" type="button" disabled="loading">
        {{ loading ? 'saving...' : 'save' }}
      </button>
      <button v-if="!editing">Edit</button>
      •
      <button>Delete</button>
    </div>
    <DelteCommentModal id="comment._id" />
  </div>
</template>
