import { readdir } from "fs/promises";
import { chdir } from "process";
import path from "path";
import { OPERATION_FAILED, NO_SUCH_FILE } from "../errors/errors.js";
import { pwdForUser } from "../userInfo/userCLI.js";

export const list = async(dir) => {
    try {
    let filenames = await readdir(dir)
     console.log(filenames);
  } catch (err) {
    console.log(OPERATION_FAILED)
  }
};

export const up = (current) => {
  if(current === path.parse(current).root){
   return chdir(current);
  }else {
    let levelUp = path.join(current, "../");
   return chdir(levelUp);
  }  
};

export const cd = (pathToDir) => {
    try {
        chdir(pathToDir);
        pwdForUser()
      } 
     catch (err) {
      if (err.code === "ENOENT") console.log(OPERATION_FAILED+NO_SUCH_FILE);
    }
}
