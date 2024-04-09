import { render, screen } from '@testing-library/react';
import { Repository } from '../Repository';

test('Repository renders successfully', () => {
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
  render(<Repository {...props} />);

  const name = screen.getByTestId('name');
  const description = screen.getByTestId('description');
  const footer = screen.getByTestId('footer');

  // Then
  expect(name).toBeInTheDocument();
  expect(name).toHaveTextContent(props.name);

  expect(description).toBeInTheDocument();
  expect(description).toHaveTextContent(props.description);

  expect(footer).toBeInTheDocument();
  expect(footer).toHaveTextContent(props.language);
  expect(footer).toHaveTextContent(props.stargazers_count);
});
