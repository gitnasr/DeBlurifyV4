import { Button, Colors, Text, View } from "react-native-ui-lib";
import { Dimensions, Image, ScrollView } from "react-native";
import { enhanceImage, getImageById } from "../../services/API";
import { resetLayout, setLoading } from "../../redux/reducers/Layout.Reducer";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Details = ({ navigation, route }) => {
	const { image, refetch } = route.params;
	const width = Dimensions.get("screen").width;
	const height = Dimensions.get("screen").height;
	useEffect(() => {
		return () => {
			console.log("Details Unmounted");
			resetLayout();
			clearInterval();
			clearTimeout()
		}
	})
	const dispatch = useDispatch();

	const Enhance = async () => {
		// Set Loading
		// Set Loading Fallback
		// Choose Reward Ad
		// Show Reward Ad
		dispatch(
			setLoading({
				status: true,
				fallback: "Result",
			})
		);

		let data = await getImageById(image._id);
		navigation.navigate("Loading", { adType: "rewarded" });

		if (data && data.status === "SUCCESS") {
			dispatch(
				setLoading({
					status: false,
					fallback: "Result",
					params: { image: data },
				})
			);
			return;
		}
		 await enhanceImage(image._id);
		// check every 5 seconds if the image done
		// if done navigate to result
		// else show loading

		setInterval(async () => {
			data = await getImageById(image._id);
			if (data.status === "SUCCESS" && data.image === image._id){
				clearInterval();
				dispatch(
					setLoading({
						status: false,
						fallback: "Result",
						params: { image: data },
					})
				);
			}
		
		},5000);

		// Navigate to Result
	};
	return (
		<View flex backgroundColor={Colors.black}>
			<View
				flex
				style={{
					position: "relative",
				}}>
				<Image
					resizeMode='contain'
					source={{
						uri: image.SecureURL,
					}}
					style={{ width: width, height }}
				/>
			</View>
			<View
				backgroundColor={Colors.dark}
				style={{
					flexDirection: "row",
					padding: 10,
					justifyContent: "space-between",
				}}>
				<Button
					backgroundColor={Colors.blue1}
					flex
					fullWidth
					style={{
						width: 48,
						height: 48,
						borderTopStartRadius: 10,
						borderBottomStartRadius: 10,
					}}
					onPress={Enhance}>
					<Image
						source={require("../../../assets/icons/enhance.png")}
						style={{ width: 32, height: 32, margin: 5 }}
					/>
				</Button>
				<Button
					backgroundColor={Colors.blue10}
					flex
					fullWidth
					style={{
						width: 48,
						height: 48,
						borderTopEndRadius: 10,
						borderBottomEndRadius: 10,
					}}
					onPress={() => navigation.navigate("Info", { image, refetch })}>
					<Image
						source={require("../../../assets/icons/info.png")}
						style={{ width: 32, height: 32, margin: 5 }}
					/>
				</Button>
			</View>
		</View>
	);
};

export default Details;
