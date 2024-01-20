import {
	applyMiddleware,
	configureStore,
	createSelector,
} from "@reduxjs/toolkit";

import { ConfigSlice } from "./reducers/Config.Reducer";
import LayoutSlice from "./reducers/Layout.Reducer";

export const store = configureStore({
	reducer: {
		Layout: LayoutSlice,
		Config: ConfigSlice,
	},
});
