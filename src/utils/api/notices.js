import { baseAdminRequest, basePublicGetRequest } from "./base";

const getNotices = async (page, language) => {
  var url = `/api/notices?language=${language}&page=${page}`;
  var response = await basePublicGetRequest(url);
  return response;
};

const getNoticeById = async (id) => {
  var response = await basePublicGetRequest("/api/notices/" + id);
  return response;
};

const getNoticeDetails = async (id, language) => {
  var response = await basePublicGetRequest(
    `/api/notices/${id}/language=${language}`
  );
  return response;
};

const createNotice = async (body) => {
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);
  data.append("nepali[description]", body.nepali.description);
  data.append("english[description]", body.english.description);

  body.images.forEach((element) => {
    data.append("images[]", element.raw);
  });

  var response = await baseAdminRequest("/api/notices", "POST", data);
  return response;
};

const updateNotice = async (id, body) => {
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);
  data.append("nepali[description]", body.nepali.description);
  data.append("english[description]", body.english.description);

  body.images.forEach((element) => {
    data.append("images[]", element.raw);
  });

  body.deleteImageIds.forEach((element) => {
    data.append("delete_image_ids[]", element);
  });

  var response = await baseAdminRequest("/api/notices/" + id, "POST", data);
  return response;
};

const deleteNotice = async (id) => {
  var response = await baseAdminRequest("/api/notices/" + id, "DELETE");
  return response;
};

export {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
  getNoticeDetails,
};
