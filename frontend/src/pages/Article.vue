<template>
    <div v-if="isLoading">
        Loading
    </div>
    <div v-else>
        <h1>
            {{ article.title }}
        </h1>
        <p>{{ article.content }}</p>
    </div>
</template>

<script setup>
    import { getArticle } from "@/services.js";
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const  article = ref(null)
    const isLoading = ref(true)
    const error = ref(null)

    onMounted(async () => {
        try {
        article.value = await getArticle(route.params.id)
    } catch (err) {
        error.value = err;
        console.error(err)
    } finally {
        isLoading.value = false
    }
    })

</script>