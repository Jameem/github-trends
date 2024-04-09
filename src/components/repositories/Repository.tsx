import { Star } from './Star';
import { Footer } from './Footer';

interface RepositoryProps {
  id: number;
  name: string;
  description?: string;
  html_url: string;
  language?: string;
  stargazers_count?: string;
}

export const Repository = (props: RepositoryProps) => {
  const { name, description, language, html_url, stargazers_count } = props;
  return (
    <article className='repository px-1'>
      <header className='repository__header'>
        <span className='repository__header__name' data-testid='name'>
          {name}
        </span>
        <Star {...props} />
      </header>
      {description && (
        <div className='repository__description' data-testid='description'>
          <small> {description}</small>
        </div>
      )}
      <Footer
        language={language}
        githubUrl={html_url}
        stargazers_count={stargazers_count}
      />
    </article>
  );
};
