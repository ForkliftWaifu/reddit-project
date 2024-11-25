import React from 'react';
import {screen, render, act, waitFor} from '@testing-library/react';
import SearchArticle from './SearchArticle';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import store from '../../App/store';
import '@testing-library/jest-dom'

describe('SearchArticle', () => {
    it('Renders the props passed to the screen', () => {
        render(<Provider store={store}><SearchArticle title='Test Article' subreddit='Callum'/></Provider>);
        const name = screen.getByText(/Test Article/i);
        const author = screen.getByText(/Callum/i);

        expect(name).toBeInTheDocument();
        expect(author).toBeInTheDocument();
    }),
    it('Sets the current article when clicked', async () => {
        render(<Provider store={store}><SearchArticle title="Test" permalink={'123'} /></Provider>);

        await fetch.mockResponseOnce(JSON.stringify({name: 'hello'}));

        act(() => userEvent.click(screen.getByText(/test/i)));

        const result = store.getState().ArticlePage.currentArticle;

        waitFor(() => expect(result).toStrictEqual({name: 'hello'}));
    })
});