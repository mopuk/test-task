<template>
  <header class="h-16 bg-zinc-900 flex items-center px-6 gap-4">
    <RouterLink to="/articles">
      <v-btn>Статьи</v-btn>
    </RouterLink>

    <RouterLink to="/analytics/comments">
      <v-btn>Аналитика комметариев</v-btn>
    </RouterLink>
  </header>

  <main class="p-6">
    <RouterView />
  </main>
</template>
