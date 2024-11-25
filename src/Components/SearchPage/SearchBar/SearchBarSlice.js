import { createSlice } from '@reduxjs/toolkit';

const SearchBarSlice = createSlice({
    name: "SearchBar",
    initialState: {
        value: ""
    },
    reducers: {
        setValue(state, action) {
            state.value = action.payload;
        },
        clearValue(state) {
            state.value = ""
        }
    },
    selectors: {
        selectValue: (sliceState) => sliceState.value
    },
})

export default SearchBarSlice.reducer

export const {selectValue} = SearchBarSlice.selectors

export const {setValue, clearValue} = SearchBarSlice.actions