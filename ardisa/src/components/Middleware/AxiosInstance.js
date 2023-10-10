import axios from "axios";

export const ArdisaFetch = axios.create({
  baseURL: "http://localhost:4000",
});
