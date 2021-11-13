import axios from 'axios'
import {getItem} from '@/helpers/persistenceStorage'

// axios.defaults.baseURL = 'https://conduit.productionready.io/api'
// axios.defaults.baseURL = 'https://api.realworld.io/api'
axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken')
  const authorizationToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authorizationToken
  return config
})

export default axios
