import axios from 'axios'

const api_url = import.meta.env.VITE_BACKEND_URL + '/api/v1'

export async function createArticle(article) {
  const response = await axios.post(api_url + '/articles')
  return response.data
}

export async function updateArticle(article) {
  const response = await axios.patch(api_url + '/articles', article)
  return response.data
}

export async function getArticles() {
  const response = await axios.get(api_url + '/articles')
  return response.data
}

export async function deleteArticle(article) {
  const response = await axios.delete(api_url + '/articles/' + article.id)
}
