import { constant } from "@/utils/constant";

export const getUserById = async (userId, token) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/user/${userId}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(apiUrl, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserApi = async (auth, formData) => {
  try {
    console.log("auth", auth);
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/user/${auth.userId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(apiUrl, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
