import {
  list,
  up,
  cd,
  read,
  create,
  copy,
  move,
  renameFile,
  removeFile,
} from "./functions.js";
import { getOSCommand, getOnePathCommand } from "./getters.js";
import path, { dirname } from "path";
import { chdir, cwd } from "process";
import { allCommands } from "./commands.js";
import { INVALID_INPUT, OPERATION_FAILED } from "./errors.js";

export const inputHandler = (answer) => {
  let firstElement = answer.split(" ")[0].trim();
  let out = "";
  let arrOfCommands = Object.values(allCommands);
  let validCommands = arrOfCommands.flat().includes(firstElement);
  if (!validCommands) {
    return false;
  } else {
    arrOfCommands.forEach((arr, i) => {
      if (arr.some((word) => answer.startsWith(word))) {
        out += Object.keys(allCommands)[i];
      }
    });
    return out;
  }
};

export const pathHandlerforOnePath = (pathTo) => {
  let arr = pathTo.trim().split(" ");
  let [command, pathToFile] = arr;
  
  try {
    if (!path.isAbsolute(pathToFile)) {
      pathToFile = path.join(cwd(), pathToFile);
    } else {
      pathToFile = pathToFile;
    }

    return getOnePathCommand(command, pathToFile);
  
} catch (err) {
    if (err.code === "ENOENT") console.log("no such file or directory");
  }
};

export const pathHandlerforTwoPath = (arrPaths) => {
  return arrPaths.map((path) => pathHandlerforOnePath(path));
};

export const argsHandlerForOs = (args) => {
  args = args.split(" ").slice(-1).join("");
  if (!args.startsWith("--")) {
    return INVALID_INPUT;
  } else {
    args = args.split("--").join("");
    return getOSCommand(args);
  }
};

export const handlerWithoutArgs = async (answer) => {
  return answer.trim() === "ls" ? list(cwd()) : up(cwd());
};

// export const pathHandlerforOnePath = (pathTo) => {
//     let arr = pathTo.trim().split(' ')

//       let [command, pathToFile] = arr
//    // console.log( pathToFile, 'from input');
//       try {
//         if (!path.isAbsolute(pathToFile)) {
//           pathToFile = path.join(cwd(), pathToFile);
//           //console.log(pathToFile, 'pathTofile');
//         } else {
//            pathToFile = pathToFile
//         }

//         //console.log(command.trim(), pathToFile, 'from handler');
//         return getOnePathCommand(command, pathToFile)
//       } catch (err) {
//         if (err.code === "ENOENT") console.log("no such file or directory");
//       }
//   };
