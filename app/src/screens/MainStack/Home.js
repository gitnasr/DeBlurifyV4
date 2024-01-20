import {
	ActivityIndicator,
	Dimensions,
	Image,
	RefreshControl,
} from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import {
	Colors,
	GridList,
	Text,
	TouchableOpacity,
	View,
} from "react-native-ui-lib";

import MView from "../../componentes/Layout/MView";
import UploadNewPhoto from "../../componentes/Layout/Upload";
import { getImages } from "../../services/API";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

const Home = ({ navigation }) => {
	const { data, isLoading, refetch } = useQuery("images", getImages);
	const items = data;
	const {t} = useTranslation();
	const addTransformation = (image) => {
		const split = image.split("image/upload");
		const transformation = "/b_gen_fill,c_fill_pad,g_auto,h_800,w_600";
		const url = split[0] + "image/upload" + transformation + split[1];
		return url;
	};
	const renderItem = ({ item, index }) => (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("Details", {
					image: item,
					refetch,
				})
			}>
			<Image
				fadeDuration={200}
				loadingIndicatorSource={<ActivityIndicator />}
				resizeMode='cover'
				style={{
					width: Dimensions.get("window").width / 3.5,
					height: Dimensions.get("window").height / 4,
					borderRadius: 15,
				}}
				source={{ uri: addTransformation(item.SecureURL) }}
			/>
		</TouchableOpacity>
	);

	return (
		<MView paddingH-1>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}>
				<Text
					text40
					style={{
						paddingHorizontal: 5,
					}}
					color={Colors.white}>
					{t("home_header")}
				</Text>
			</View>

			<View paddingV-15>
				<GridList
					refreshControl={
						<RefreshControl refreshing={isLoading} onRefresh={refetch} />
					}
					showSeparator
					data={items}
					renderItem={renderItem}
					scrollEnabled
					numColumns={3}
					itemSpacing={10}
					ListHeaderComponent={
						<UploadNewPhoto refetch={refetch} navigation={navigation} />
					}
					ListFooterComponent={() => {
						return (
							<BannerAd
								unitId={"ca-app-pub-1448615926129907/6041620629"}
								size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
							/>
						);
					}}
				/>
			</View>
		</MView>
	);
};

export default Home;
