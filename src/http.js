import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.request.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default http
