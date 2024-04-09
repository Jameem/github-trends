import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

interface StarProps {
  id: number;
  name: string;
  description?: string;
  html_url: string;
  language?: string;
  stargazers_count?: string;
}

// Check whether a repository is already starred
const isStarredRepo = (repoId: number) => {
  const starredRepos = localStorage.getItem('starred');
  if (!starredRepos) {
    return false;
  }

  const starredReposArray: StarProps[] = JSON.parse(starredRepos);
  return starredReposArray.find((repo) => repo.id === repoId);
};

export const Star = (props: StarProps) => {
  const { id } = props;
  const [starred, setStarred] = useState(isStarredRepo(id));

  const onClick = () => {
    const starredRepos = localStorage.getItem('starred');

    // Set the localstorage array if it isn't already and add the repo
    if (!starredRepos) {
      localStorage.setItem('starred', JSON.stringify([props]));
      setStarred(true);
      return;
    }

    // Add the repo to the existing localstorage array
    const starredReposArray: StarProps[] = JSON.parse(starredRepos);
    if (!isStarredRepo(id)) {
      localStorage.setItem(
        'starred',
        JSON.stringify([...starredReposArray, { ...props }])
      );
      setStarred(true);
      return;
    }

    // Remove the repo from the array when user clicks again
    const refinedArray = starredReposArray.filter((repo) => repo.id !== id);
    localStorage.setItem('starred', JSON.stringify(refinedArray));
    setStarred(false);
  };

  return (
    <div className='repository__header__star' data-testid='star'>
      {starred ? (
        <FaStar
          color='#c5a455'
          onClick={onClick}
          data-testid='starred'
          size={20}
        />
      ) : (
        <FaRegStar
          color='#c5a455'
          onClick={onClick}
          data-testid='not-starred'
          size={20}
        />
      )}
    </div>
  );
};
