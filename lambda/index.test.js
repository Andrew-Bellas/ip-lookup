import * as api from "./api.js";
import { domainLookup, ipLookup } from "./index.js";

describe("ipLookup", () => {
  it('Fetches the result of multiple APIs and returns the combined result', async () => {
    const fetchIPAPISpy = jest.spyOn(api, "fetchIPAPI").mockResolvedValue({});
    const fetchVirusTotalSpy = jest.spyOn(api, "fetchVirusTotalByIP").mockResolvedValue({});
    const result = await ipLookup("1.1.1.1");
    expect(fetchIPAPISpy).toHaveBeenCalledTimes(1);
    expect(fetchVirusTotalSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ipapi: {}, virusTotal: {}})
  })
});

describe("domainLookup", () => {
  it('Fetches the result of multiple APIs and returns the combined result', async () => {
    const fetchIPAPISpy = jest.spyOn(api, "fetchIPAPI").mockResolvedValue({});
    const fetchVirusTotalSpy = jest.spyOn(api, "fetchVirusTotalByDomain").mockResolvedValue({});
    const result = await domainLookup("1.1.1.1");
    expect(fetchIPAPISpy).toHaveBeenCalledTimes(1);
    expect(fetchVirusTotalSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ipapi: {}, virusTotal: {}})
  })
});
