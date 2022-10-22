import fetch from "./fetch.js";
import ssm from "../ssm.js";

export const fetchIPAPI = async (ipAddress) => {
  const key = await ssm.retrieve("IPAPIAccessKey", true);
  const url = `http://api.ipapi.com/${ipAddress}?access_key=${key}`;
  return fetch.get(url);
};

export const fetchVirusTotal = async (ipAddress) => {
  const key = await ssm.retrieve("VirusTotalAPIKey", true);
  const url = `http://www.virustotal.com/api/v3/ip_addresses/${ipAddress}`;
  const result = await fetch.get(url, { headers: { "x-apikey": key } });
  return result.data.attributes;
};
