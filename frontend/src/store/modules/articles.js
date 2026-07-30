import {
  getArticles,
  getArticle,
  createArticle as createArticleAPI,
  updateArticle as updateArticleAPI,
  deleteArticle as deleteArticleAPI,
} from "@/services.js";

export default {
  namespaced: true,

  state: () => ({
    articles: [],
    currentArticle: null,
    loading: false,
    error: null,
  }),

  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    setCurrentArticle(state, article) {
      state.currentArticle = article;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setError(state, error) {
      state.error = error;
    },
    addArticle(state, article) {
      state.articles.push(article);
    },
    changeArticle(state, updatedArticle) {
      const ind = state.articles.findIndex(
        (article) => article.id === updatedArticle.id,
      );

      if (ind !== -1) {
        state.articles[ind] = updatedArticle;
      }

      if (state.currentArticle?.id == updatedArticle.id) {
        state.currentArticle = updatedArticle;
      }
    },
    removeArticle(state, deletedId) {
      state.articles = state.articles.filter(
        (article) => article.id != deletedId,
      );

      if (state.currentArticle?.id === deletedId) {
        state.currentArticle = null;
      }
    },
  },

  actions: {
    async fetchArticles({ commit }) {
      commit("setLoading", true);
      try {
        const articles = await getArticles();

        commit("setArticles", articles);
      } catch (err) {
        commit("setError", err);
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchArticle({ commit }, id) {
      commit("setLoading", true);
      try {
        const article = await getArticle(id);

        commit("setCurrentArticle", article);
      } catch (err) {
        commit("setError", err);
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },
    async createArticle({ commit }, article) {
      const created = await createArticleAPI(article);

      commit("addArticle", created);
    },
    async updateArticle({ commit }, article) {
      const updatedArticle = await updateArticleAPI(article);
      commit("changeArticle", updatedArticle);
      return updatedArticle;
    },
    async deleteArticle({ commit }, articleId) {
      await deleteArticleAPI(articleId);
      commit("removeArticle", articleId);
    },
  },
};
