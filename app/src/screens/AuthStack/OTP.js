import { Colors, Text } from "react-native-ui-lib";
import { useRef, useState } from "react";

import Header from "../../componentes/Layout/Header";
import MView from "../../componentes/Layout/MView";
import OTPTextInput from "react-native-otp-textinput";
import { setLogged } from "../../redux/reducers/Layout.Reducer";
import { useDispatch } from "react-redux";

const OTPScreen = ({ navigation,route }) => {
    const {number,confirm} = route.params;
	const input = useRef(null);
	const dispatch = useDispatch()
	const [otp, setOtp] = useState("");
	const handleChange = (data) => {
		setOtp((prv) => (prv + data).slice(0, 4));
		if (data.length === 4) {
			confirm
				.confirm(otp)
				.then((user) => {
					console.log(user);
					dispatch(setLogged(true))
				})
				.catch((error) => {
					console.log(error);
				});
			// dispatch(setLogged(true))
		}
	};
	return (
		<MView paddingH-20>
			<Header navigation={navigation} text='Enter OTP Sent to Your Phone' />
            <Text text100L grey40 animated>
				We have sent a 4 digit code to {number}. Enter the code below
				to continue.
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
				inputCount={6}
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
			
		</MView>
	);
};

export default OTPScreen;
