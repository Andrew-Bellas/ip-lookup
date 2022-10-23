import { fetchIPAPI, fetchVirusTotal } from "./api.js";

export const ipLookup = async (ipAddressOrDomain) => {
  const result = {
    ipapi: await fetchIPAPI(ipAddressOrDomain),
    virusTotal: await fetchVirusTotal(ipAddressOrDomain),
  };

  return result;
};

export const handler = async (event) => {
  try {
    const { ipAddressOrDomain } = event.pathParameters;
    if (!ipAddressOrDomain) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: "Missing IP address or domain",
      };
    }

    const result = await ipLookup(ipAddressOrDomain);
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
