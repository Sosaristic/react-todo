import { createSlice } from "@reduxjs/toolkit";
const mySlice = createSlice({
    name: "value",
    initialState: {
        test: 0,
    },
    reducers: {
        addValue(state, action) {
            return {
                ...state,
                test: state.test + 1,
            };
        },
        subValue(state, action) {
            return {
                ...state,
                test: state.test - 1,
            };
        },
    },
});
export const testActions = mySlice.actions;
export default mySlice;