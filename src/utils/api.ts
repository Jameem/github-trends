import axios from 'axios';
import { getFilterDate } from './date';

// Setup axios base configuration
export const initializeAxios = () => {
  axios.defaults.baseURL = `https://api.github.com/search/`;
  axios.defaults.headers.common['Authorization'] = `Bearer ${
    import.meta.env.VITE_GITHUB_TOKEN
  }`;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

export const getRepos = async (page: number, language = '') => {
  const url = `repositories?q=created:>${getFilterDate()}+language:${language}&sort=stars&order=desc&per_page=10&page=${page}`;

  return axios.get(url);
};
