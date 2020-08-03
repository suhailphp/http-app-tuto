import axios from "axios";
import * as Sentry from "@sentry/react";
import { toast } from "react-toastify";
//this function for take all unexpected error Gobally. then no need to repeat everywhere
axios.interceptors.response.use(
  (success) => {
    //console.log("API Call success", success);
    return Promise.resolve(success);
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      toast.error("Unexpected error occured, please try again");
      //console.log("unexpectedError", error);
      Sentry.captureException(error);
    }
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
