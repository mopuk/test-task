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
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import ArticlesGrid from "../components/ArticlesGrid.vue";
import CreateOrUpdateArticle from "../components/CreateOrUpdateArticle.vue";

const store = useStore();

const articles = computed(() => store.state.articles.articles);

const selectedArticle = ref(null);
const selectedMode = ref(null);

onMounted(async () => {
  await store.dispatch("articles/fetchArticles");
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
    await store.dispatch("articles/createArticle", article);
  } else {
    await store.dispatch("articles/updateArticle", article);
  }

  selectedArticle.value = null;
  selectedMode.value = null;
}
async function handleDeleteArticle(articleId) {
  await store.dispatch("articles/deleteArticle", articleId);
}
</script>
