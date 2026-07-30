import {
  getComments,
  getComment,
  createComment as createCommentAPI,
  updateComment as updateCommentAPI,
  deleteComment as deleteCommentAPI,
  analyseComments as analyseCommentsAPI,
} from "@/services.js";

export default {
  namespaced: true,

  state: () => ({
    comments: [],
    loading: true,
    analyticsLoading: false,
    error: null,
  }),

  mutations: {
    setComments(state, comments) {
      state.comments = comments;
    },
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setAnalyticsLoading(state, value) {
      state.analyticsLoading = value;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    },
    changeComment(state, updatedComment) {
      const ind = state.comments.findIndex(
        (comment) => comment.id === updatedComment.id,
      );

      if (ind !== -1) {
        state.comments[ind] = updatedComment;
      }
    },
    removeComment(state, id) {
      state.comments = state.comments.filter((comment) => comment.id !== id);
    },
  },

  actions: {
    // async fetchComment({commit}, id) {
    //     const comment = await getComment(id)
    //     commit("")
    // }
    async fetchComments({ commit }, articleId) {
      commit("setLoading", true);
      try {
        const comments = await getComments(articleId);
        commit("setComments", comments);
      } catch (err) {
        commit("setError", err);
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },
    async createComment({ commit }, { articleId, comment }) {
      const newComment = await createCommentAPI(articleId, comment);
      commit("addComment", newComment);
    },
    async updateComment({ commit }, { articleId, comment }) {
      const updatedComment = await updateCommentAPI(articleId, comment);
      commit("changeComment", updatedComment);
    },
    async deleteComment({ commit }, { articleId, commentId }) {
      await deleteCommentAPI(articleId, commentId);
      commit("removeComment", commentId);
    },
    async analyseComments({ commit }, { dateFrom, dateTo }) {
      commit("setAnalyticsLoading", true);

      try {
        const comments = await analyseCommentsAPI(dateFrom, dateTo);
        commit("setComments", comments);
      } catch (err) {
        commit("setError", err);
        throw err;
      } finally {
        commit("setAnalyticsLoading", false);
      }
    },
  },
};
