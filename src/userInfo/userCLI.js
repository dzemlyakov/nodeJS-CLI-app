import { EOL, homedir } from "os";
import { cwd } from "process";


export const homeDir = homedir();
export const pwdForUser = () => console.log(`${EOL}You are currently in: ${cwd()}${EOL}`)

export const userName =
  process.argv.slice(-1).join("").split("=").slice(-1).join("") || "User";

export const greeting = () => console.log(`Welcome to the File Manager, ${userName}!${EOL}You are currently in ${homeDir}${EOL}`);
export const goodbye = () => console.log(`${EOL}Thank you for using File Manager, ${userName}`);