import React from "react";
import {useDispatch} from 'react-redux'
import { fetchArticle } from "../../Components/ArticlePage/ArticlePageSlice";

export default function SearchArticle(props) {
    const {title, subreddit, permalink} = props;

    const dispatch = useDispatch()

    function handleClick(e) {
        e.preventDefault();
        dispatch(fetchArticle(permalink))
    }


    return (
        <div>
            <h1 style={{cursor: "pointer"}} onClick={handleClick}>{title}</h1>
            <h2>{subreddit}</h2>
        </div>
    )
}