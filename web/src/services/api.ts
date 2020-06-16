import axios from 'axios'//biblioteca para realizar requisições: 'npm install axios'

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api