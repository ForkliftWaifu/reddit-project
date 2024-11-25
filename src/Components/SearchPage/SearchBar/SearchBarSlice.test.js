import store from "../../../App/store";
import { setValue, clearValue } from "./SearchBarSlice";

describe("SearchBarSlice", () => {
    it('Has an initial state of an empty string for the value key', () => {
        const value = store.getState().SearchBar.value;
        expect(value).toBe("");
    }),
    it('Sets the value correctly when setValue is dispatched', () => {
        store.dispatch(setValue("Test"));

        const result = store.getState().SearchBar.value;

        expect(result).toBe("Test");
    }),
    it('Removes the value correctly when clearValue is dispatched', () => {
        store.dispatch(clearValue());

        const result = store.getState().SearchBar.value;

        expect(result).toBe("");
    }) 
})