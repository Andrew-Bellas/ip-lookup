import { fetchIPAPI, fetchVirusTotal } from "./api/api.js";

const ipLookup = async (ip, domain) => {
  if (ip && domain) {
    throw new Error('Bad Request');
  }

  const result = {
    ipapi: await fetchIPAPI(ip),
    virusTotal: await fetchVirusTotal(ip)
  }

  return result;
};

export default ipLookup;