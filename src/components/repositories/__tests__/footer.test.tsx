import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

test('Footer renders successfully', () => {
  //Given
  const props = {
    githubUrl: 'https://github.com/',
    language: 'TypeScript',
    stargazers_count: '100',
  };

  // When
  render(<Footer {...props} />);

  const language = screen.getByTestId('language');
  const githubLink = screen.getByTestId('github-link');
  const starsCount = screen.getByTestId('stars-count');

  // Then
  expect(language).toBeInTheDocument();
  expect(language).toHaveTextContent(props.language);

  expect(githubLink).toBeInTheDocument();
  expect(githubLink).toHaveAttribute('href', props.githubUrl);

  expect(starsCount).toBeInTheDocument();
  expect(starsCount).toHaveTextContent(`${props.stargazers_count} Stars`);
});

test('Footer does not render language element if prop not provided', () => {
  //Given
  const props = {
    githubUrl: 'https://github.com/',
  };

  // When
  render(<Footer {...props} />);
  const element = screen.queryByTestId('language');

  // Then
  expect(element).not.toBeInTheDocument();
});

test('Footer does not render stars count element if prop not provided', () => {
  //Given
  const props = {
    githubUrl: 'https://github.com/',
  };

  // When
  render(<Footer {...props} />);
  const element = screen.queryByTestId('stars-count');

  // Then
  expect(element).not.toBeInTheDocument();
});
