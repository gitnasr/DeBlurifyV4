import { Controller, useForm } from "react-hook-form";

import { Colors } from "react-native-ui-lib";
import PhoneInput from "react-native-phone-number-input";
import { setNumber } from "../../redux/reducers/Layout.Reducer";
import { useDispatch } from "react-redux";

const CustomPhoneInput = () => {
	const dispatch = useDispatch();

	return (
		<PhoneInput
			disableArrowIcon
			defaultCode='EG'
			onChangeFormattedText={(text) => dispatch(setNumber(text))}
			autoFocus
			withDarkTheme
			containerStyle={{
				backgroundColor: Colors.grey1,
				borderRadius: 15,
				width: "100%",
			}}
			textContainerStyle={{
				backgroundColor: Colors.grey1,
				borderRadius: 10,
			}}
			textInputStyle={{
				color: Colors.white,
				paddingLeft: 1,
			}}
			codeTextStyle={{
				color: Colors.white,
			}}
			placeholder='Enter Phone Number'
		/>
	);
};
export default CustomPhoneInput;