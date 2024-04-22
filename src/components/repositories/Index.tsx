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
  languageFilter?: string;
}

export const Repositories = ({
  showStarredRepos,
  languageFilter,
}: RepositoryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<IRepo[]>([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [emptyMessage, setEmptyMessage] = useState<string | undefined>();

  const handleError = (error: Error) => {
    console.error(error);
    setError(error.message);
  };

  // Fetch data on initial render
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await getRepos(1, languageFilter);

        if (!response?.data?.items.length) {
          setEmptyMessage('No trending repositories to show.');
          return;
        }

        const repos = response.data.items;
        setRepositories(repos);
        setPage((prevPage) => prevPage + 1);
        setEmptyMessage('');
      } catch (error) {
        handleError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!showStarredRepos) {
      getData();
    }
  }, [showStarredRepos, languageFilter]);

  // Fetch data on scroll down to the bottom of the list
  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await getRepos(page, languageFilter);

      if (!response?.data?.items.length) {
        setEmptyMessage('No more repositories to load.');
        return;
      }

      const repos = response.data.items;
      setRepositories((prevItems) => [...prevItems, ...repos]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, languageFilter]);

  // Add scroll event listener for infinte scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || Boolean(emptyMessage)) {
        return;
      }

      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      fetchData();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchData, isLoading, emptyMessage]);

  // Show starred repos on filter change
  useEffect(() => {
    if (!showStarredRepos) {
      return;
    }

    const starredRepos = localStorage.getItem('starred');
    if (!starredRepos) {
      setRepositories([]);
      setEmptyMessage('You have no starred repositories.');
      return;
    }

    const starredReposArray: IRepo[] = JSON.parse(starredRepos);
    if (!starredReposArray.length) {
      setEmptyMessage('You have no starred repositories.');
      setRepositories([]);
      return;
    }

    setRepositories(starredReposArray);
    setEmptyMessage('');
  }, [showStarredRepos]);

  return (
    <section className='py-1 '>
      <header>
        <h1>Repositories</h1>
      </header>
      <div className='repository-container'>
        {repositories.map((repository) => {
          return <Repository key={repository.id} {...repository} />;
        })}
        {isLoading && <Spinner />}
        {Boolean(emptyMessage) && !isLoading && <h4>{emptyMessage}</h4>}
        {error && <span className='error'>{error}</span>}
      </div>
    </section>
  );
};
