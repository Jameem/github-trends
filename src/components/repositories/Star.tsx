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

const isStarredRepo = (repoId: number) => {
  const starredRepos = localStorage.getItem('starred');
  if (!starredRepos) {
    return false;
  }

  const starredReposArray: StarProps[] = JSON.parse(starredRepos);
  return starredReposArray.find((repo) => repo.id === repoId);
};

export const Star = (props: StarProps) => {
  const [starred, setStarred] = useState(isStarredRepo(props.id));

  const onClick = () => {
    const starredRepos = localStorage.getItem('starred');
    if (!starredRepos) {
      localStorage.setItem('starred', JSON.stringify([props]));
      setStarred(true);
      return;
    }

    const starredReposArray: StarProps[] = JSON.parse(starredRepos);
    if (!isStarredRepo(props.id)) {
      localStorage.setItem(
        'starred',
        JSON.stringify([...starredReposArray, { ...props }])
      );
      setStarred(true);
      return;
    }

    const refinedArray = starredReposArray.filter((repo) => {
      return repo.id !== props.id;
    });
    localStorage.setItem('starred', JSON.stringify(refinedArray));
    setStarred(false);
  };
  return (
    <div className='repository__header__star'>
      {starred ? (
        <FaStar color='#c5a455' onClick={onClick} />
      ) : (
        <FaRegStar color='#c5a455' onClick={onClick} />
      )}
    </div>
  );
};
