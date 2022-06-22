import { createReadStream, createWriteStream } from "fs";
import { rename, rm } from "fs/promises";
import  path, { parse, join } from "path";
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

export const copy = async (src, dest) => {
  let { base, name, ext } = parse(src)
  let destPathWithName = join(dest, `${name}_copy${ext}`)
    
  const rs = createReadStream(src);
  const ws = createWriteStream(destPathWithName);
  
  rs.on("end", () => {
    console.log(`file: ${base} has been copied here: ${dest}`);
  })
    .pipe(ws)
    .on("error", () => {
      console.log(OPERATION_FAILED+NO_SUCH_FILE, '+++');
    });
};

export const move = async (src, dest) => {
 await copy(src,dest)
 await removeFile(src)
};

export const renameFile = ([oldName, newName]) => {
    rename(oldName, newName)
        .then(() => {
      console.log(`name of file: ${parse(oldName).base} has been changed`);
    })
    .catch(() => console.log(OPERATION_FAILED + NO_SUCH_FILE));
};

export const removeFile = async (filename) => {
  rm(filename)
    .then(() => {
      console.log(`file: ${parse(filename).base} has been removed`);
    })
    .catch(() => console.log(OPERATION_FAILED + NO_SUCH_FILE));
};