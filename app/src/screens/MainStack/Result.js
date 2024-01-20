import * as MediaLibrary from "expo-media-library";

import {
	BannerAd,
	BannerAdSize,
	useInterstitialAd,
} from "react-native-google-mobile-ads";
import {
	Button,
	Colors,
	Dialog,
	PanningProvider,
	Text,
	View,
} from "react-native-ui-lib";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	useWindowDimensions,
} from "react-native";
import { rateImage, rateResult } from "../../services/API";
import { useEffect, useState } from "react";

import Header from "../../componentes/Layout/Header";
import { ImageController } from "../../services/Picker";
import { Ionicons } from "@expo/vector-icons";
import LogoHeader from "../../componentes/Layout/HeaderLogo";
import MView from "../../componentes/Layout/MView";
import StarRating from "react-native-star-rating-widget";
import Toast from "react-native-toast-message";
import useAppConfig from "../../hooks/useAppConfig";

const Result = ({ navigation, route }) => {
	const data = route.params.data.image;
	const [rating, setRating] = useState(data.Rating);
	const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
	const Reward = useInterstitialAd("ca-app-pub-1448615926129907/4705760712");
	const InterstitialAd = useInterstitialAd("ca-app-pub-1448615926129907/8104994414");
	const config = useAppConfig();
	const [saveDialog, setSaveDialog] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isGrantedSave, setIsGrantedSave] = useState(false);
	const Save = async (isWM) => {
		const { granted } = await requestPermission();
		if (!granted) {
			return false;
		}
		setIsSaving(true);
		if (isWM) {
			Reward.load();
		} else {
			InterstitialAd.load();
		}
		if (isGrantedSave) {
			await ImageController.saveImage(isWM ? data.watermarked : data.original);
			Toast.show({
				autoHide: true,
				type: "success",
				text1: "Well done!",
				text2: "Image saved successfully",
			});
		}

		setIsSaving(false);
		setIsGrantedSave(false);
	};
	useEffect(() => {
		if (Reward.isLoaded) {
			Reward.show();
			if (Reward.isEarnedReward) {
				setIsGrantedSave(true);
			}
		}
		if (InterstitialAd.isLoaded) {
			InterstitialAd.show();
			if (InterstitialAd.isOpened) {
				setIsGrantedSave(true);
			}
		}
	}, [Reward, InterstitialAd]);
	return (
		<ScrollView style={{ backgroundColor: "#000" }}>
			<MView paddingH-20>
				<LogoHeader />
				<View flex>
					<Text grey40>
						This is a thumbnail preview version. To view the full-size and
						high-quality version, please click the Save button.
					</Text>
					<View>
						<Image
							style={Styles.image}
							source={{
								uri: data.thumbnail,
							}}
							contentFit='contain'
							transition={3000}
							cachePolicy={"memory"}
						/>
						<Button
							backgroundColor={Colors.violet1}
							iconSource={() => {
								return (
									<Ionicons name='download' size={24} color={Colors.white} />
								);
							}}
							onPress={() => setSaveDialog(true)}
							fullWidth
							style={Styles.saveButton}
						/>
					</View>
					<BannerAd
							unitId={"ca-app-pub-1448615926129907/9564318260"}
							size={BannerAdSize.LARGE_BANNER}
						
						/>
				</View>
				<Dialog
					visible={saveDialog}
					onDismiss={() => setSaveDialog(false)}
					panDirection={PanningProvider.Directions.DOWN}>
					<View
						backgroundColor={Colors.$backgroundDark}
						padding-20
						style={{ borderRadius: 15 }}>
						<View
							pointerEvents={data.EnhanceRate > 0 ? "none" : "auto"}
							marginV-15
							style={{
								justifyContent: "center",
								alignItems: "center",
								alignSelf: "center",
								gap: 5,
							}}>
							<Text text60 grey80>
								Rate this result
							</Text>

							<StarRating
								starSize={24}
								enableHalfStar={false}
								rating={rating}
								onChange={(rate) => {
									setRating(rate);
									rateResult(data.image, rate);
								}}
								color={Colors.yellow10}
							/>
							<Text grey50 text100BL>
								Rating help us to improve our service and give you better
								results, do not hesitate to rate this result
							</Text>
						</View>
						<Button
							disabled={isSaving}
							style={{ marginVertical: 5, borderRadius: 5 }}
							label='Save without watermark '
							backgroundColor={Colors.$iconSuccess}
							onPress={() => {
								//show reward ad
								Save(true);
							}}
						/>
						<Button
							style={{ marginVertical: 5, borderRadius: 5 }}
							label='Save'
							backgroundColor={Colors.blue10}
							onPress={() => Save(false)}
							disabled={isSaving}
						/>
					</View>
				</Dialog>
			</MView>
		</ScrollView>
	);
};
const Styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	image: {
		marginVertical: 25,
		height: Dimensions.get("window").height / 2,
		width: Dimensions.get("window").width - 40,
		borderRadius: 15,
	},
	saveButton: {
		position: "absolute",
		bottom: 25,
		right: 0,
		padding: 5,
		borderTopStartRadius: 8,
		borderBottomStartRadius: 0,
		borderBottomEndRadius: 8,
	},
});
export default Result;
