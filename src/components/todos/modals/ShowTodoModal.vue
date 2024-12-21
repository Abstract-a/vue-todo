<script setup>
import CommentsPage from '@/components/comments/CommentsPage.vue';
import { Comment, ref } from 'vue';

let expanded = ref(false);
let initialTitle = ref('initialTitle');
let initialText = ref('initialText');
let completed = ref(true);
let createdAt = ref('jan-02-1999');
let updatedAt = ref('jan-02-1999');
let completedAt = ref('jan-02-1999');
</script>

<template>
  <div>
    <div>
      <button>ClearIcon</button>
      <h3>{{ initialTitle }}</h3>
      <div>
        <p>
          {{ initialText }}
        </p>
        <span>
          {{ expanded ? 'Show less' : 'Show more' }}
        </span>
      </div>
      <div>
        <div>
          <p>date of creation</p>
          <p>{{ createdAt }}</p>
        </div>
        <div>
          <p>latest update</p>
          <p>{{ updatedAt }}</p>
        </div>
        <div v-if="completed">
          <p>complete at</p>
          <p>{{ completedAt }}</p>
        </div>
      </div>
    </div>
    <CommentsPage />
  </div>
</template>
