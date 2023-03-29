import {
  baseAdminRequest,
  baseAdminGetRequest,
  basePublicGetRequest,
  basePublicRequest,
} from "./base";

const getPhotos = async (language) => {
  var url = `/api/photogallery?language=${language}`;
  var response = await basePublicGetRequest(url);
  return response;
};

const getPhotoById = async (id) => {
  var url = `/api/photogallery/${id}`;
  var response = await basePublicGetRequest(url);
  return response;
};

const uploadPhotos = async (body) => {
  const data = new FormData();

  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);

  body.images.forEach((element) => {
    data.append("photos[]", element.raw);
  });

  var response = await baseAdminRequest("/api/photogallery", "POST", data);
  return response;
};

const updatePhotos = async (id, body) => {
  const data = new FormData();

  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);

  body.images.forEach((element) => {
    data.append("photos[]", element.raw);
  });

  body.deletePhotoIds.forEach((element) => {
    data.append("delete_photo_ids[]", element);
  });

  var response = await baseAdminRequest(
    `/api/photogallery/${id}`,
    "POST",
    data
  );
  return response;
};

const deletePhoto = async (id) => {
  var response = await baseAdminRequest(`/api/photogallery/${id}`, "DELETE");
  return response;
};

export { getPhotos, uploadPhotos, deletePhoto, getPhotoById, updatePhotos };
