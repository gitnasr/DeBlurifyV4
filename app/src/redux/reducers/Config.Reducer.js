import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AdsIds: [],
    isAdsAllowed:true,

}

export const ConfigSlice = createSlice({
    name: "Config",
    initialState,
    reducers: {
        setAdsIds: (state, action) => {
            state.AdsIds = action.payload;
        },
        setAdsAllowed: (state, action) => {
            state.isAdsAllowed = action.payload;
        },
    },
});


const { reducer, actions } = ConfigSlice;

export const { setAdsIds, setAdsAllowed } = actions;

export default reducer;