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
    <div className='repository__footer'>
      <div className='repository__footer__language-container'>
        {language && <small>{language}</small>}
        <a
          href={githubUrl}
          target='_blank'
          className='repository__footer__link'
        >
          <FaGithub />
          <small>View on Github</small>
        </a>
      </div>
      {stargazers_count && <small>{stargazers_count} Stars</small>}
    </div>
  );
};
