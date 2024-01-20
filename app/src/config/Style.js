import { Colors, Spacings, Typography } from "react-native-ui-lib";

export const Theme = () => {
	Typography.loadTypographies({
		h1: { fontSize: 58, fontWeight: "300", lineHeight: 80 },
		h2: { fontSize: 46, fontWeight: "300", lineHeight: 64 },
	});

	Colors.loadColors({
		error: "#ff2442",
		success: "#00CD8B",
		text: "#20303C",
	});
};
