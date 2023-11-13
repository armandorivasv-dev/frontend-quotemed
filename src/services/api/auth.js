import { constant } from "@/utils/constant";

export const authLoginApi = async (formData) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/login`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(apiUrl, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const authRegisterApi = async (formData) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/user`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(apiUrl, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
