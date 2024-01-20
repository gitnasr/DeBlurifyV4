import * as Device from 'expo-device';

const getDeviceInfo = () => {
    return {
        brand: Device.brand,
        modelName: Device.modelName,
        osName: Device.osName,
        osVersion: Device.osVersion,
        platformApiLevel: Device.platformApiLevel,
        platformName: Device.platformName,
        platformVersion: Device.platformVersion,
        deviceType: Device.type || "Unknown",
        isDevice: Device.isDevice,
        productName: Device.productName,
        
    };
}

export default getDeviceInfo;