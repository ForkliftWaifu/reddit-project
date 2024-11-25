import '@testing-library/jest-dom'
import React, {act} from 'react'
import {render, screen, waitFor } from '@testing-library/react'
import SearchPage from './SearchPage'
import { fetchSearchData } from '../../Features/SearchArticle/SearchArticleSlice'
import { Provider } from 'react-redux'
import store from '../../App/store'

describe('SearchPage', () => {
    beforeEach(() => {
        fetch.resetMocks();
    })
    it('contains a div with each article stored in SearchArticleSlice', async () => {
        render(<Provider store={store}><SearchPage /></Provider>)

        fetch.mockResponseOnce(JSON.stringify(
            { data: {
                children: [{
                    data: {
                        title: 'test1',
                        subreddit: 'subtest1',
                        url: '111'
                    }
                },
                {   data: {
                        title: 'test2',
                        subreddit: 'subtest2',
                        url: '112'
                    }
                },
                {
                    data: {
                        title: 'test3',
                        subreddit: 'subtest3',
                        url: '113'
                    }
                }]
            }})
        );

        await act(async() => {await store.dispatch(fetchSearchData('mock'))})

        const test1 = await screen.findByText(/\btest1\b/i);
        const subtest2 = await screen.findByText(/\bsubtest2\b/i);

        waitFor(() => {
            expect(test1).toBeInTheDocument();
            expect(subtest2).toBeInTheDocument();
            expect(test1).toHaveTextContent(/\btest1\b/i)
            expect(subtest2).toHaveTextContent(/\bsubtest2\b/i)
        })
    })
})