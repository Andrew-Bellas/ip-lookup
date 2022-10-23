import AWS from "aws-sdk";

const retrieve = async (name, encrypted = false) => {
  // TODO: The region should come from an environment variable
  const ssm = new AWS.SSM({ region: "us-east-2" });
  const result = await ssm
    .getParameter({ Name: name, WithDecryption: encrypted })
    .promise();
  return result.Parameter.Value;
};

export default { retrieve };
 