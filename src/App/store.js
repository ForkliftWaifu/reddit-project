import { configureStore } from "@reduxjs/toolkit";
import SearchArticleSlice from '../Features/SearchArticle/SearchArticleSlice';
import SearchBarSlice from "../Components/SearchPage/SearchBar/SearchBarSlice";
import ArticlePageSlice from "../Components/ArticlePage/ArticlePageSlice";

const store = configureStore({
    reducer: {
        SearchArticles: SearchArticleSlice,
        SearchBar: SearchBarSlice,
        ArticlePage: ArticlePageSlice,
    }
});

export default store
