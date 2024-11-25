import { fetchArticle, clearArticleData } from './ArticlePageSlice';
import store from '../../App/store';

describe('ArticlePageSlice', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    afterEach(() => {
        fetch.resetMocks();
    })

    it('Sets the current article to the value given when fetchArticle is dispatched', async () => {

        fetch.mockResponseOnce(JSON.stringify([{
            data: { 
                children: [{
                    data: {
                        title:'test',
                        author:'callum',
                        selftext: 'this is a test article'
                    }}],
            
                },
            }])),
        
        
        await store.dispatch(fetchArticle('mock'));

        const result = store.getState().ArticlePage.currentArticle;

        expect(result).toEqual({
            title:'test',
            author:'callum',
            selftext: 'this is a test article'
        });
    }),
    it('Clears the current article when clearCurrentArticle is dispatched', () => {
        store.dispatch(clearArticleData());

        const result = store.getState().ArticlePage.currentArticle;

        expect(result).toEqual('');
    })
})