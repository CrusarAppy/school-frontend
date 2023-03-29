import { baseAdminRequest, basePublicGetRequest } from "./base";

const getSpecialNotice = async () => {
  var url = `/api/popupimage`;
  var response = await basePublicGetRequest(url);
  return response;
};

const createSpecialNotice = async (body) => {
  const data = new FormData();
  data.append("photo", body.photo.raw);
  data.append("expiry_date", body.expiry_date);

  var response = await baseAdminRequest("/api/popupimage", "POST", data);
  return response;
};

const deleteSpecialNotice = async (id) => {
  var response = await baseAdminRequest("/api/popupimage/" + id, "DELETE");
  return response;
};

export { getSpecialNotice, createSpecialNotice, deleteSpecialNotice };
