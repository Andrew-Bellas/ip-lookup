import { fetchIPAPI, fetchVirusTotal } from "./api.js";

const domainLookup = async (domain) => {
  // TODO
}

const ipLookup = async (ip) => {
  const result = {
    ipapi: await fetchIPAPI(ip),
    virusTotal: await fetchVirusTotal(ip)
  }

  return result;
};

export default ipLookup;