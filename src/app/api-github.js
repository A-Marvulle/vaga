import axios from 'axios';

const apiGithub = axios.create({
  baseURL: 'https://api.github.com',
});

export const searchRepositories = async (query) => {
  try {
    const response = await apiGithub.get(`/search/repositories?q=${query}`);
    return response.data.items;
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    throw error;
  }
};

export default apiGithub;
