<template>
  <div v-if="isLoading" class="spinner-container">
    <div class="spinner"></div>
  </div>
  <div v-else>
    <h2 class="text-xl font-bold">Комментарии</h2>
    <div v-for="comment in comments">
      <p>{{ comment.content }}</p>
      <span class="text-gray-400 text-xs">{{
        comment.createdAt == comment.updatedAt
          ? formatDate(comment.createdAt)
          : `изменён: ${formatDate(comment.updatedAt)}`
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getComments } from "@/services.js";

const props = defineProps({
  article_id: {
    type: Number,
    required: true,
  },
});

const isLoading = ref(true);
const error = ref(null);
const comments = ref([]);

onMounted(async () => {
  try {
    comments.value = await getComments(props.article_id);
  } catch (err) {
    error.value = err;
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});

function formatDate(date) {
  return new Date(date).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
