import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors, Text } from "react-native-ui-lib";
import React, { useEffect, useState } from "react";
import {
	useInterstitialAd,
	useRewardedInterstitialAd,
} from "react-native-google-mobile-ads";

import { Image } from "expo-image";
import { useKeepAwake } from 'expo-keep-awake';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Loading = ({ navigation, route }) => {
	useKeepAwake();
	const { adType } = route.params;
	const Interstitial = useRewardedInterstitialAd(
		"ca-app-pub-1448615926129907/8346567377",
		{}
	);
	const Reward = useInterstitialAd("ca-app-pub-1448615926129907/6892940352", {});
	const state = useSelector((state) => state.Layout);
	const { t } = useTranslation();
	// Load and show the rewarded ad if adType is "rewarded" and the ad is loaded
	useEffect(() => {
		if (adType === "rewarded") {
			Reward.load();
			if (Reward.isLoaded) Reward.show();
		}
	}, [adType, Reward.isLoaded, Reward.show]);

	// Load the interstitial ad if adType is "interstitial"
	useEffect(() => {
		if (adType === "interstitial") {
			Interstitial.load();
		}
	}, [adType, Interstitial.load]);

	// Show the interstitial ad when it's loaded
	useEffect(() => {
		if (Interstitial.isLoaded) {
			Interstitial.show();
		}
	}, [Interstitial.isLoaded, Interstitial.show]);

	useEffect(() => {
		if (!state.isLoading && (Interstitial.isClosed || Reward.isClosed)) {
			try {
				navigation.replace(state.LoadingFallback, {
					data: state.LoadingParams,
				});
			} catch (error) {
				navigation.navigate(state.LoadingFallback, {
					data: state.LoadingParams,
				});
			}
		}
	}, [state, Interstitial.isClosed, Reward.isClosed]);

	return (
		<View style={styles.container}>
			<Image
				source={require("../../../assets/icons/Loading.svg")}
				style={{ width: 250, height: 250 }}
			/>
			<Text center white text50>
				{t("loading_text")}
			</Text>
			<Text center grey20>
				{t("loading_describe")}
			</Text>
			<ActivityIndicator size='large' color={Colors.white} />
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.black,
		justifyContent: "center",
		alignItems: "center",
	},
});
