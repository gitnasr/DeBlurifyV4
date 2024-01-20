import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import {
	Button,
	Card,
	Colors,
	ListItem,
	Text,
	View,
} from "react-native-ui-lib";
import { deleteImage, rateImage } from "../../services/API";

import Header from "../../componentes/Layout/Header";
import { Image } from "expo-image";
import MView from "../../componentes/Layout/MView";
import StarRating from "react-native-star-rating-widget";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ImageInfo = ({ navigation, route: { params } }) => {
	const { image, refetch } = params;
	const [rating, setRating] = useState(image.DetectionRate);

	const Rate = async (rate) => {
		setRating(rate);
		await rateImage(image._id, rate);
		refetch();
	};

	const Delete = async () => {
		await deleteImage(image._id);
		navigation.navigate("Home");
		refetch();
	};
	const { t, i18n } = useTranslation();

	return (
		<MView paddingH-20>
			<Header text={t("info_header")} navigation={navigation} />
			<BannerAd
				unitId={"ca-app-pub-1448615926129907/7236703671"}
				size={BannerAdSize.LARGE_BANNER}
			/>
			<View centerV flex>
				<Card disabled backgroundColor={Colors.grey70}>
					<View style={styles.container}>
						<Card.Image
							resizeMode='cover'
							fadeDuration={1000}
							style={styles.image}
							source={{ uri: image.SecureURL }}
						/>
						<View paddingV-10 style={styles.listView}>
							<ListItem style={styles.listItem}>
								<AntDesign
									name='checkcircleo'
									size={16}
									color={Colors.green10}
								/>
								<Text text100 marginL-5 uppercase>
									{image.hash.slice(0, 10)}
								</Text>
							</ListItem>
							<ListItem style={styles.listItem}>
								<MaterialCommunityIcons
									name='face-recognition'
									size={16}
									color='black'
								/>
								<Text text100 marginH-5>
									{image.faceCount} {t("info_face_detected")}
								</Text>
							</ListItem>
							<ListItem style={styles.listItem} disabled>
								{image.persons.map((person, index) => (
									<View key={index} style={{ flexDirection: "row", gap: 2 }}>
										<MaterialCommunityIcons
											name={image.isHasFemale ? "gender-female" : "gender-male"}
											size={16}
											color='black'
										/>
										<Text text100>{person.age} {t("info_years_old")}</Text>
									</View>
								))}
							</ListItem>
							<Text text100 marginR-5>
								{image.Describe.text}
							</Text>
							<View
								pointerEvents={rating > 0 ? "none" : "auto"}
								center
								flex
								padding-8
								style={{
									justifyContent: "center",
									alignItems: "center",
									alignSelf: "center",
								}}>
								<StarRating
									starSize={24}
									enableHalfStar={false}
									rating={rating}
									onChange={Rate}
									color={Colors.yellow10}
								/>
							</View>
							<Button
								onPress={Delete}
								style={styles.deleteButton}
								iconSource={() => {
									return (
										<AntDesign
											name='delete'
											size={18}
											color='white'
											style={{ padding: 5 }}
										/>
									);
								}}
								backgroundColor={Colors.red10}
								borderRadius={10}
								marginT-10
							/>
						</View>
					</View>
					<Image
						style={styles.logoImage}
						source={require("../../../assets/logo/logo.svg")}
						contentFit='cover'
						transition={1000}
						cachePolicy={"memory"}
					/>
				</Card>
			</View>
			<BannerAd
				unitId={"ca-app-pub-1448615926129907/2714186495"}
				size={BannerAdSize.LARGE_BANNER}
			/>
		</MView>
	);
};
const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		gap: 10,
	},
	card: {
		backgroundColor: Colors.grey70,
	},
	image: {
		width: 100,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	listView: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		gap: 8,
		alignContent: "center",
		alignItems: "flex-start",
	},
	listItem: {
		maxHeight: 25,
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
	},
	text: {
		text100: true,
	},
	ratingButton: {
		position: "absolute",
		right: 15,
	},
	logoImage: {
		position: "absolute",
		zIndex: 99,
		width: 14,
		height: 14,
		bottom: 0,
	},
	deleteButton: { position: "absolute", right: 15 },
});

export default ImageInfo;
