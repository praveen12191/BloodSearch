import { createSlice } from "@reduxjs/toolkit";
import { group } from "../../constant/group";
import { state } from "../../constant/state";

export const dropdownSlice = createSlice({
    name: "drowpdown",
    initialState: {
        group:
            group,
        stateList: state
    },
    reducers: {
        setGroup: (state, action) => {
            state.group.push(action.payload);
        },
        setSate: (state, action) => {
            state.stateList.push(action.payload);
        }

    },
})


export const { setGroup, setSate } = dropdownSlice.actions;

export default dropdownSlice.reducer;