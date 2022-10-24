import { fetchVirusTotalByDomain, fetchVirusTotalByIP, fetchIPAPI } from "./api.js";

export const ipLookup = async (ip) => {
  const result = {
    ipapi: await fetchIPAPI(ip),
    virusTotal: await fetchVirusTotalByIP(ip),
  };

  return result;
};

export const domainLookup = async (domain) => {
  const result = {
    ipapi: await fetchIPAPI(domain),
    virusTotal: await fetchVirusTotalByDomain(domain),
  };

  return result;
}

export const handler = async (event) => {
  const returnBadRequest = (message) =>{
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: message,
    };
  } 

  try {    
    const { ipAddress, domainUrl: domainName } = event.queryStringParameters;

    if (!ipAddress && !domainName) {
      returnBadRequest("Missing IP address or domain")
    }

    if (ipAddress && domainName) {
      returnBadRequest("Request contains both an IP Address and a domain name")
    }

    const result = ipAddress ? await ipLookup(ipAddress) : domainLookup(domainName);
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: e.message,
    };
  }
};
