import axios from "axios";

axios.defaults.baseURL = "https://connectify-api-da6695597009.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;