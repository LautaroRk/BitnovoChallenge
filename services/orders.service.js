import { API_URL } from "../constants/api";

export const createOrder = async (order) => {
  try {
    const formData = new FormData();
    for (const key in order) {
      formData.append(key, order[key]);
    }

    const response = await fetch(`${API_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Device-Id': process.env.EXPO_PUBLIC_X_DEVICE_ID,
      },
      body: formData,
    });

    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}