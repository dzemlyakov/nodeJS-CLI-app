import { existsSync } from "fs";
import path from "path";
import {
  osCommandsObj,
  onePathCommandsObj,
  twoPathCommandsObj,
} from "../commands/commands.js";
import {
  INVALID_INPUT,
  OPERATION_FAILED,
  NO_SUCH_COMMAND,
} from "../errors/errors.js";

export const getOSCommand = (command) => {
  if (!Object.keys(osCommandsObj).includes(command))
    return INVALID_INPUT + NO_SUCH_COMMAND;
  return osCommandsObj[command];
};

export const getOnePathCommand = (command, pathTo) => {
  let exists
  if (command.trim() === 'add') {
    exists = existFolderOrFile(path.parse(pathTo).dir)
  } else {
     exists = existFolderOrFile(pathTo);
  }
   
  return exists
    ? onePathCommandsObj[command](pathTo)
    : console.log(OPERATION_FAILED);
};

export const getTwoPathCommand = (command, paths) => {
  let [src, dest] = paths;
  if (existFolderOrFile(src) && existFolderOrFile(path.parse(dest).dir)) {
    return twoPathCommandsObj[command](paths);
  } else {
    console.log(OPERATION_FAILED);
  }
};

const existFolderOrFile = (pathToFile) => {
  return existsSync(pathToFile) ? true : false;
};
