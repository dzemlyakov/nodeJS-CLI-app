import { createReadStream, createWriteStream } from "fs";
import { readdir, rename, rm } from "fs/promises";
import { chdir, cwd } from "process";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import {
  INVALID_INPUT,
  OPERATION_FAILED,
  NO_SUCH_FILE,
} from "../errors/errors.js";

export const read = (filename) => {
  const rs = createReadStream(filename);

  rs.on("data", (chunk) => {
    console.log(chunk.toString());
  }).on("error", (e) => {
    console.log(OPERATION_FAILED + NO_SUCH_FILE);
  });
};

export const create = (filename) => {
  const ws = createWriteStream(filename);

  ws.on("finish", () => {
    console.log(`file has written: ${filename}`);
  }).on("error", (e) => {
    console.log(OPERATION_FAILED);
  });
  ws.end();
};

export const copy = ([src, dest]) => {
  const rs = createReadStream(src);
  const ws = createWriteStream(dest);

  rs.on("end", () => {
    console.log(`file: ${src} has been copied here: ${dest}`);
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
        console.log("file has been moved");
    })
    .catch(() => console.log(OPERATION_FAILED+NO_SUCH_FILE))
  })
    .pipe(ws)
    .on("error", () => {
      console.log(OPERATION_FAILED);
    });
};

export const renameFile = ([oldPath, newPath]) => {
  try {
    rename(oldPath, newPath);
  } catch (err) {
    console.log(err.message);
  }
};

export const removeFile = (filename) => {
  rm(filename)
    .then(() => {
      console.log(`file: ${filename} has been removed`);
    })
    .catch(() => console.log(OPERATION_FAILED + NO_SUCH_FILE));
};