import axios from "axios";

const api_url = import.meta.env.VITE_BACKEND_URL + "/api/v1";

export async function createArticle(article) {
  const response = await axios.post(api_url + "/articles", {
    title: article.title,
    content: article.content,
  });
  return response.data;
}

export async function getArticle(id) {
  const response = await axios.get(api_url + "/articles/" + id);
  return response.data;
}

export async function getArticles() {
  const response = await axios.get(api_url + "/articles");
  return response.data;
}

export async function updateArticle(article) {
  const response = await axios.patch(
    api_url + "/articles/" + article.id,
    article,
  );
  return response.data;
}

export async function deleteArticle(id) {
  const response = await axios.delete(api_url + "/articles/" + id);
  return response.data;
}

export async function createComment(articleId, comment) {
  const response = await axios.post(
    `${api_url}/articles/${articleId}/comments`,
    {
      content: comment.content,
    },
  );
  return response.data;
}

export async function getComment(articleId, id) {
  const response = await axios.get(
    `${api_url}/articles/${articleId}/comments/${id}`,
  );
  return response.data;
}

export async function getComments(articleId) {
  const response = await axios.get(`${api_url}/articles/${articleId}/comments`);
  return response.data;
}

export async function updateComment(articleId, comment) {
  const response = await axios.patch(
    `${api_url}/articles/${articleId}/comments/${comment.id}`,
    {
      content: comment.content,
    },
  );

  return response.data;
}

export async function deleteComment(articleId, commentId) {
  const response = await axios.delete(
    `${api_url}/articles/${articleId}/comments/${commentId}`,
  );
}

export async function analyseComments(dateFrom, dateTo) {
  dateTo.setHours(23, 59, 59, 999);
  const response = await axios.get(`${api_url}/analytic/comments/`, {
    params: {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
    },
  });
  return response.data;
}

export function formatDate(date) {
  return new Date(date).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
