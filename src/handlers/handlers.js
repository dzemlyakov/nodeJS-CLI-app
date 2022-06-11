import { chdir, cwd } from "process";
import path from "path";

import { list, up } from "../functions/nwd.js";
import { getOSCommand, getOnePathCommand, getTwoPathCommand } from "../getters/getters.js";
import { allCommands } from "../commands/commands.js";
import { INVALID_INPUT, OPERATION_FAILED } from "../errors/errors.js";

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

export const pathHandlerforOnePath = (answerFromUser) => {
  let arrOfCommands = answerFromUser.trim().split(" ");
  let [command, pathToFile] = arrOfCommands;
  
  try {
    if (!path.isAbsolute(pathToFile)) {
      pathToFile = path.join(cwd(), pathToFile);
    } else {
      pathToFile = pathToFile;
    }

    return getOnePathCommand(command, pathToFile);
  
} catch (err) {
    if (err.code === "ENOENT") console.log(OPERATION_FAILED+NO_SUCH_FILE);
  }
};

export const pathHandlerforTwoPath = (answerFromUser) => {
  let arrOfCommands = answerFromUser.trim().split(" ");
  if (!arrOfCommands ||arrOfCommands.length !== 3) console.log(INVALID_INPUT);

  let [command, ...rest] = arrOfCommands;

  let paths = rest.map((pathToFile)=> {
    if (!path.isAbsolute(pathToFile)) {
      return pathToFile = path.join(cwd(), pathToFile);
    } else {
      return pathToFile = pathToFile;
    }
  })
  
 
  
  return getTwoPathCommand(command, paths);
  
  
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
