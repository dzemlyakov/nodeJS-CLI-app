import {list, up, cd, getOSCommand, read, create, copy, move, renameFile, removeFile,
} from "./functions.js";
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
  if (!pathToDir) console.log("Invalid input");
  if (Array.isArray(pathTo))
    try {
      if (!path.isAbsolute(pathTo)) {
        return path.join(cwd(), pathTo);
      } else {
        return pathTo;
      }
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
    return INVALID_INPUT
  } else {
    args = args.split("--").join("");
    return getOSCommand(args);
  }
};

export const handlerWithoutArgs = async (answer) => {
  return answer.trim() === 'ls' ? (list(cwd())) : up(cwd());
};
