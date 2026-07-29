import axios from 'axios'

const api_url = process.env.BACKEND_URL + '/api/v1/'

let temp_articles = [
  {
    id: 1,
    title: 'Getting Started with Vue 3',
    content:
      'Vue 3 introduces the Composition API, script setup syntax, and a more flexible way to build modern frontend applications.',
  },
  {
    id: 2,
    title: 'Understanding JavaScript Promises',
    content:
      'Promises allow you to handle asynchronous operations in JavaScript. They represent a value that may be available now, later, or never.',
  },
  {
    id: 3,
    title: 'Building REST APIs with Express',
    content:
      'Express makes it simple to create backend APIs by defining routes, handling requests, and returning responses.',
  },
  {
    id: 4,
    title: 'Why Component-Based Design Matters',
    content:
      'Breaking an application into reusable components makes code easier to maintain, test, and scale.',
  },
  {
    id: 5,
    title: 'Introduction to Databases',
    content:
      'Databases store and organize application data. Common choices include PostgreSQL, MySQL, and MongoDB.',
  },
  {
    id: 6,
    title: 'CSS Layouts with Flexbox',
    content:
      'Flexbox is a powerful CSS layout system that helps align and distribute elements efficiently.',
  },
  {
    id: 7,
    title: 'Authentication Basics',
    content:
      'Authentication verifies who a user is, often using sessions, tokens, or third-party identity providers.',
  },
  {
    id: 8,
    title: 'Using Axios in Vue',
    content:
      'Axios allows Vue applications to communicate with backend APIs by sending HTTP requests and handling responses.',
  },
]
export async function createArticle(article) {
  const response = await axios.post(api_url + '/articles')
  return response.data
}

export async function updateArticle(article) {
  //const response = await axios.patch(api_url + '/articles', article)
  //return response.data

  const articleInd = temp_articles.findIndex((acc) => acc.id === article.id)

  if (articleInd !== -1) {
    temp_articles[articleInd] = { ...article }
  }
}

export async function getArticles() {
  //const response = await axios.get(api_url + '/articles')
  //return response.data
  return [...temp_articles]
}

export async function deleteArticle(article) {
  // const response = await axios.delete(api_url + '/articles/' + article.id)

  const articleInd = temp_articles.findIndex((acc) => acc?.id === article.id)

  if (articleInd !== -1) {
    temp_articles.splice(articleInd, 1)
  }
}
