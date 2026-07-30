<template>
  <div class="min-h-screen flex flex-col items-center py-10">
    <div class="w-125">
      <v-form
        @submit.prevent="handleSubmit"
        class="flex gap-4 items-center mb-6"
      >
        <v-date-input label="От" v-model="from"></v-date-input>
        <v-date-input label="До" v-model="to"></v-date-input>
        <v-btn type="submit">Поиск</v-btn>
      </v-form>
    </div>
    <div v-if="loading" class="spinner-container">
      <div class="spinner"></div>
    </div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <ul v-else>
      <li v-for="article in comments" :key="article.articleId" class="mt-4">
        <h2 class="text-bold text-xl">{{ article.title }}</h2>
        <ol class="list-decimal mt-2">
          <li v-for="comment in article.comments">
            <p>{{ comment.content }}</p>
            <span class="text-gray-400 text-xs">{{
              comment.createdAt == comment.updatedAt
                ? formatDate(comment.createdAt)
                : `изменён: ${formatDate(comment.updatedAt)}`
            }}</span>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

import { formatDate } from "@/services.js";

const store = useStore();

const comments = computed(() => store.state.comments.comments);
const loading = computed(() => store.state.comments.analyticsLoading);
const error = computed(() => store.state.comments.error);

const from = ref(null);
const to = ref(null);

async function handleSubmit() {
  await store.dispatch("comments/analyseComments", {
    dateFrom: from.value,
    dateTo: to.value,
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
