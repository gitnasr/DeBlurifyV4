import { Button, Colors, Text } from "react-native-ui-lib";

import { ImageController } from "../../services/Picker";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { setLoading } from "../../redux/reducers/Layout.Reducer";
import { uploadImage } from "../../services/API";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const UploadNewPhoto = ({ refetch, navigation }) => {
	const dispatch = useDispatch();
	const {t} = useTranslation();

	const handleUpload = async () => {
		const asset = await ImageController.pickImage();
		if (!asset) return;
		dispatch(
			setLoading({
				status: true,
				fallback: "Tabs",
			})
		);
		navigation.navigate("Loading", { adType: "interstitial" });
		const data = await uploadImage(asset);
		if (data.existed) {
			Toast.show({
				type: "error",
				text2: t("upload_error_title"),
				text1: t("upload_error_text"),
				autoHide: true,
				position: "bottom",
			});
		}
		dispatch(
			setLoading({
				status: false,
				fallback: "Tabs",
			})
		);
		refetch();
	};
	return (
		<Button
			backgroundColor={Colors.dark}
			padding-5
			marginB-15
			onPress={handleUpload}
			style={{ borderRadius: 5, gap: 5 }}>
			<Ionicons
				name='add-circle'
				size={28}
				color={Colors.grey60}
				style={{ alignSelf: "center" }}
			/>
			<Text text60 center paddingH-5 color={Colors.white}>
				{t("upload_new")}
			</Text>
		</Button>
	);
};

export default UploadNewPhoto;
