'use client'
import Header from './components/Header';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import SkeletonLoading from './components/SkeletonLoading';
import apiGithub, { searchRepositories } from './api-github';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
    name?: string;
  };
}

const perPage = 10;

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('C');

  const fetchUserDetails = async (username: string) => {
    try {
      const response = await apiGithub.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;

      const repositories = await searchRepositories(searchQuery);

      for (const repo of repositories) {
        const userDetails = await fetchUserDetails(repo.owner.login);
        repo.owner.name = userDetails.name;
      }

      setSearchResults(repositories.slice(startIndex, endIndex));
    } catch (error) {
      console.error('Erro na pesquisa:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchData();
  }, [page, searchQuery]);

  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <SkeletonLoading />
      ) : (
        searchResults.map((repository) => (
          <ResultCard key={repository.id} repository={repository} />
        ))
      )}
      <div className='container'>
        <button
          className='anterior'
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <span>{` Página ${page} `}</span>

        <button
          className='proximo'
          disabled={searchResults.length < perPage}
          onClick={() => handlePageChange(page + 1)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  );
};

export default Home;
