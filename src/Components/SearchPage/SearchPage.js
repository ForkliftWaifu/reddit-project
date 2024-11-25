import React from "react";
import { useSelector } from "react-redux";
import SearchArticle from "../../Features/SearchArticle/SearchArticle";
import { selectArticles } from "../../Features/SearchArticle/SearchArticleSlice";
import SearchBar from "./SearchBar/SearchBar";

export default function SearchPage() {

    
    const searchList = useSelector(selectArticles);

    return (
        <div>
            <SearchBar />
            {searchList && searchList.map((article) => <SearchArticle title={article.data.title} subreddit={article.data.subreddit} key={article.data.url} permalink={article.data.permalink}/>) }
        </div>
    )
}
