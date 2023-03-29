import { baseAdminRequest, basePublicGetRequest } from "./base";

const getVideos = async (page, language) => {
  var url = `/api/videos?page=${page}&language=${language}`;
  var response = await basePublicGetRequest(url);
  return response;
};

const uploadVideo = async (body, options) => {
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);
  data.append("video", body.video);
  var response = await baseAdminRequest("/api/videos", "POST", data, options);
  return response;
};

const updateVideo = async (id, body) => {
  console.log(body);
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);
  data.append("video", body.video);
  var response = await baseAdminRequest("/api/videos/" + id, "POST", data);
  return response;
};

const deleteVideo = async (id) => {
  var response = await baseAdminRequest("/api/videos/" + id, "DELETE");
  return response;
};

const getVideoById = async (id) => {
  var response = await basePublicGetRequest("/api/videos/" + id);
  return response;
};

export { getVideos, uploadVideo, deleteVideo, updateVideo, getVideoById };
