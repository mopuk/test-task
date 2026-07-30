/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import Article from "@/pages/Article.vue";
import Articles from "@/pages/Articles.vue";
import Comments from "@/pages/Comments.vue";
import Home from "@/pages/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/articles",
          component: Articles,
        },
        {
          path: "/articles/:id",
          component: Article,
        },
        {
          path: "/analytics/comments",
          component: Comments,
        },
      ],
    },
  ],
});

export default router;
