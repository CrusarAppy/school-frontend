import { clearCookie } from "../cookie/cookies";

const axiosErrorHandler = (error, notifyError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    notifyError(error.response.data.message);
    if (error.response.data.message === "Unauthenticated.") {
      clearCookie("adminToken");
      clearCookie("userId");
      notifyError("Session Expired!! Please log in again.");
      // window.location = "/";
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log(error.request);
    notifyError(error.message);
  } else {
    // Something happened in setting up the request that triggered an Error
    notifyError(error.message);
  }

  console.log(error);
};

export { axiosErrorHandler };
