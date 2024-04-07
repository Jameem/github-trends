import { useCallback, useEffect, useState } from 'react';
import { Repository } from './Repository';
import { Spinner } from '../Spinner';
import { getRepos } from '../../utils/api';

interface IRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: string;
  language?: string;
}

interface RepositoryProps {
  showStarredRepos: boolean;
}

export const Repositories = ({ showStarredRepos }: RepositoryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<IRepo[]>([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleError = (error: Error) => {
    console.error(error);
    setIsLoading(false);
    setError(error.message);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await getRepos(1);

        if (!response?.data?.items.length) {
          setIsEmpty(true);
          return;
        }

        const repos = response.data.items;
        setRepositories(repos);
        setIsLoading(false);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        handleError(error as Error);
      }

      setIsLoading(false);
    };

    if (!showStarredRepos) {
      getData();
      return;
    }
  }, [showStarredRepos]);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await getRepos(page);

      if (!response?.data?.items.length) {
        setIsEmpty(true);
        return;
      }

      const repos = response.data.items;
      setRepositories((prevItems) => [...prevItems, ...repos]);
      setIsLoading(false);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      handleError(error as Error);
    }

    setIsLoading(false);
  }, [isLoading, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoading
      ) {
        return;
      }
      fetchData();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchData, isLoading]);

  useEffect(() => {
    if (!showStarredRepos) {
      return;
    }

    const starredRepos = localStorage.getItem('starred');
    if (!starredRepos) {
      return;
    }

    const starredReposArray = JSON.parse(starredRepos);

    console.log('starredReposArray', starredReposArray);

    setRepositories(starredReposArray);
  }, [showStarredRepos]);

  return (
    <section className='py-1 '>
      <header>
        <h1>Repositories</h1>
      </header>
      <div className='repository-container'>
        {repositories.map(
          ({ name, stargazers_count, description, html_url, language, id }) => {
            return (
              <Repository
                key={id}
                name={name}
                description={description}
                html_url={html_url}
                stargazers_count={stargazers_count}
                language={language}
                id={id}
              />
            );
          }
        )}
        {isLoading && <Spinner />}
        {isEmpty && <small>No more data to load.</small>}
        {error && <span className='error'>{error}</span>}
      </div>
    </section>
  );
};
