<script setup>
import CommentsPage from '../../comments/CommentsPage.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  onShow: Boolean,
  todo: Object,
});
const emit = defineEmits(['cancel']);

let expanded = ref(false);

function handleKeyDown(e) {
  if (e.key === 'Escape') {
    emit('cancel');
    expanded.value = false;
  }
}
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div
    v-if="onShow"
    @click.self="
      () => {
        $emit('cancel');
        expanded = false;
      }
    "
    class="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center bg-gray-500 md:flex-row md:gap-4"
  >
    <div
      class="relative z-[1000] flex h-[60%] w-screen min-w-[384px] flex-col items-center justify-center gap-3 bg-gray-200 p-5 shadow-md md:h-[560px] md:w-[90%] md:max-w-[500px] md:rounded-lg"
    >
      <button
        @click="
          () => {
            $emit('cancel');
            expanded = false;
          }
        "
        class="absolute left-0 top-0 mr-3 cursor-pointer overflow-hidden rounded-lg border-none p-3 text-red-500 transition-all duration-500 ease-in-out hover:bg-gray-300 hover:text-red-700"
        n
      >
        <svg
          height="2rem"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            class="fill-red-500 hover:fill-red-700 transition-all duration-300 ease-in-out"
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
      <h3 class="mb-4 mt-12 text-xl text-left font-bold w-full pl-3">
        {{ props.todo.title }}
      </h3>
      <div
        :class="[
          'mx-auto h-[400px] w-full overflow-y-hidden whitespace-normal break-words',
          expanded ? 'overflow-y-scroll' : '',
        ]"
      >
        <p
          :class="[
            'px-3 text-left text-gray-700',
            expanded ? '' : 'line-clamp-4',
          ]"
        >
          {{ props.todo.text }}
        </p>
        <span
          :class="[
            'mt-4 inline-block cursor-pointer text-blue-500 w-full pl-3 text-left',
            props.todo.text.length < 260 ? 'hidden' : '',
          ]"
          @click="expanded = !expanded"
        >
          {{ expanded ? 'Show less' : 'Show more' }}
        </span>
      </div>
      <div class="flex w-full justify-between gap-4">
        <div class="flex flex-col gap-1">
          <p class="text-xs text-gray-500">date of creation</p>
          <p class="text-xs text-gray-500">{{ props.todo.createdAt }}</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-xs text-gray-500">latest update</p>
          <p class="text-xs text-gray-500">{{ props.todo.updatedAt }}</p>
        </div>
        <div v-if="Boolean(props.todo.isCompleted)" class="flex flex-col gap-1">
          <p class="text-xs text-gray-500">complete at</p>
          <p class="text-xs text-gray-500">{{ props.todo.completedAt }}</p>
        </div>
      </div>
    </div>
    <CommentsPage :id="props.todo._id" />
  </div>
</template>
