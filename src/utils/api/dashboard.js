import {
  baseAdminRequest,
  baseAdminGetRequest,
  basePublicGetRequest,
  basePublicRequest,
} from "./base";

const getDashboardDetails = async () => {
  var response = await baseAdminGetRequest("/api/dashboard");
  return response;
};

export { getDashboardDetails };
