import { Colors, Text, View } from "react-native-ui-lib";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { QueryClient, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { ActivityIndicator } from "react-native";
import Details from "./MainStack/Details";
import Home from "./MainStack/Home";
import { Image } from "expo-image";
import ImageInfo from "./MainStack/Info";
import { Ionicons } from "@expo/vector-icons";
import Landing from "./AuthStack/Landing";
import Loading from "./MainStack/Loading";
import { NavigationContainer } from "@react-navigation/native";
import OTPScreen from "./AuthStack/OTP";
import Phone from "./AuthStack/Phone";
import Result from "./MainStack/Result";
import Settings from "./MainStack/Settings";
import { StatusBar } from "expo-status-bar";
import analytics from "@react-native-firebase/analytics";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { getMyToken } from "../services/API";
import { setLogged } from "../redux/reducers/Layout.Reducer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ScreenOptions = {
	headerShown: false,
	animationTypeForReplace: "pop",
};
const Tabs = () => {
	const tabOptions = (route) => {
		const options = {
			headerShown: false,
			tabBarStyle: {
				padding: 0,
				backgroundColor: Colors.grey1,
				borderTopWidth: 0,
			},
			tabBarActiveBackgroundColor: Colors.dark,
			tabBarInactiveBackgroundColor: Colors.grey1,
			tabBarActiveTintColor: Colors.grey60,
			tabBarInactiveTintColor: Colors.grey20,
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;

				if (route.name === "Home") {
					iconName = focused ? "home" : "home-outline";
				} else if (route.name === "Settings") {
					iconName = focused ? "settings" : "settings-outline";
				}

				// You can return any component that you like here!
				return <Ionicons name={iconName} size={size} color={color} />;
			},
			tabBarShowLabel: false,
		};
		return options;
	};

	return (
		<Tab.Navigator screenOptions={({ route }) => tabOptions(route)}>
			<Tab.Screen name='Home' component={Home} options={ScreenOptions} />
			<Tab.Screen
				name='Settings'
				component={Settings}
				options={ScreenOptions}
				i18nIsDynamicList={true}
			/>
		</Tab.Navigator>
	);
};

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={ScreenOptions}>
			<Stack.Screen name='Landing' component={Landing} />
			<Stack.Screen name='Phone' component={Phone} />
			<Stack.Screen name='OTP' component={OTPScreen} />
		</Stack.Navigator>
	);
};

const Screens = () => {
	
	const Connection = useNetInfo()

	const routeNameRef = useRef();
	const navigationRef = useRef();

	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	const { data, isLoading, error } = useQuery({
		queryKey: ["token"],
		queryFn: async () => {
			const token = await getMyToken();
			if (!token) {
				return null;
			}
			dispatch(setLogged(true));
			return token;
		},
	});
	if (isLoading) {
		return (
			<View flex center backgroundColor={Colors.black}>
				<ActivityIndicator size='large' color={Colors.white} />
			</View>
		);
	}


	if (!Connection.isConnected &&!Connection.isInternetReachable) {
		return (
			<View flex center backgroundColor={Colors.black}>
				<Image style={{width:190,height:190,borderRadius:10}} source={require("../../assets/icons/No.Connection.svg")} />
				<Text center white text50>No Internet Connection</Text>
				<Text center grey20>Our App Relies on internet connection Please make sure you're connected to the internet.</Text>
			</View>
		)
	}
	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				routeNameRef.current = navigationRef.current.getCurrentRoute().name;
			}}
			onStateChange={async () => {
				const previousRouteName = routeNameRef.current;
				const currentRouteName = navigationRef.current.getCurrentRoute().name;

				if (previousRouteName !== currentRouteName) {
					await analytics().logScreenView({
						screen_name: currentRouteName,
						screen_class: currentRouteName,
					});
				}
				routeNameRef.current = currentRouteName;
			}}>
			<StatusBar style='light' />
			{state.Layout.isLogged ? (
				<Stack.Navigator screenOptions={ScreenOptions}>
					<Stack.Screen name='Tabs' component={Tabs} />
					<Stack.Screen name='Details' component={Details} />
					<Stack.Screen name='Info' component={ImageInfo} />
					<Stack.Screen name='Result' component={Result} />
					<Stack.Screen name='Loading' component={Loading} />
				</Stack.Navigator>
			) : (
				<AuthStack />
			)}
		</NavigationContainer>
	);
};

export default Screens;
