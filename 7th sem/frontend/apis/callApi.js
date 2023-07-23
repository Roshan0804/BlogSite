import axios from "axios";
export const IMAGE_BASE_URL = "http://localhost:8000/";

const BASE_URL = "http://localhost:8000/api";
export async function callApi(method, url, payload) {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data: payload,
    });
    return { response: response.data };
  } catch (err) {
    return { err: err?.response?.data || err };
  }
}

export async function callAuthApi(method, url, payload, formData) {
  try {
    const token = await getToken();
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data: payload,
      headers: {
        Authorization: token,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    });
    return { response: response.data };
  } catch (err) {
    return { err: err?.response?.data || err };
  }
}

async function getToken() {
  let user = await localStorage.getItem("user");
  user = JSON.parse(user);
  if (user) return user.token;
  else return "";
}
