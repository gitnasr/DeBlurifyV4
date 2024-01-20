import { View } from "react-native-ui-lib";
import { getLocales } from "expo-localization";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MView = ({ children,...props }) => {
	const insets = useSafeAreaInsets();

	return (
		<View
		{...props}
			useSafeArea
			dir={getLocales()[0].textDirection || "ltr"}
			flex
			style={{ paddingTop: insets.top + 15, paddingBottom: insets.bottom + 15, }}
			backgroundColor='black'>
			{children}
		</View>
	);
};

export default MView;
