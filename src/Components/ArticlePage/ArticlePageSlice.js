import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticle = createAsyncThunk(
    'ArticlePage/fetchArticle',
    async (permalink, thunkAPI) => {
        try {
            let response = await fetch(`https://www.reddit.com${permalink}.json?raw_json=1`);
            let data = await response.json()
            return data[0].data.children[0].data
        } catch (err) {
            return err.data
        }

    }
)

const ArticlePageSlice = createSlice({
    name: 'ArticlePage',
    initialState: {
        currentArticle: '',
        isLoadingArticle: false,
        failedToLoadArticle: false,
        hasData: false
    },
    reducers: {
        clearArticleData (state) {
            state.currentArticle = '';
            state.isLoadingArticle = false;
            state.failedToLoadArticle = false;
            state.hasData = false;
        }
    },
    extraReducers: (builder) =>
        builder
        .addCase(fetchArticle.pending, (state) => {
            state.isLoadingArticle = true;
            state.failedToLoadArticle = false;
            state.hasData = false;
        })
        .addCase(fetchArticle.rejected, (state) => {
            state.isLoadingArticle = false;
            state.failedToLoadArticle = true;
            state.hasData = false;
        })
        .addCase(fetchArticle.fulfilled, (state, action) => {
            state.isLoadingArticle = false;
            state.failedToLoadArticle = false;
            state.hasData = true;
            state.currentArticle = action.payload;
        }),
    selectors: {
        selectCurrentArticle: (sliceState) => sliceState.currentArticle
    }
})

export default ArticlePageSlice.reducer

export const { selectCurrentArticle } = ArticlePageSlice.selectors

export const { clearArticleData } = ArticlePageSlice.actions

