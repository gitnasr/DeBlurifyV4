import { Colors, Text, View } from "react-native-ui-lib";
import { useRef, useState } from "react";

import OTPTextInput from "react-native-otp-textinput";

const CustomOTP = ({ number,  Submit, ...props }) => {
    const input = useRef(null);

	const [otp, setOtp] = useState("");
	const handleChange = (data) => {
		setOtp((prv) => (prv + data).slice(0, 4));
		if (data.length === 4) {
			// navigation.navigate("Home");
            Submit()
		}
	};
	return (
		<View {...props}>
			<Text text100L grey40 >
				We have sent a 4 digit code to {number}. Enter the code below to
				continue.
			</Text>
			<OTPTextInput
				ref={input}
				textInputStyle={{
					backgroundColor: Colors.grey1,
					borderRadius: 10,
					color: Colors.white,
				}}
				handleTextChange={handleChange}
				tintColor={Colors.transparent}
				inputCount={4}
				autoFocus
				offTintColor={Colors.transparent}
				keyboardType='numeric'
			/>

			<Text text100L grey40 marginV-10 center>
				Didn't receive the code?{" "}
				<Text text100L grey40 marginT-10 underline>
					Resend
				</Text>
			</Text>
		</View>
	);
};

export default CustomOTP;