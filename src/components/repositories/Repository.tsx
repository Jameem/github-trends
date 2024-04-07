import { FaGithub } from 'react-icons/fa';

export const Repository = () => {
  return (
    <article className='repository px-1'>
      <header className='repository__header'>
        <h4>Name</h4>
      </header>
      <small> description goes here</small>
      <div className='repository__footer'>
        <a
          href='www.google.com'
          target='_blank'
          className='repository__footer__link'
        >
          <FaGithub />
          <small>View on Github</small>
        </a>
        <span>10 Stars</span>
      </div>
    </article>
  );
};
