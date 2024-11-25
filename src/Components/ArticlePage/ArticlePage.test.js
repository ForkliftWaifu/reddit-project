import React from "react";
import {render, screen, waitFor, act} from '@testing-library/react'
import ArticlePage from "./ArticlePage";
import { fetchArticle } from "./ArticlePageSlice";
import { Provider } from "react-redux";
import store from "../../App/store";
import '@testing-library/jest-dom'

describe('ArticlePage', () => {
    beforeEach(() => {
        fetch.resetMocks();
    })
    it('Renders article data in elements based on the state of CurrentArticle', async () => {
        render(<Provider store={store}><ArticlePage /></Provider>);

        fetch.mockResponseOnce(JSON.stringify([{
            data: { 
                children: [{
                    data: {
                        title:'test',
                        author:'callum',
                        selftext: 'this is a test article'
                    }}],
            
                },
            }]));
        
        await act( async () => {
            await store.dispatch(fetchArticle('mock'))
        });

        const h1 = await screen.findByText(/^test$/i)
        const h2 = await screen.findByText(/\bcallum\b/i)
        const p = await screen.findByText(/this is a test article/i);

        waitFor(() => {
            expect(h1).toHaveTextContent('test');
            expect(h2).toHaveTextContent('callum');
            expect(p).toHaveTextContent('this is a test article')
        });
    });
})