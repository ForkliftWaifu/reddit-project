import React from 'react';
import { selectCurrentArticle } from './ArticlePageSlice';
import { useSelector } from 'react-redux';



export default function ArticlePage() {
    const selector = useSelector;

    const currentArticle = selector(selectCurrentArticle)

    

    return ( 
        <div>
            <h1>{currentArticle.title}</h1>
            <h2>{currentArticle.author}</h2>
            { currentArticle.selftext && <p>{currentArticle.selftext}</p> }
            { currentArticle.post_hint === 'image' && <img src={currentArticle['url_overridden_by_dest']} />}
            { currentArticle.post_hint === 'hosted:video' && <video width="80%" height="auto" autoplay controls><source src={currentArticle.media['reddit_video']['fallback_url']} typeOf="video"/></video>}
        </div>
    )
}

