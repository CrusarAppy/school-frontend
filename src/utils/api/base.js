import axiosInstance from "./axiosInstance";
import { getCookie } from "../cookie/cookies";

const basePublicRequest = async (url, method, body, options) => {
  let response = {};
  if (method === "POST") {
    response = await axiosInstance({ options: options }).post(url, body);
  } else if (method === "PUT") {
    response = await axiosInstance({ options: options }).put(url, body);
  } else if (method === "DELETE") {
    response = await axiosInstance({ options: options }).delete(url);
  }
  return response.data;
};

const basePublicGetRequest = async (url, options) => {
  const response = await axiosInstance({ options: options }).get(url);
  return response.data;
};

const baseAdminRequest = async (url, method, body, options) => {
  let response = {};
  if (method === "POST") {
    response = await axiosInstance({
      options: options,
      token: getCookie("adminToken"),
    }).post(url, body);
  } else if (method === "PUT") {
    response = await axiosInstance({
      options: options,
      token: getCookie("adminToken"),
    }).put(url, body);
  } else if (method === "DELETE") {
    response = await axiosInstance({
      options: options,
      token: getCookie("adminToken"),
    }).delete(url);
  }
  return response.data;
};

const baseAdminGetRequest = async (url, options) => {
  const response = await axiosInstance({
    options: options,
    token: getCookie("adminToken"),
  }).get(url);
  return response.data;
};

export {
  baseAdminGetRequest,
  baseAdminRequest,
  basePublicGetRequest,
  basePublicRequest,
};
