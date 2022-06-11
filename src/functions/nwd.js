import { readdir } from "fs/promises";
import { chdir, cwd } from "process";
import path from "path";
import { INVALID_INPUT, OPERATION_FAILED, NO_SUCH_FILE } from "../errors/errors.js";

export const list = async(dir) => {
    try {
    let filenames = await readdir(dir)
    return filenames
  } catch (err) {
    console.error(err);
  }
};

export const up = (current) => {
  if(current === path.parse(current).root){
    chdir(current);
  }else {
    let levelUp = path.join(current, "../");
    chdir(levelUp);
  }
   
  return cwd();
};

 
export const cd = (pathToDir) => {
    try {
        chdir(pathToDir);
        console.log(`You are currently in: ${cwd()}`);
      } 
     catch (err) {
      if (err.code === "ENOENT") console.log(OPERATION_FAILED+NO_SUCH_FILE);
    }
  
}
