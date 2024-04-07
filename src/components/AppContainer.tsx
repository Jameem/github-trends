import { useState } from 'react';
import { Filter } from './FIlter';
import { Navbar } from './Navbar';
import { Repositories } from './repositories/Index';

export const AppContainer = () => {
  const [showStarredRepos, setShowStarredRepos] = useState(false);

  return (
    <main className='container px-1'>
      <Navbar />
      <Filter
        onChangeShowStarredRepo={() => setShowStarredRepos(!showStarredRepos)}
      />
      <Repositories showStarredRepos={showStarredRepos} />
    </main>
  );
};
