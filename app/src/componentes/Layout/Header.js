import { Button, Colors, Text, View } from "react-native-ui-lib";

import { AntDesign } from "@expo/vector-icons";

const Header = ({ navigation, text }) => {
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: 10,
			}}>
			<Button
				iconSource={() => {
					return (
						<AntDesign name='leftcircle' size={32} color={Colors.blue20} />
					);
				}}
				style={{ alignSelf: "flex-start", marginVertical: 15 }}
				backgroundColor={Colors.transparent}
				size={Button.sizes.xSmall}
				supportRTL
				onPress={() => {
					navigation.goBack();
				}}
			/>
			<Text text60 white>
				{text}
			</Text>
		</View>
	);
};

export default Header;
