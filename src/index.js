import readline from "readline";
import { chdir, stdin, stdout } from "process";

import { inputHandler, pathHandlerforOnePath, pathHandlerforTwoPath, argsHandlerForOs, handlerWithoutArgs } from "./handlers/handlers.js";
import { INVALID_INPUT } from "./errors/errors.js";
import { goodbye, greeting, homeDir, pwdForUser } from "./userInfo/userCLI.js";


const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

chdir(homeDir);
greeting()

rl.on("line", async (answer) => {
  
  switch (inputHandler(answer)) {
    case "os":
      argsHandlerForOs(answer);
      pwdForUser()
      break;
    case "onePath":
      pathHandlerforOnePath(answer);
      break;
    case "twoPath":
      pathHandlerforTwoPath(answer);
      break;
    case "withoutArgs":
       await handlerWithoutArgs(answer);
       pwdForUser()
      break;
    case false:
      console.log(INVALID_INPUT);
      break;
    case "exit":
        rl.close()
        break;
    default:
      break;
  }
});

rl.on("close", () => {
  goodbye()
  process.exit(0)
});
