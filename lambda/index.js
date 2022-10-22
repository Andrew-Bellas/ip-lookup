import { fetchWhois } from "./api/api.js";

const ipLookup = async (ip, domain) => {
  if (ip && domain) {
    throw new Error('Bad Request');
  }

  const result = await fetchWhois(ip);
  return result;
};

export default ipLookup;