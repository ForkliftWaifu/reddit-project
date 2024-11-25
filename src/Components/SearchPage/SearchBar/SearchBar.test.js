import React, {act} from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../../App/store';
import '@testing-library/jest-dom'
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    beforeEach(() => {
        fetch.resetMocks();
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    it('renders jsx with the correct roles', () => {
        render(<Provider store={store}><SearchBar /></Provider>);
        const label = screen.getByText(/search:/i);
        const textbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        expect(label).toBeInTheDocument();
        expect(textbox).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    }),
    it('updates the value of the state when the user types in the textbox', async () => {
        render(<Provider store={store}><SearchBar /></Provider>);

        const textbox = screen.getByRole('textbox');
        
        act(() => {userEvent.type(textbox, 'Test')});
        
        waitFor(() => expect(store.getState().SearchBar.value).toBe('Test'));

    }),
    it('dispatches the value to the SearchArticleSlice when the submit button is clicked', async () => {
        render(<Provider store={store}><SearchBar /></Provider>);

        const button = screen.getByRole('button')

        fetch.mockResponseOnce(JSON.stringify({title: {}, data: {
                children: {
                    Hello: {},
                    Goodbye: {}
                },
            }
        }))


        act(() => {fireEvent.submit(button)});
        
        waitFor(() => {expect(store.getState().SearchArticles.articleData).toBe({
            Hello: {},
            Goodbye: {}
        })});

        waitFor(() => {expect(store.getState().SearchBar.value).toBe('')});
        
    });
});