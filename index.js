import readline from "readline";
import { chdir, cwd } from "process";
import os from "os";
import { readdir } from "fs/promises";

import { fileURLToPath } from "url";
import path, { dirname } from "path";

const homedir = os.homedir();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirPath = path.join(__dirname);

const list = async (dir) => {
  try {
    const files = await readdir(dir);

    console.log(files);
  } catch (err) {
    console.error(err);
  }
};

const up = (current) => {
  let levelUp = path.join(current, "../");
  chdir(levelUp);
  return cwd();
};
const cd = (pathToDir) => {
    let newDir = path.join(cwd(), pathToDir)
    chdir(newDir)
}

const userName = process.argv.slice(-1).join("").split("=").slice(-1).join("");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
process.chdir(homedir);

rl.question(
  `Welcome to the File Manager, ${userName}!\n\nYou are currently in ${homedir}\n`,
  (answer) => {
    console.log(`Ok, ${userName}`);
  }
);
rl.on("line", (answer) => {
  if (answer.startsWith(".exit")) rl.close();
});
rl.on("line", (answer) => {
  if (answer.startsWith("ls")) list(cwd());
});

rl.on("line", (answer) => {
  if (answer.startsWith("up")) {
    up(cwd());
    console.log(`You are currently in: ${cwd()}`);
  }
});
rl.on("line", (answer) => {
    if (answer.startsWith("cd")) {
      answer = answer.split(' ').slice(-1).join('')
        cd(answer);
      console.log(`You are currently in: ${cwd()}`);
    }
  });

rl.on("close", () => {
  console.log(`\nThank you for using File Manager, ${userName}\n`);
});
