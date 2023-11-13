import { constant } from "@/utils/constant";

export const getAllDoctorsApi = async (auth) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/doctor`;
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

export const getDoctorByIdApi = async (token, doctorId) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/doctor/${doctorId}`;
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

export const addDoctorApi = async (auth, formData) => {
  try {
    console.log("formData", formData);
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/doctor`;
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

export const updateDoctorApi = async (auth, doctorId, formData) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/doctor/${doctorId}`;
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

export const deleteDoctorApi = async (auth, doctorId) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/doctor/${doctorId}`;
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
