import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://developer.duyiedu.com/vue/bz/',
});

export default instance;