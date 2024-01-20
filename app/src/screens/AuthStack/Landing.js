import { Button, Colors, Text, View } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";

import { AKnownLogin } from "../../services/API";
import { Image } from "expo-image";
import MView from "../../componentes/Layout/MView";
import { getLayoutState } from "../../redux/store";
import { setLogged } from "../../redux/reducers/Layout.Reducer";
import { useTranslation } from "react-i18next";

export default function Landing({ navigation }) {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();

	return (
		<MView paddingH-20>
			<View
				style={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					justifyContent: "flex-end",
				}}>
				<Image
					style={{ borderRadius: 5, width: 50, height: 50, marginBottom: 5 }}
					source={require("../../../assets/logo/logo.svg")}
					contentFit='cover'
					transition={1000}
					cachePolicy={"memory"}
				/>
			</View>
			<View>
				<Text text40 white>
					{t("welcome")}
				</Text>
				<Text text70B grey40 animated>
					{t("welcome_describe")}
				</Text>

				<Button
					label={t("login")}
					backgroundColor={Colors.white}
					marginT-20
					onPress={() => {
						AKnownLogin();
						dispatch(setLogged(true));
					}}
					labelStyle={{ color: Colors.black }}
				/>

				<Text text100 grey40 marginV-5 center>
					{t("welcome_terms")}
				</Text>
			</View>
		</MView>
	);
}
