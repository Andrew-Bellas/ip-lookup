import axios from 'axios';
import ssm from './ssm.js';

export const fetchIPAPI = async (ipAddressOrDomain) => {
  const key = await ssm.retrieve('IPAPIAccessKey', true);
  const url = `http://api.ipapi.com/${ipAddressOrDomain}?access_key=${key}`;
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const fetchVirusTotalByIP = async (ip) => {
  const key = await ssm.retrieve('VirusTotalAPIKey', true);
  const url = `http://www.virustotal.com/api/v3/ip_addresses/${ip}`;
  try {
    const result = await axios.get(url, { headers: { 'x-apikey': key } });
    return result.data.data.attributes;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const fetchVirusTotalByDomain = async (domain) => {
  const key = await ssm.retrieve('VirusTotalAPIKey', true);
  const url = `http://www.virustotal.com/api/v3/domains/${domain}`;
  try {
    const result = await axios.get(url, { headers: { 'x-apikey': key } });
    return result.data.data.attributes;
  } catch (e) {
    console.error(e);
    return null;
  }
};
