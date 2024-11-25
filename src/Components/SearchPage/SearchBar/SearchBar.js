import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectValue, setValue, clearValue } from './SearchBarSlice';
import { fetchSearchData } from '../../../Features/SearchArticle/SearchArticleSlice';

export default function SearchBar() {

    const selector = useSelector;
    const dispatch = useDispatch();
    const value = selector(selectValue)

    function handleChange(e) {
        e.preventDefault()
        dispatch(setValue(e.target.value))

    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(fetchSearchData(value));
        dispatch(clearValue())
    }

    return (
        <form onSubmit = {handleSubmit}>
            <label htmlFor="searchinput">Search:</label>
            <input type="text" name="searchinput" id="searchinput" value={value} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    )
}