import axios from '@/api/axios'

const getArticle = (slug) => {
  return axios.get(`/articles/${slug}`).then((res) => res.data.article)
}

const deleteArticle = (slug) => {
  return axios.delete(`/articles/${slug}`).then((res) => {
    console.log(res)
  })
}

export default {
  getArticle,
  deleteArticle,
}
