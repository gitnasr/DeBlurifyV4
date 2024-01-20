import * as firebase from "@react-native-firebase/analytics";

import { Button, Colors, Text, View } from "react-native-ui-lib";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import CustomPhoneInput from "../../componentes/Inputs/PhoneInput";
import Header from "../../componentes/Layout/Header";
import MView from "../../componentes/Layout/MView";
import auth from "@react-native-firebase/auth";
import { useSelector } from "react-redux";

export default function Phone({ navigation }) {

	return (
		<MView paddingH-20>
	
			<Header navigation={navigation} text='Login with Phone Number' />
			<View
				marginT-25
				marginB-10
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					gap: 15,
				}}>
				<CustomPhoneInput />

				<Button
					label='Send OTP'
					style={{
						borderRadius: 10,
					}}
					onPress={() => {
						handleSubmit(async (data) => {
							const verificationId = await phoneProvider.verifyPhoneNumber(data.phoneNumber, recaptchaVerifier);
							console.log(verificationId);

							// signInWithPhoneNumber().then(() => {
							// 	console.log("OTP Sent");
							// 	navigation.navigate("OTP", {
							// 		number: data.phoneNumber,
							// 		confirm: confirm,
							// 	});
							// });
						})();
					}}
					backgroundColor={Colors.blue30}
				/>
			</View>
			<Text text100L grey50>
				This functionality is only available to users who have already chosen to
				link and sync their data with a phone number to prevent data loss.
			</Text>
		</MView>
	);
}
