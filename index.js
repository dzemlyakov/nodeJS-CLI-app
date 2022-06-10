import readline from "readline";
import { chdir, cwd } from "process";
import { EOL, arch, homedir, cpus, userInfo } from "os";
import { createReadStream, createWriteStream } from "fs";

import { readdir, rename, rm } from "fs/promises";

import { fileURLToPath } from "url";
import path, { dirname } from "path";

const homeDir = homedir();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirPath = path.join(__dirname);

const userCommandsObj={
    'cat': read(),
    'add': create(),
    'rn': renameFile(),
    'cp': copy(),
    'mv': move(),
    'rm': removeFile()
}
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
  if (!pathToDir) {
    console.log("Invalid input");
  } else {
    try {
      if (path.isAbsolute(pathToDir)) {
        chdir(pathToDir);
      } else {
        let newDir = path.join(cwd(), pathToDir);
        chdir(newDir);
      }
    } catch (err) {
      if (err.code === "ENOENT") console.log("no such file or directory");
    }
  }
};

const getOSComand = (comand) => {
  const comandsObj = {
    EOL: JSON.stringify(EOL),
    cpus: cpus(),
    homedir: homedir(),
    architecture: arch(),
    username: userInfo().username,
  };
  return console.log(comandsObj[comand], EOL);
};

const read = (filename) => {
  const rs = createReadStream(filename);
  rs.on("data", (chunk) => {
    console.log(chunk.toString());
  }).on("error", (e) => {
    console.log(e.message);
  });
};

const create = (filename) => {
  const ws = createWriteStream(filename);
  ws.on("finish", () => {
    console.log("file has written");
  }).on("error", (e) => {
    console.log(e.message);
  });
  ws.end();
};
const copy = ([src, dest]) => {
  const rs = createReadStream(src);
  const ws = createWriteStream(dest);

  rs.on("end", () => {
    console.log("file has been copied");
  })
    .pipe(ws)
    .on("error", (e) => {
      console.log(e.message);
    });
};

const move = ([src, dest]) => {
  const rs = createReadStream(src);
  const ws = createWriteStream(dest);

  rs.on("close", () => {
    rm(src);
    console.log("file has been moved");
  })
    .pipe(ws)
    .on("error", (e) => {
      console.log(e.message);
    });
};
const renameFile = ([oldPath, newPath]) => {
  try {
    rename(oldPath, newPath);
  } catch (err) {
    console.log(err.message);
  }
};

const removeFile = (filename) =>{
    try {
        rm(filename)
        console.log('file has been removed');
    } catch (err) {
        console.log(err.message);
    }
}

const userName = process.argv.slice(-1).join("").split("=").slice(-1).join("");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
process.chdir(homeDir);

rl.question(
  `Welcome to the File Manager, ${userName}!${EOL}You are currently in ${homeDir}${EOL}`,
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
    answer = answer.split(" ").slice(-1).join("");
    cd(answer);
    console.log(`You are currently in: ${cwd()}`);
  }
});
rl.on("line", (answer) => {
  if (answer.startsWith("os")) {
    answer = answer.split(" ").slice(-1).join("").split("--").join("");
    getOSComand(answer);
  }
});

rl.on("line", (answer) => {
  if (answer.startsWith("cat")) {
    answer = answer.split(" ").slice(-1).join("");
    const pathToFile = path.join(cwd(), answer);
    read(pathToFile);
  }
});

rl.on("line", (answer) => {
  if (answer.startsWith("add")) {
    answer = answer.split(" ").slice(-1).join("");
    const pathToFile = path.join(cwd(), answer);
    create(pathToFile);
  }
});



rl.on("line", (answer) => {
  if (answer.startsWith("cp")) {
    answer = answer
      .split(" ")
      .slice(-2)
      .map((elem) => {
        return path.join(cwd(), elem);
      });

    copy(answer);
  }
});

rl.on("line", (answer) => {
  if (answer.startsWith("mv")) {
    answer = answer
      .split(" ")
      .slice(-2)
      .map((elem) => {
        return path.join(cwd(), elem);
      });

    move(answer);
  }
});

rl.on("line", (answer) => {
  if (answer.startsWith("rn")) {
    answer = answer
      .split(" ")
      .slice(-2)
      .map((elem) => {
        return path.join(cwd(), elem);
      });

    renameFile(answer);
  }
});
rl.on("line", (answer) => {
    if (answer.startsWith("rm")) {
      answer = answer.split(" ").slice(-1).join("");
      const pathToFile = path.join(cwd(), answer);
      removeFile(pathToFile);
    }
  });

rl.on("close", () => {
  console.log(`${EOL}Thank you for using File Manager, ${userName}${EOL}`);
});
