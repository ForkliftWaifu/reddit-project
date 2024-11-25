import { fetchSearchData } from "./SearchArticleSlice";
import store from "../../App/store";

describe('fetchSearchData', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    afterEach(() => {
        fetch.resetMocks();
    })

    it('returns a javascript object when a json is fetched', async () => {
        
        fetch.mockResponseOnce(JSON.stringify({title: {}, data: {
                children: {
                    Hello: {},
                    Goodbye: {}
                },
            }
        }))

        
        await store.dispatch(fetchSearchData('mock'))

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual(`https://www.reddit.com/search.json?raw_json=1&q=mock`);

        const result =  store.getState().SearchArticles.articleData;

        expect(result).toEqual({
            Hello: {},
            Goodbye: {}
        });
    })
    it('sets failedToLoadData to true when the fetch request is rejected', async () => {
        
        fetch.mockReject();

        await store.dispatch(fetchSearchData());

        const failed = store.getState().SearchArticles.failedToLoadData;
        const loading = store.getState().SearchArticles.isLoadingData;
        
        expect(loading).toBe(false)
        expect(failed).toEqual(true);
    })
})