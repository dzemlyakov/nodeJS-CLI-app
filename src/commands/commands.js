import { cd } from "../functions/nwd.js"
import { read, create, removeFile, move, copy, renameFile } from "../functions/basicFSOperations.js";
import { calculateHash } from "../functions/hashCalc.js";
import { compress, decompress } from "../functions/compressDecompress.js";
import { architecture, cpuInfo, Eol, homeDir, userName } from "../functions/OSOperations.js";

export const allCommands = {
    "withoutArgs": ["up", "ls"],
    "os": ["os"],
    "onePath": ["cd", "cat", "add", "hash", "rm"],
    "twoPath": ["rn", "cp", "mv", "compress", "decompress"],
    "exit":['.exit']
  };

export const osCommandsObj = {
    EOL: Eol,
    cpus: cpuInfo,
    homedir: homeDir,
    architecture: architecture,
    username: userName
  };  

export const onePathCommandsObj = {
  "cd": cd, 
  "cat": read, 
  "add": create, 
  "hash": calculateHash,
  "rm": removeFile

}  

export const twoPathCommandsObj = {
  "rn": renameFile, 
  "cp": copy, 
  "mv": move,
  "compress": compress,
  "decompress": decompress
} 