import { useState } from 'react';
import { Filter } from './filter/Index';
import { Navbar } from './Navbar';
import { Repositories } from './repositories/Index';
import { SelectOption } from './filter/Select';

export const AppContainer = () => {
  const [showStarredRepos, setShowStarredRepos] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<
    string | undefined
  >();

  // Set language filter on change
  const onChangeLanguageFilter = (option: SelectOption | null) => {
    setSelectedLanguage(option?.value);
  };

  return (
    <main className='container px-1'>
      <Navbar />
      <Filter
        onChangeShowStarredRepo={() => setShowStarredRepos(!showStarredRepos)}
        onChangeLanguage={(option) => onChangeLanguageFilter(option)}
      />
      <Repositories
        showStarredRepos={showStarredRepos}
        languageFilter={selectedLanguage}
      />
    </main>
  );
};
