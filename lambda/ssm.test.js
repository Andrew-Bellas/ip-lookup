import AWS from "aws-sdk";
import ssm from "./ssm";

describe("retrieve", () => {
  let getParameterSpy;
  beforeEach(() => {
    getParameterSpy = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Parameter: {
          Value: "123456789",
        },
      }),
    });

    AWS.SSM = jest.fn().mockImplementation(() => ({
      getParameter: getParameterSpy,
    }));
  });

  it("Returns the parameter value from SSM", async () => {
    const actual = await ssm.retrieve("Foo");
    expect(actual).toEqual("123456789");
  });

  it("Calls SSM with the correct key and decrypts the value if applicable", async () => {
    await ssm.retrieve("Foo", false);
    await ssm.retrieve("Bar", true);
    expect(getParameterSpy).toHaveBeenCalledWith({
      Name: "Foo",
      WithDecryption: false,
    });
    expect(getParameterSpy).toHaveBeenCalledWith({
      Name: "Bar",
      WithDecryption: true,
    });
    expect(getParameterSpy).toHaveBeenCalledTimes(2);
  });
});
