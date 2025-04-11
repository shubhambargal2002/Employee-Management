import axios from "axios";
import authHeader from "./authHeaders";
let BASE_URL = "https://reqres.in";
const headers = {
  "Content-Type": "application/json",
  ...authHeader(),
};

let client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: headers,
});

const login = (data) => {
  return client.post("/api/login", data, { headers });
};

export default {
  login,
};
