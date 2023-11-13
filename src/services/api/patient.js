import { constant } from "@/utils/constant";

export const getAllPatientsApi = async (auth) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/patient`;
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

export const getPatientByIdApi = async (auth, patientId) => {
  console.log("patientId", patientId);
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/patient/${patientId}`;
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
    console.log(error);
    return null;
  }
};

export const addPatientApi = async (auth, formData) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/patient`;
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

export const updatePatientApi = async (auth, patientId, formData) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/patient/${patientId}`;
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

export const deletePatientApi = async (auth, patientId) => {
  try {
    const apiUrl = `${constant.apiUrl.apiUrlLocal}/api/patient/${patientId}`;
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
