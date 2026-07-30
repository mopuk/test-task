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

export async function deleteArticle(article) {
  const response = await axios.delete(api_url + "/articles/" + article.id);
  return response.data;
}

export async function createComment(article_id, content) {
  const response = await axios.post(
    `${api_url}/articles/${article_id}/comments`,
    content,
  );
  return response.data;
}

export async function getComment(article_id, id) {
  const response = await axios.get(
    `${api_url}/articles/${article_id}/comments/${id}`,
  );
  return response.data;
}

export async function getComments(article_id) {
  const response = await axios.get(
    `${api_url}/articles/${article_id}/comments`,
  );
  return response.data;
}

export async function updateComment(id, content) {
  const response = await axios.patch(
    `${api_url}/articles/${article_id}/comments/${id}`,
    content,
  );
}

export async function deleteComment(id) {
  const response = await axios.delete(
    `${api_url}/articles/${article_id}/comments/${id}`,
  );
}
