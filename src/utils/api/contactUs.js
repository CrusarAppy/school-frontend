import {
  baseAdminRequest,
  baseAdminGetRequest,
  basePublicRequest,
} from "./base";

const getMessages = async (page) => {
  var response = await baseAdminGetRequest(`/api/connectwithus?page=${page}`);
  return response;
};

const storeMessage = async (data) => {
  var response = await basePublicRequest(`/api/connectwithus`, "POST", data);
  return response;
};

const readMessage = async (id) => {
  var response = await baseAdminRequest(
    `/api/connectwithus/${id}/read`,
    "POST"
  );
  return response;
};

export { getMessages, readMessage, storeMessage };
