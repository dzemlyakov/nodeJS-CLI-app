import { existsSync } from "fs";
import path from "path";
import { cwd } from "process";
import {
  osCommandsObj,
  onePathCommandsObj,
  twoPathCommandsObj,
  withoutArgsCommandsObj,
} from "../commands/commands.js";
import {
  INVALID_INPUT,
  OPERATION_FAILED,
  NO_SUCH_COMMAND,
  NO_SUCH_FILE
} from "../errors/errors.js";

export const getOSCommand = (command) => {
  if (!Object.keys(osCommandsObj).includes(command))
    return console.log(INVALID_INPUT + NO_SUCH_COMMAND);
  return osCommandsObj[command]();
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
    : console.log(OPERATION_FAILED+NO_SUCH_FILE);
};

export const getTwoPathCommand = (command, paths) => {
  let [src, dest = cwd()] = paths;
  console.log("🚀 ~ getTwoPathCommand ~ dest", dest)
  
  
  if (existFolderOrFile(src) && existFolderOrFile(path.parse(dest).dir)) {
    return twoPathCommandsObj[command](src, dest);
  } else {
    console.log(OPERATION_FAILED+NO_SUCH_FILE);
  }
};
export const getWithoutArgsCommand = (command)=>{
  if (!Object.keys(withoutArgsCommandsObj).includes(command))
  return console.log(INVALID_INPUT + NO_SUCH_COMMAND);
return withoutArgsCommandsObj[command](cwd());
}

const existFolderOrFile = (pathToFile) => {
  return existsSync(pathToFile) ? true : false;
};
