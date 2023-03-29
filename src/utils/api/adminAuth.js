import {
  baseAdminRequest,
  baseAdminGetRequest,
  basePublicRequest,
} from "./base";

const login = async (data) => {
  var response = await basePublicRequest("/api/login", "POST", data);
  return response;
};

const logout = async () => {
  var response = await baseAdminGetRequest("/api/logout");
  return response;
};

const updatePassword = async (data) => {
  var response = await baseAdminRequest("/api/updatepassword", "POST", data);
  return response;
};

const forgotPassword = async (data) => {
  var response = await baseAdminRequest("/api/forgotpassword", "POST", data);
  return response;
};
export { login, logout, updatePassword, forgotPassword };
