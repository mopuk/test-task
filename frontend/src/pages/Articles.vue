<template>
  <div class="m-4 p-4 flex flex-col justify-center items-center relative">
    <ArticlesGrid
      :articles="articles"
      @edit="handleEditModal"
      @delete="handleDeleteArticle"
      @create="handleCreateModal"
    />
    <CreateOrUpdateArticle
      v-if="selectedArticle"
      :article="selectedArticle"
      :mode="selectedMode"
      @save="handleSaveArticle"
      @cancel="handleCancelEditing"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getArticles,
  updateArticle,
  deleteArticle,
  createArticle,
} from "../services";
import ArticlesGrid from "../components/ArticlesGrid.vue";
import CreateOrUpdateArticle from "../components/CreateOrUpdateArticle.vue";

const articles = ref([]);

const selectedArticle = ref(null);
const selectedMode = ref(null);

onMounted(async () => {
  articles.value = await getArticles();
});

async function handleEditModal(article) {
  selectedArticle.value = {
    id: article.id,
    title: article.title,
    content: article.content,
  };
  selectedMode.value = "edit";
}

async function handleCreateModal() {
  selectedArticle.value = {
    title: "",
    content: "",
  };
  selectedMode.value = "create";
}

async function handleCancelEditing() {
  selectedArticle.value = null;
  selectedMode.value = null;
}

async function handleSaveArticle(article) {
  if (selectedMode.value === "create") {
    const response = await createArticle(article);
  } else {
    const response = await updateArticle(article);
  }

  selectedArticle.value = null;
  selectedMode.value = null;
  articles.value = await getArticles();
}
async function handleDeleteArticle(article) {
  const response = await deleteArticle(article);
  articles.value = await getArticles();
}
</script>
