import fetch from "./fetch.js";
import ssm from "../ssm.js";

export const fetchWhois = async (ipAddress) => {
  const key = await ssm.retrieve("IPAPIAccessKey", true);
  const url = `http://api.ipapi.com/${ipAddress}?access_key=${key}`;
  const result = await fetch.get(url);
  return result;
};
