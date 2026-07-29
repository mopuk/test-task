<template>
  <div class="m-4 p-4 flex flex-col justify-center items-center">
    <ArticlesList :articles="articles" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getArticles } from '../services'
import ArticlesList from '../components/ArticlesList.vue'

const articles = ref([])

onMounted(async () => {
  articles.value = await getArticles()
})
</script>
