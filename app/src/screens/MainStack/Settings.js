import * as Application from "expo-application";
import * as Updates from "expo-updates";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
	BannerAd,
	BannerAdSize,
} from "react-native-google-mobile-ads";
import {
	Button,
	Colors,
	Dialog,
	ListItem,
	PanningProvider,
	Text,
	View,
} from "react-native-ui-lib";
import { RefreshControl, ScrollView } from "react-native";
import {
	resetLayout,
	setBindDialog,
	setBindOTP,
} from "../../redux/reducers/Layout.Reducer";
import { useDispatch, useSelector } from "react-redux";

import CustomOTP from "../../componentes/Inputs/OTP";
import CustomPhoneInput from "../../componentes/Inputs/PhoneInput";
import { Image } from "expo-image";
import MView from "../../componentes/Layout/MView";
import { getUser } from "../../services/API";
import moment from "moment/moment";
import { removeFromStorage } from "../../services/Storage";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

const Settings = ({ navigation }) => {
	const state = useSelector((state) => state.Layout);

	const { data, isLoading, refetch } = useQuery("user", getUser);
	const {t} = useTranslation();

	const dispatch = useDispatch();
	return (
		<>
			<ScrollView
				style={{ backgroundColor: Colors.black }}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={refetch} />
				}>
				<MView flex padding-10>
					<View centerH marginV-8>
						<Image
							style={{
								borderRadius: 5,
								width: 40,
								height: 40,
								marginBottom: 5,
							}}
							source={require("../../../assets/logo/logo.svg")}
							contentFit='cover'
							transition={300}
							cachePolicy={"memory"}
						/>
					</View>

					<View style={{ gap: 25 }}>
						<View row>
							<ListItem.Part left>
								<MaterialIcons
									name='date-range'
									size={24}
									color={Colors.grey40}
								/>
							</ListItem.Part>

							<ListItem.Part middle column>
								<Text grey60 text80B marginL-10>
									{moment(data?.createdAt).format("LLL")}
								</Text>
							</ListItem.Part>
						</View>
						<View row>
							<ListItem.Part left>
								<AntDesign
									name='clouduploado'
									size={24}
									color={Colors.grey40}
								/>
							</ListItem.Part>

							<ListItem.Part middle column>
								<Text grey60 text80B marginL-10>
									{data?.uploads || 0} {t("upload_count")}
								</Text>
							</ListItem.Part>
						</View>
						<BannerAd
								unitId={"ca-app-pub-1448615926129907/7236703671"}
								size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
							
							/>
						<View flex style={{ flexDirection: "column" }}>
							<Text uppercase marginT-8 text100L grey20 center>
								{data?.deviceUuid}
							</Text>
							<Text text100BL grey1 center>
								V{Application.nativeApplicationVersion}
							</Text>
						</View>
					</View>
				</MView>
				<Dialog
					useSafeArea
					containerStyle={{
						backgroundColor: Colors.dark,
						padding: 15,
						borderRadius: 10,
					}}
					center
					visible={state.bindDialog}
					onDismiss={() => {
						dispatch(setBindDialog(false));
						dispatch(setBindOTP(false));
					}}
					panDirection={PanningProvider.Directions.DOWN}>
					<View style={{ gap: 8 }}>
						{!state.bindOTP ? (
							<>
								<CustomPhoneInput />
								<Button
									label='Send OTP'
									style={{
										borderRadius: 10,
									}}
									onPress={() => {
										dispatch(setBindOTP(true));
									}}
									backgroundColor={Colors.blue30}
								/>
							</>
						) : (
							<CustomOTP
								center
								number={state.number}
								Submit={() => dispatch(resetLayout())}
							/>
						)}
					</View>
				</Dialog>
				<Button
					marginB-15
					center
					style={{ borderRadius: 10, marginHorizontal: 15 }}
					label={t("destroy_button")}
					backgroundColor={Colors.red1}
					onPress={() => {
						removeFromStorage("deviceId");
						dispatch(resetLayout());
						Updates.reloadAsync();
					}}
				/>
			</ScrollView>
		</>
	);
};

export default Settings;
