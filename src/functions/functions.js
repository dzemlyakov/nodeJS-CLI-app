// import { createReadStream, createWriteStream } from "fs";
// import { readdir, rename, rm } from "fs/promises";
// import { chdir, cwd } from "process";


// import { fileURLToPath } from "url";
// import path, { dirname } from "path";

// import { INVALID_INPUT, OPERATION_FAILED } from "../errors/errors.js";



  
// export const read = (filename) => {
//                 console.log('from read');
//           const rs = createReadStream(filename);
//   rs.on("data", (chunk) => {
//     console.log(chunk.toString());
//   }).on("error", (e) => {
//     console.log(e.message);
//   });
// };

// export const create = (filename) => {
//   const ws = createWriteStream(filename);
//   ws.on("finish", () => {
//     console.log("file has written");
//   }).on("error", (e) => {
//     console.log(e.message);
//   });
//   ws.end();
// };

// export const copy = ([src, dest]) => {
//   const rs = createReadStream(src);
//   const ws = createWriteStream(dest);

//   rs.on("end", () => {
//     console.log("file has been copied");
//   })
//     .pipe(ws)
//     .on("error", (e) => {
//       console.log(e.message);
//     });
// };

// export const move = ([src, dest]) => {
//   const rs = createReadStream(src);
//   const ws = createWriteStream(dest);

//   rs.on("close", () => {
//     rm(src);
//     console.log("file has been moved");
//   })
//     .pipe(ws)
//     .on("error", (e) => {
//       console.log(e.message);
//     });
// };

// export const renameFile = ([oldPath, newPath]) => {
//   try {
//     rename(oldPath, newPath);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const removeFile = (filename) => {
//   try {
//     rm(filename);
//     console.log("file has been removed");
//   } catch (err) {
//     console.log(err.message);
//   }
// };

