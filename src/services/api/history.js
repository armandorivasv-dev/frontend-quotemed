import { constant } from "@/utils/constant";

export const getAllHistorysApi = async (auth) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/history`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(apiUrl, params);
    const result = await response.json();
    console.log("🚀 -> getAllHistorysApi -> result->", result)
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getHistoryByIdApi = async (token, historyId) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/history/${historyId}`;
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

export const addHistoryApi = async (auth, formData) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/history`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ ...formData }),
    };
    const response = await fetch(apiUrl, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const updateHistoryApi = async (auth, historyId, formData) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/history/${historyId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ ...formData }),
    };
    const response = await fetch(apiUrl, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const deleteHistoryApi = async (auth, historyId) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/history/${historyId}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(apiUrl, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};