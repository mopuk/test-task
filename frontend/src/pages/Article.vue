<template>
  <div v-if="loading" class="spinner-container">
    <div class="spinner"></div>
  </div>
  <div v-else-if="error">Ошибка: {{ error.message }}</div>
  <div
    v-else
    class="w-screen min-h-screen h-fit p-4 flex flex-col justify-center items-center"
  >
    <div class="w-200 h-150 bg-zinc-800 rounded-xl px-8 py-6">
      <div class="">
        <h1 class="text-2xl font-bold">
          {{ article.title }}
        </h1>
        <p>{{ article.content }}</p>
      </div>
      <CommentsList
        :article_id="Number(route.params.id)"
        @edit="handleEditModal"
        @delete="handleDeleteComment"
        @create="handleCreateModal"
      />
    </div>
    <div v-if="selectedComment">
      <CreateOrUpdateComment
        :mode="selectedMode"
        :comment="selectedComment"
        @save="handleSaveComment"
        @cancel="handleCancelEditing"
      />
    </div>
  </div>
</template>

<script setup>
import CommentsList from "@/components/CommentsList.vue";
import CreateOrUpdateComment from "@/components/CreateOrUpdateComment.vue";

import { computed, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const route = useRoute();
const article = computed(() => store.state.articles.currentArticle);
const articleId = computed(() => article.value?.id ?? null);
const loading = computed(() => store.state.articles.loading);
const error = computed(() => store.state.articles.error);

const selectedComment = ref(null);
const selectedMode = ref(null);

watch(
  () => route.params.id,
  async (id) => {
    await store.dispatch("articles/fetchArticle", id);
  },
  { immediate: true },
);

async function handleEditModal(comment) {
  selectedComment.value = {
    id: comment.id,
    content: comment.content,
  };
  selectedMode.value = "edit";
}

async function handleCreateModal() {
  selectedComment.value = {
    title: "",
    content: "",
  };
  selectedMode.value = "create";
}

async function handleCancelEditing() {
  selectedComment.value = null;
  selectedMode.value = null;
}

async function handleSaveComment(comment) {
  if (selectedMode.value === "create") {
    await store.dispatch("comments/createComment", {
      articleId: articleId.value,
      comment: comment,
    });
  } else {
    await store.dispatch("comments/updateComment", {
      articleId: articleId.value,
      comment: comment,
    });
  }
  selectedComment.value = null;
  selectedMode.value = null;
}
async function handleDeleteComment(comment) {
  await store.dispatch("comments/deleteComment", {
    articleId: articleId.value,
    commentId: comment.id,
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
