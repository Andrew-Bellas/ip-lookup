import * as api from "./api.js";
import { handler } from "./index.js";

describe("handler", () => {
  it("Returns a 400 if there is no domain or IP address provided", async () => {
    const result = await handler({ queryStringParameters: {} });
    expect(result.statusCode).toEqual(400);
  });

  it("Returns a 400 if both a domain and IP address are provided", async () => {
    const result = await handler({
      queryStringParameters: {
        domainName: "example.com",
        ipAddress: "1.1.1.1",
      },
    });

    expect(result.statusCode).toEqual(400);
  });

  it("Returns a 500 if there is an internal error", async () => {
    const result = await handler("input that causes error");
    expect(result.statusCode).toEqual(500);
  });

  it("Returns IP address data", async () => {
    const fetchIPAPISpy = jest.spyOn(api, "fetchIPAPI").mockResolvedValue({});
    const fetchVirusTotalSpy = jest
      .spyOn(api, "fetchVirusTotalByIP")
      .mockResolvedValue({});
    const result = await handler({
      queryStringParameters: { ipAddress: "1.1.1.1" },
    });
    expect(fetchIPAPISpy).toHaveBeenCalledTimes(1);
    expect(fetchVirusTotalSpy).toHaveBeenCalledTimes(1);
    const expected = JSON.stringify({ ipapi: {}, virusTotal: {} });
    expect(result.body).toEqual(expected);
    expect(result.statusCode).toEqual(200);
  });

  it("Returns domain name data", async () => {
    const fetchIPAPISpy = jest.spyOn(api, "fetchIPAPI").mockResolvedValue({});
    const fetchVirusTotalSpy = jest
      .spyOn(api, "fetchVirusTotalByDomain")
      .mockResolvedValue({});
    const result = await handler({
      queryStringParameters: { domainName: "google.com" },
    });
    expect(fetchIPAPISpy).toHaveBeenCalledTimes(1);
    expect(fetchVirusTotalSpy).toHaveBeenCalledTimes(1);
    const expected = JSON.stringify({ ipapi: {}, virusTotal: {} });
    expect(result.body).toEqual(expected);
    expect(result.statusCode).toEqual(200);  });
});
