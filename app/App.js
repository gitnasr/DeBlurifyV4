import "react-native-gesture-handler";
import "./src/config/I8";
import "expo-dev-client";
import "intl-pluralrules";

import * as firebase from "@react-native-firebase/app";

import { QueryClient, QueryClientProvider } from "react-query";

import { Provider } from "react-redux";
import Screens from "./src/screens";
import { Theme } from "./src/config/Style";
import Toast from "react-native-toast-message";
import { store } from "./src/redux/store";
import { changeLanguage } from "i18next";
import i18n from "./src/config/I8";
import { useEffect } from "react";
import { getLocales } from "expo-localization";

const queryClient = new QueryClient();
const firebaseConfig = {
	apiKey: "AIzaSyCHYDIxjL7d_TXVcQzwAN_grw7vNjqXCm0",
	authDomain: "deblurify-15a37.firebaseapp.com",
	databaseURL: "https://deblurify-15a37.firebaseio.com",
	projectId: "deblurify-15a37",
	storageBucket: "deblurify-15a37.appspot.com",
	appId: "1:180521368214:android:bfd64cbe29b12d96a320b7",
	messagingSenderId: "180521368214",
};
if (firebase.getApps().length == 0) {
	firebase.initializeApp(firebaseConfig);
}

Theme();
export default function App() {
	useEffect(() => {
	(async () => {
			const newDefaultLang = getLocales()[0].languageCode;
			i18n.locale = newDefaultLang;
			changeLanguage(newDefaultLang);
		})();
	},[])

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Screens />
			</QueryClientProvider>
			<Toast />
		</Provider>
	);
}
