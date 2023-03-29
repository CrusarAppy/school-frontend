import { baseAdminRequest, basePublicGetRequest } from "./base";

const getBlogs = async (page, language) => {
  var url = `/api/blogs?language=${language}&page=${page}`;
  var response = await basePublicGetRequest(url);
  return response;
};

const getBlogDetails = async (id, language) => {
  var response = await basePublicGetRequest(
    `/api/blogs/${id}/details?language=${language}`
  );
  return response;
};

const getBlogById = async (id) => {
  var response = await basePublicGetRequest("/api/blogs/" + id);
  return response;
};

const createBlog = async (body) => {
  console.log(body);
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);
  data.append("nepali[description]", body.nepali.description);
  data.append("english[description]", body.english.description);

  body.images.forEach((element) => {
    data.append("images[]", element.raw);
  });

  var response = await baseAdminRequest("/api/blogs", "POST", data);
  return response;
};

const updateBlog = async (id, body) => {
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

  var response = await baseAdminRequest("/api/blogs/" + id, "POST", data);
  return response;
};

const deleteBlog = async (id) => {
  var response = await baseAdminRequest("/api/blogs/" + id, "DELETE");
  return response;
};

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogDetails,
};
