<template>
  <div class="m-4 p-4 flex flex-col justify-center items-center relative">
    <ArticlesList :articles="articles" @edit="handleOpenModal" @delete="handleDeleteArticle" />
    <CreateOrUpdateArticle
      v-if="selectedArticle"
      :article="selectedArticle"
      @save="handleSaveArticle"
      @cancel="handleCancelEditing"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getArticles, updateArticle, deleteArticle, createArticle } from '../services'
import ArticlesList from '../components/ArticlesList.vue'
import CreateOrUpdateArticle from '../components/CreateOrUpdateArticle.vue'
const articles = ref([])

const selectedArticle = ref(null)

onMounted(async () => {
  articles.value = await getArticles()
})

async function handleOpenModal(article) {
  selectedArticle.value = article
}

async function handleCancelEditing() {
  selectedArticle.value = null
}

async function handleSaveArticle(article) {
  const response = await updateArticle(article)
  selectedArticle.value = null
  articles.value = await getArticles()
}
async function handleDeleteArticle(article) {
  const response = await deleteArticle(article)
  articles.value = await getArticles()
}
</script>
