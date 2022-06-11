import readline from "readline";
import { chdir, cwd, stdin, stdout } from "process";
import { EOL, homedir } from "os";

import { inputHandler, pathHandlerforOnePath, pathHandlerforTwoPath, argsHandlerForOs, handlerWithoutArgs } from "./handlers.js";

const homeDir = homedir();

const userName =
  process.argv.slice(-1).join("").split("=").slice(-1).join("") || "User";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

chdir(homeDir);

rl.question(
  `Welcome to the File Manager, ${userName}!${EOL}You are currently in ${homeDir}${EOL}`,
  (answer) => {
    console.log(`Ok, ${userName}`);
  }
);
rl.on("line", async(answer) => {
  if (answer.startsWith(".exit")) rl.close();
  switch (inputHandler(answer)) {
    case "os":
      console.log(argsHandlerForOs(answer));
      break;
    case "onePath":
      console.log(pathHandlerforOnePath(answer));
      break;
    case "twoPath":
      console.log(pathHandlerforTwoPath(answer));
      break;
    case "withoutArgs":
       console.log(await handlerWithoutArgs(answer));
      break;
    case false:
      console.log("Invalid input");
      break;
    default:
      break;
  }
});

rl.on("line", (answer) => {
  if (answer.startsWith(".exit")) rl.close();
});

rl.on("close", () => {
  console.log(`${EOL}Thank you for using File Manager, ${userName}${EOL}`);
});

// rl.on("line", (answer) => {
//     if (answer.startsWith("ls")) list(cwd());
//   });

//   rl.on("line", (answer) => {
//     if (answer.startsWith("up")) {
//       up(cwd());
//       console.log(`You are currently in: ${cwd()}`);
//     }
//   });
//   rl.on("line", (answer) => {
//     if (answer.startsWith("cd")) {
//       answer = answer.split(" ").slice(-1).join("");
//       cd(answer);
//       console.log(`You are currently in: ${cwd()}`);
//     }
//   });
//   rl.on("line", (answer) => {
//     if (answer.startsWith("os")) {
//       answer = answer.split(" ").slice(-1).join("").split("--").join("");
//       getOSComand(answer);
//     }
//   });

//   rl.on("line", (answer) => {
//     if (answer.startsWith("cat")) {
//       answer = answer.split(" ").slice(-1).join("");
//       const pathToFile = path.join(cwd(), answer);
//       read(pathToFile);
//     }
//   });

//   rl.on("line", (answer) => {
//     if (answer.startsWith("add")) {
//       answer = answer.split(" ").slice(-1).join("");
//       const pathToFile = path.join(cwd(), answer);
//       create(pathToFile);
//     }
//   });

//   rl.on("line", (answer) => {
//     if (answer.startsWith("cp")) {
//       answer = answer
//         .split(" ")
//         .slice(-2)
//         .map((elem) => {
//           return path.join(cwd(), elem);
//         });

//       copy(answer);
//     }
//   });

//   rl.on("line", (answer) => {
//     if (answer.startsWith("mv")) {
//       answer = answer
//         .split(" ")
//         .slice(-2)
//         .map((elem) => {
//           return path.join(cwd(), elem);
//         });

//       move(answer);
//     }
//   });

//   rl.on("line", (answer) => {
//     if (answer.startsWith("rn")) {
//       answer = answer
//         .split(" ")
//         .slice(-2)
//         .map((elem) => {
//           return path.join(cwd(), elem);
//         });

//       renameFile(answer);
//     }
//   });
//   rl.on("line", (answer) => {
//       if (answer.startsWith("rm")) {
//         answer = answer.split(" ").slice(-1).join("");
//         const pathToFile = path.join(cwd(), answer);
//         removeFile(pathToFile);
//       }
//     });
