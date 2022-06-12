import crypto from "crypto";
import { createReadStream } from "fs";
import { OPERATION_FAILED, NO_SUCH_FILE } from "../errors/errors.js";
import { pwdForUser } from "../userInfo/userCLI.js";

export const calculateHash = (filename) => {
  const rs = createReadStream(filename);
  const hash = crypto.createHash("sha256");

  rs.on("data", (chunk) => {
    console.log(hash.update(chunk).digest("hex"));
    pwdForUser()
  }).on("error", () => {
    console.log(OPERATION_FAILED + NO_SUCH_FILE);
  });
};
