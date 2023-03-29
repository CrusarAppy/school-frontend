import { baseAdminRequest, basePublicGetRequest } from "./base";

const getDownloads = async (page, language) => {
  var url = `/api/downloads?language=${language}&page=${page}`;
  var response = await basePublicGetRequest(url);
  return response;
};

const getDownloadsById = async (id) => {
  var url = `/api/downloads/${id}`;
  var response = await basePublicGetRequest(url);
  return response;
};

const createDownloads = async (body) => {
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);
  data.append("file", body.file.raw);

  var response = await baseAdminRequest("/api/downloads", "POST", data);
  return response;
};

const updateDownloads = async (id, body) => {
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);
  if (body.file.raw) {
    data.append("file", body.file.raw);
  }
  var response = await baseAdminRequest("/api/downloads/" + id, "POST", data);
  return response;
};

const deleteDownloads = async (id) => {
  var response = await baseAdminRequest("/api/downloads/" + id, "DELETE");
  return response;
};

export {
  getDownloads,
  createDownloads,
  updateDownloads,
  deleteDownloads,
  getDownloadsById,
};
