import axios from 'axios';
import { getDate } from './date';

// Setup axios base configuration
export const initializeAxios = () => {
  axios.defaults.baseURL = `https://api.github.com/search/`;
  axios.defaults.headers.common['Authorization'] = `Bearer ${
    import.meta.env.VITE_GITHUB_TOKEN
  }`;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

export const getRepos = async (page: number, language?: string) => {
  const url = `repositories?q=created:>${getDate()}&sort=stars&order=desc&per_page=10&page=${page}`;

  if (!language) {
    return axios.get(url);
  }
  return axios.get(`${url}&q=language:${language}`);
};
