<template>
  <div v-if="loading" class="spinner-container">
    <div class="spinner"></div>
  </div>
  <div v-else-if="error">Ошибка: {{ error.message }}</div>
  <div v-else>
    <div class="flex gap-4 items-center">
      <h2 class="text-xl font-bold mb-2 mt-4">Комментарии</h2>
      <v-btn @click="handleCreate">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="6 6 12 12"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-plus-icon lucide-plus"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </v-btn>
    </div>
    <ul class="list-none flex flex-col gap-4">
      <li v-for="comment in comments" class="group relative">
        <p class="mb-0.5">{{ comment.content }}</p>
        <span class="text-gray-400 text-xs">{{
          comment.createdAt == comment.updatedAt
            ? formatDate(comment.createdAt)
            : `изменён: ${formatDate(comment.updatedAt)}`
        }}</span>
        <div
          class="opacity-0 group-hover:opacity-100 transition absolute right-0 top-1/2 -translate-y-1/2"
        >
          <v-btn @click="handleEdit(comment)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-square-pen-icon lucide-square-pen"
            >
              <path
                d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              />
              <path
                d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
              />
            </svg>
          </v-btn>
          <v-btn @click="handleDelete(comment)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trash-icon lucide-trash"
            >
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </v-btn>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { formatDate } from "@/services.js";

const store = useStore();

const props = defineProps({
  article_id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

const comments = computed(() => store.state.comments.comments);
const loading = computed(() => store.state.comments.loading);
const error = computed(() => store.state.comments.error);

onMounted(async () => {
  try {
    await store.dispatch("comments/fetchComments", props.article_id);
  } catch (err) {
    console.error(err);
  }
});

async function handleEdit(comment) {
  emit("edit", comment);
}

async function handleDelete(comment) {
  emit("delete", comment);
}

async function handleCreate() {
  emit("create");
}
</script>

<style>
.spinner-container {
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.2);
}

.spinner {
  width: 48px;
  height: 48px;

  border: 4px solid #d4d4d8;
  border-top: 4px solid #3b82f6;

  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
