import { getFromStorage, saveToStorage } from "./Storage";

import axios from "axios";
import getDeviceInfo from "./Info";

const BASE_URL = "https://deblurify-15a37.oa.r.appspot.com";
const AKnownLogin = async () => {
	try {
		const info = getDeviceInfo();
		const { data } = await axios.post(`${BASE_URL}/users/unknown`, info);

		const deviceId = data.deviceUuid;
		await saveToStorage("deviceId", deviceId);
		// await saveToStorage("deviceId", "8D0996AC92FD4EA0A38978FD32F75B2C646D3911F24F17E978F39A45D2C191CB");
		const token = await getMyToken();
		return token;
	} catch (error) {}
};

const getMyToken = async () => {
	try {
		const deviceId = await getFromStorage("deviceId");
		const res = await axios.post(`${BASE_URL}/users/token`, { deviceId });
		const token = res.data.token;
		const config = res.data.config
		saveToStorage("token", token);
		saveToStorage("config", JSON.stringify(config))
		return token;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const getUser = async () => {
	try {
		const token = await getMyToken();
		const { data } = await axios.get(`${BASE_URL}/users`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getImages = async () => {
	try {
		const token = await getMyToken();

		const { data } = await axios.get(`${BASE_URL}/upload`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const deleteImage = async (id) => {
	try {
		const token = await getMyToken();
		const { data } = await axios.delete(`${BASE_URL}/upload/i/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
const rateImage = async (id, rate) => {
	try {
		const token = await getMyToken();
		const { data } = await axios.post(
			`${BASE_URL}/upload/rate`,
			{ id, rate },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
const uploadImage = async (asset) => {
	try {
		const token = await getMyToken();
		const form = new FormData();
		form.append("image", {
			uri: asset.uri,
			name: "image.jpg",
			type: "image/jpeg",
		});
		const { data } = await axios.post(
			`${BASE_URL}/upload`,
			form,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
const enhanceImage = async (id) => {
	try {
		const token = await getMyToken();
		const { data } = await axios.post(`${BASE_URL}/enhance`, {image:id},{
			headers: { Authorization: `Bearer ${token}` },
		});
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
const getImageById = async (id) => {
	try {
		const token = await getMyToken();
		const { data } = await axios.get(`${BASE_URL}/enhance?id=${id}`,{
			headers: { Authorization: `Bearer ${token}` },
		});
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const rateResult = async (id, rate) => {
	try {
		const token = await getMyToken();
		const { data } = await axios.post(
			`${BASE_URL}/enhance/rate`,
			{ id, rate },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
export {
	AKnownLogin,
	getMyToken,
	getUser,
	getImages,
	deleteImage,
	rateImage,
	uploadImage,enhanceImage,getImageById,rateResult
};
