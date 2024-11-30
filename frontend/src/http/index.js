import axios from "axios";
export const API = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",

    Accept: "application/json",
  },
});

export const APIForMedia = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "multipart/form-data",

    Accept: "multipart/form-data",
  },
});
