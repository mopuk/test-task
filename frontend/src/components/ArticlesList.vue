<template>
  <div>
    <h1 class="font-bold text-2xl self-start mx-5">Статьи</h1>
    <ul
      v-for="article in props.articles"
      :key="article.id"
      class="bg-zinc-800 rounded-xl list-none my-4 w-200"
    >
      <li class="px-6 py-6 relative group">
        <h2 class="font-bold text-xl mb-2">{{ article.title }}</h2>
        <p class="text-gray-400">
          {{
            article.content.length < 150 ? article.content : article.content.slice(0, 150) + '...'
          }}
        </p>
        <div class="mt-4">
          <v-btn :to="`/articles/${article.id}`">
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
              class="lucide lucide-message-circle-icon lucide-message-circle"
            >
              <path
                d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
              />
            </svg>
          </v-btn>
        </div>
        <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <v-btn @click="handleEdit(article)">
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
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path
                d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
              />
            </svg>
          </v-btn>
          <v-btn @click="handleDelete(article)">
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
import { reactive, defineEmits } from 'vue'

const props = defineProps({
  articles: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])

function handleEdit(article) {
  emit('edit', article)
}

function handleDelete(article) {
  emit('delete', article)
}
</script>
