import { constant } from "@/utils/constant";

export const setTokenApi = async (token) => {
  try {
    await localStorage.setItem(constant.token.TOKEN, token);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTokenApi = async () => {
  try {
    const token = await localStorage.getItem(constant.token.TOKEN);
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeTokenApi = async () => {
  try {
    await localStorage.removeItem(constant.token.TOKEN);
  } catch (error) {
    console.log(error);
    return null;
  }
};
