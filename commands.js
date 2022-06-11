import { EOL, arch, homedir, cpus, userInfo } from "os";
export const allCommands = {
    "withoutArgs": ["up", "ls"],
    "os": ["os"],
    "onePath": ["cd", "cat", "add", "hash"],
    "twoPath": ["rm", "rn", "cp", "mv", "compress", "decompress"],
  };

export const osCommandsObj = {
    EOL: JSON.stringify(EOL),
    cpus: cpus(),
    homedir: homedir(),
    architecture: arch(),
    username: userInfo().username,
  };  