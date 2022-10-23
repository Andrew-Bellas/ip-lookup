import { fetchIPAPI, fetchVirusTotal } from "./api.js";

const ipLookup = async (ipAddressOrDomain) => {
  const result = {
    ipapi: await fetchIPAPI(ipAddressOrDomain),
    virusTotal: await fetchVirusTotal(ipAddressOrDomain)
  }

  return result;
};

export default ipLookup;