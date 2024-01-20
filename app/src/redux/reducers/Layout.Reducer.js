import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogged: false,
	number: null,
	otp: null,
	bindDialog: false,
	bindOTP: false,
	isLoading: false,
	LoadingFallback:"Home",
	LoadingParams:{}
};

//State slice
export const LayoutSlice = createSlice({
	name: "Layout",
	initialState,
	reducers: {
		setLogged: (state, action) => {
			state.isLogged = action.payload;
		},
		setNumber: (state, action) => {
			state.number = action.payload;
		},
		setOtp: (state, action) => {
			state.otp = action.payload;
		},
		setBindDialog: (state, action) => {
			state.bindDialog = action.payload;
		},
		setBindOTP: (state, action) => {
			state.bindOTP = action.payload;
		},
		resetLayout: (state) => {
			state.number = null;
			state.otp = null;
			state.bindDialog = false;
			state.bindOTP = false;
			state.isLoading = false;
			state.LoadingFallback = "Home";
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload.status;
			state.LoadingFallback = action.payload.fallback;
			state.LoadingParams = action.payload.params;

		},
	},
});
const { reducer, actions } = LayoutSlice;


export const {resetLayout, setLogged, setNumber, setOtp, setBindDialog,setBindOTP,setLoading } = actions;

export default reducer;
