import { constant } from "@/utils/constant";

export const getAllMedicinesApi = async (auth) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/medicine`;
    const params = {
      method: "GET",
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

export const getMedicineByIdApi = async (token, medicineId) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/medicine/${medicineId}`;
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

export const addMedicineApi = async (auth, formData) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/medicine`;
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

export const updateMedicineApi = async (auth, medicineId, formData) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/medicine/${medicineId}`;
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

export const deleteMedicineApi = async (auth, medicineId) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/medicine/${medicineId}`;
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
