import { cd } from "../functions/nwd.js"
import { read, create, removeFile, move, copy, renameFile } from "../functions/basicFSOperations.js";
import { calculateHash } from "../functions/hashCalc.js";

import { EOL, arch, homedir, cpus, userInfo } from "os";

export const allCommands = {
    "withoutArgs": ["up", "ls"],
    "os": ["os"],
    "onePath": ["cd", "cat", "add", "hash", "rm"],
    "twoPath": ["rn", "cp", "mv", "compress", "decompress"]
  };

export const osCommandsObj = {
    EOL: JSON.stringify(EOL),
    cpus: cpus(),
    homedir: homedir(),
    architecture: arch(),
    username: userInfo().username,
  };  

export const onePathCommandsObj = {
  "cd":cd, 
  "cat":read, 
  "add":create, 
  "hash":calculateHash,
  "rm":removeFile

}  

export const twoPathCommandsObj = {
  "rn":renameFile, 
  "cp": copy, 
  "mv": move
  //"compress", 
  //"decompress"
} 