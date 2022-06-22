import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import {  OPERATION_FAILED } from "../errors/errors.js";

export const compress = ([src, dest]) =>{
    const rs = createReadStream(src)
    const ws = createWriteStream(dest + '.gz')
    const brotliCompress = createBrotliCompress();

    pipeline(rs, brotliCompress, ws, (err) => {
      if (err) {
        console.log(OPERATION_FAILED);
      } else {
        console.log("file has been compressed!");
      }
    });
}

export const decompress = ([src, dest]) =>{
    const rs = createReadStream(src)
    const ws = createWriteStream(dest)
    const brotliDecompress = createBrotliDecompress();

    pipeline(rs, brotliDecompress, ws, (err) => {
      if (err) {
        console.log(OPERATION_FAILED);
      } else {
        console.log("file has been decompressed!");
      }
    });
}