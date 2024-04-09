import { fireEvent, render, screen } from '@testing-library/react';
import { Star } from '../Star';

test('Star renders successfully', () => {
  //Given
  const props = {
    id: 1,
    name: 'test repo',
    description: 'test description',
    html_url: 'https://github.com/',
    language: 'TypeScript',
    stargazers_count: '100',
  };

  // When
  render(<Star {...props} />);

  const element = screen.getByTestId('not-starred');

  // Then
  expect(element).toBeInTheDocument();
});

test('Can un-star a repository', () => {
  //Given
  const props = {
    id: 1,
    name: 'test repo',
    description: 'test description',
    html_url: 'https://github.com/',
    language: 'TypeScript',
    stargazers_count: '100',
  };

  // When
  render(<Star {...props} />);

  const element = screen.getByTestId('not-starred');
  fireEvent.click(element);

  const starredElement = screen.getByTestId('starred');
  fireEvent.click(starredElement);

  // Then
  expect(screen.getByTestId('not-starred')).toBeInTheDocument();
});

test('Can star a repository ', () => {
  //Given
  const props = {
    id: 1,
    name: 'test repo',
    description: 'test description',
    html_url: 'https://github.com/',
    language: 'TypeScript',
    stargazers_count: '100',
  };

  // When
  render(<Star {...props} />);

  const notStarredElement = screen.getByTestId('not-starred');
  fireEvent.click(notStarredElement);

  // Then
  expect(screen.getByTestId('starred')).toBeInTheDocument();
});
