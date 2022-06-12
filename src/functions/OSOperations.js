import { cpus, EOL, arch, homedir, userInfo } from "os";

export const cpuInfo = () =>{
    let cpuArr = cpus()
    let architecture = arch()
    let newCPUArr = cpuArr.map((cpu) =>{
      let speed = architecture === 'arm64' ? cpu.speed/10+'GHz' : cpu.speed/1000+'GHz'
      return {
            model: cpu.model,
            speed: speed
        }
    })
    
    console.log( `Number of CPUs: ${cpuArr.length} ${EOL}`, newCPUArr);
}

export const Eol = () =>  console.log(JSON.stringify(EOL)); 
export const homeDir = () =>  console.log(homedir()); 
export const architecture = () =>  console.log(arch()); 
export const userName = () =>  console.log(userInfo().username); 

