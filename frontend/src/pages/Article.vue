<template>
  <div v-if="isLoading" class="spinner-container">
    <div class="spinner"></div>
  </div>
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
        ref="commentsList"
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
import {
  getArticle,
  createComment,
  deleteComment,
  updateComment,
} from "@/services.js";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const article = ref(null);
const articleId = ref(null);
const isLoading = ref(true);
const error = ref(null);
const commentsList = ref(null);

const selectedComment = ref(null);
const selectedMode = ref(null);

onMounted(async () => {
  try {
    article.value = await getArticle(route.params.id);
    articleId.value = article.value.id;
  } catch (err) {
    error.value = err;
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});

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
    const response = await createComment(articleId.value, comment);
  } else {
    const response = await updateComment(articleId.value, comment);
  }

  selectedComment.value = null;
  selectedMode.value = null;
  await commentsList.value.loadComments();
}
async function handleDeleteComment(comment) {
  const response = await deleteComment(articleId.value, comment);
  comments.value = await getComments();
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
