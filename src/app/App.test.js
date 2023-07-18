/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, render, fireEvent, screen } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve([
          { _id: '1', title: 'Post 1', content: 'Content 1' },
          { _id: '2', title: 'Post 2', content: 'Content 2' },
        ]),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderApp = async () =>
    await act(async () => {
      render(<App />);
    });

  it('renders the app with a header', async () => {
    await renderApp();

    await screen.findByRole('heading', {
      name: 'HackerRank app is running!',
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('renders a form to create a new post', async () => {
    await renderApp();

    await screen.findByRole('button', { name: 'Create Post' });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('renders a list of posts', async () => {
    await renderApp();

    await screen.findByText('Post 1');
    await screen.findByText('Post 2');

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('creates a new post when the form is submitted', async () => {
    await act(async () => {
      render(<App />);
    });

    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          _id: '3',
          title: 'New Post Title',
          content: 'New Post Content',
        }),
    });

    const titleInput = screen.getByRole('textbox', { name: 'Title:' });
    const contentInput = screen.getByRole('textbox', { name: 'Content:' });
    const createButton = screen.getByRole('button', { name: 'Create Post' });

    fireEvent.change(titleInput, { target: { value: 'New Post Title' } });
    fireEvent.change(contentInput, { target: { value: 'New Post Content' } });

    await act(async () => fireEvent.click(createButton));

    await screen.findByText('Post 1');
    await screen.findByText('Post 2');
    await screen.findByText('New Post Title');

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
