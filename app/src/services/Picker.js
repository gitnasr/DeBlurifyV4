import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import moment from "moment";

const pickImage = async () => {
	// No permissions request is necessary for launching the image library
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: false,
		quality: 1,
		allowsMultipleSelection: false,
		exif: true,
	});

	return !result.canceled && result.assets[0];
};

const saveImage = async (uri) => {
	const album = await MediaLibrary.getAlbumAsync("DeBlurify");
	let date = moment().format("YYYYMMDDhhmmss");
	let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
	const res = await FileSystem.downloadAsync(uri, fileUri);
	const asset = await MediaLibrary.createAssetAsync(res.uri);

	if (album == null) {
		await MediaLibrary.createAlbumAsync("DeBlurify", asset, false);
	} else {
		await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
	}

	return true;
};
export const ImageController = {
	pickImage,
	saveImage,
};
