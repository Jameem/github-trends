import axios from 'axios';
import { getDate } from './date';

export const initializeAxios = () => {
  axios.defaults.baseURL = `https://api.github.com/search/`;
  axios.defaults.headers.common['Authorization'] = `Bearer ${
    import.meta.env.VITE_GITHUB_TOKEN
  }`;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

export const getRepos = async (page: number) => {
  return axios.get(
    `repositories?q=created:>${getDate()}&sort=stars&order=desc&per_page=10&page=${page}`
  );
};
