import { FaGithub } from 'react-icons/fa';

interface FooterProps {
  githubUrl: string;
  language?: string;
  stargazers_count?: string;
}

export const Footer = ({
  language,
  githubUrl,
  stargazers_count,
}: FooterProps) => {
  return (
    <div className='repository__footer' data-testid='footer'>
      <div className='repository__footer__language-container'>
        {language && (
          <div>
            <small
              className='repository__footer__language'
              data-testid='language'
            >
              {language}
            </small>
          </div>
        )}
        <a
          href={githubUrl}
          target='_blank'
          className='repository__footer__link'
          data-testid='github-link'
        >
          <FaGithub />
          <small>View on Github</small>
        </a>
      </div>
      {stargazers_count && (
        <small className='repository__footer__stars' data-testid='stars-count'>
          {stargazers_count} Stars
        </small>
      )}
    </div>
  );
};
