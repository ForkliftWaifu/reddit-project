import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchData = createAsyncThunk(
    'searchArticles/fetchSearchData',
    async (searchTerm, thunkAPI) => {
        try {
            
            let response = await fetch(`https://www.reddit.com/search.json?raw_json=1&q=${searchTerm}`)
            let json = await response.json()
            return json.data.children;
        } catch(err) {
            return err.data
    }
})


const SearchArticleSlice = createSlice({
    name: 'SearchArticles',
    initialState: {
        isLoadingData: false,
        failedToLoadData: false,
        articleData: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSearchData.pending, (state) => {
            state.isLoadingData = true;
            state.failedToLoadData = false;
        })
        .addCase(fetchSearchData.rejected, (state) => {
            state.isLoadingData = false;
            state.failedToLoadData = true;
        })
        .addCase(fetchSearchData.fulfilled, (state, action) => {
            state.isLoadingData = false;
            state.failedToLoadData = false; 
            state.articleData = action.payload;
        })
    },
    selectors: {
        selectArticles: (sliceState) => sliceState.articleData
    }
})

export const {selectArticles} = SearchArticleSlice.selectors;

export default SearchArticleSlice.reducer;