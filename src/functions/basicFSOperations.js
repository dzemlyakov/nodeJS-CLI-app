import { createReadStream, createWriteStream } from "fs";
import { rename, rm } from "fs/promises";
import  { parse } from "path";
import {
  OPERATION_FAILED,
  NO_SUCH_FILE,
} from "../errors/errors.js";
import { pwdForUser } from "../userInfo/userCLI.js";

export const read = (filename) => {
  const rs = createReadStream(filename);

  rs.on("data", (chunk) => {
    console.log(chunk.toString());
    pwdForUser()
  }).on("error", (e) => {
    console.log(OPERATION_FAILED + NO_SUCH_FILE);
  });
};

export const create = (filename) => {
  const ws = createWriteStream(filename);

  ws.on("finish", () => {
    console.log(`file:${parse(filename).base} was created here:${filename}`);
    pwdForUser()
  }).on("error", (e) => {
    console.log(OPERATION_FAILED);
  });
  ws.end();
};

export const copy = ([src, dest]) => {
  const rs = createReadStream(src);
  const ws = createWriteStream(dest);

  rs.on("end", () => {
    console.log(`file: ${parse(src).base} has been copied here: ${dest}`);
    pwdForUser()
  })
    .pipe(ws)
    .on("error", () => {
      console.log(OPERATION_FAILED+NO_SUCH_FILE);
    });
};

export const move = ([src, dest]) => {
  const rs = createReadStream(src);
  const ws = createWriteStream(dest);

  rs.on("close", () => {
    rm(src)
    .then(()=>{
        console.log(`file: ${parse(src).base} has been moved here: ${dest}`);
        pwdForUser()
    })
    .catch(() => console.log(OPERATION_FAILED+NO_SUCH_FILE))
  })
    .pipe(ws)
    .on("error", () => {
      console.log(OPERATION_FAILED);
    });
};

export const renameFile = ([oldName, newName]) => {
    rename(oldName, newName)
        .then(() => {
      console.log(`name of file: ${parse(oldName).base} has been changed`);
      pwdForUser()
    })
    .catch(() => console.log(OPERATION_FAILED + NO_SUCH_FILE));
};

export const removeFile = (filename) => {
  rm(filename)
    .then(() => {
      console.log(`file: ${parse(filename).base} has been removed`);
      pwdForUser()
    })
    .catch(() => console.log(OPERATION_FAILED + NO_SUCH_FILE));
};