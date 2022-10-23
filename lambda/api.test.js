import axios from "axios";
import { fetchIPAPI, fetchVirusTotal } from "./api";
import ssm from "./ssm";

describe("fetchIPAPI", () => {
  it("Returns the result from the IPAPI API", async () => {
    ssm.retrieve = jest.fn().mockResolvedValue("123456789");
    const axiosSpy = jest.spyOn(axios, "get").mockResolvedValue({});
    const result = await fetchIPAPI("1.1.1.1");
    expect(result).toEqual({});
    const expected = "http://api.ipapi.com/1.1.1.1?access_key=123456789";
    expect(axiosSpy).toHaveBeenCalledWith(expected);
  });

  it("Returns null if the IPAPI API does not return a result", async () => {
    ssm.retrieve = jest.fn().mockResolvedValue("123456789");
    jest.spyOn(axios, "get").mockRejectedValue(null);
    const result = await fetchIPAPI("1.1.1.1");
    expect(result).toEqual(null);
  });

  it("Throws an error if the API token cannot be retrieved", async () => {
    ssm.retrieve = jest.fn().mockRejectedValue(new Error());
    await expect(fetchIPAPI()).rejects.toThrow();
  });
});

describe("fetchVirusTotal", () => {
  it("Returns the result from the VirusTotal API", async () => {
    ssm.retrieve = jest.fn().mockResolvedValue("123456789");
    const axiosSpy = jest.spyOn(axios, "get").mockResolvedValue({ data: { data: { attributes: [] } } });
    const result = await fetchVirusTotal("1.1.1.1");
    expect(result).toEqual([]);
    const expected = "http://www.virustotal.com/api/v3/ip_addresses/1.1.1.1";
    expect(axiosSpy).toHaveBeenCalledWith(expected, { headers: {'x-apikey': '123456789'}});
  });

  it("Returns null if the VirusTotal API does not return a result", async () => {
    ssm.retrieve = jest.fn().mockResolvedValue("123456789");
    jest.spyOn(axios, "get").mockRejectedValue(null);
    const result = await fetchVirusTotal("1.1.1.1");
    expect(result).toEqual(null);
  });

  it("Throws an error if the API token cannot be retrieved", async () => {
    ssm.retrieve = jest.fn().mockRejectedValue(new Error());
    await expect(fetchVirusTotal()).rejects.toThrow();
  });});
