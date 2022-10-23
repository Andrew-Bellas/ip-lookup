import ssm from "./ssm.js";
import axios from "axios";

export const fetchIPAPI = async (ipAddressOrDomain) => {
  const key = await ssm.retrieve("IPAPIAccessKey", true);
  const url = `http://api.ipapi.com/${ipAddressOrDomain}?access_key=${key}`;
  try {
    const result = await axios.get(url);
    return result?.data 
  } catch {
    return null;
  }
};

export const fetchVirusTotal = async (ipAddressOrDomain) => {
  const key = await ssm.retrieve("VirusTotalAPIKey", true);
  const url = `http://www.virustotal.com/api/v3/ip_addresses/${ipAddressOrDomain}`;
  try {
    const result = await axios.get(url, { headers: { "x-apikey": key } });
    return result.data.data.attributes;
  } catch {
    return null;
  }
};
