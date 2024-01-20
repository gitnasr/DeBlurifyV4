import { Image } from "expo-image"

const { View,  } = require("react-native-ui-lib")

const LogoHeader = () => {
    return <View centerH marginV-8>
    <Image
        style={{ borderRadius: 5, width: 40, height: 40, marginBottom: 5 }}
        source={require("../../../assets/logo/logo.svg")}
        contentFit='cover'
        transition={500}
        cachePolicy={"memory-disk"}
    />
</View>
}

export default LogoHeader