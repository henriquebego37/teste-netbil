import axios from 'axios';

const api = axios.create({
  baseURL: 'https://netbil.com.br/',
});

export default api;
