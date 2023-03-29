import { baseAdminRequest, basePublicGetRequest } from "./base";

const getEvents = async (page, language) => {
  var url = `/api/events?language=${language}&page=${page}`;
  var response = await basePublicGetRequest(url);
  return response;
};

const getEventById = async (id) => {
  var response = await basePublicGetRequest("/api/events/" + id);
  return response;
};

const getEventDetails = async (id, language) => {
  var response = await basePublicGetRequest(
    `/api/events/${id}/details?language=${language}`
  );
  return response;
};

const createEvent = async (body) => {
  console.log(body);
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("date", body.date);
  if (body.start_time) {
    data.append("start_time", body.start_time);
  }
  data.append("english[title]", body.english.title);
  data.append("nepali[description]", body.nepali.description);
  data.append("english[description]", body.english.description);
  if (body.english.location) {
    data.append("english[location]", body.english.location);
  }
  if (body.nepali.location) {
    data.append("nepali[location]", body.nepali.location);
  }

  body.images.forEach((element) => {
    data.append("images[]", element.raw);
  });

  var response = await baseAdminRequest("/api/events", "POST", data);
  return response;
};

const updateEvent = async (id, body) => {
  console.log(body);
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);
  data.append("date", body.date);
  data.append("english[location]", body.english.location);
  data.append("nepali[location]", body.nepali.location);
  if (body.start_time) {
    data.append("start_time", body.start_time);
  }
  data.append("nepali[description]", body.nepali.description);
  data.append("english[description]", body.english.description);

  body.images.forEach((element) => {
    data.append("images[]", element.raw);
  });

  body.deleteImageIds.forEach((element) => {
    data.append("delete_image_ids[]", element);
  });

  var response = await baseAdminRequest("/api/events/" + id, "POST", data);
  return response;
};

const deleteEvent = async (id) => {
  var response = await baseAdminRequest("/api/events/" + id, "DELETE");
  return response;
};

export {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventDetails,
};
