import readline from 'readline';
import os from 'os'

const userName = process.argv.slice(-1).join('').split('=').slice(-1).join('')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`Welcome to the File Manager, ${userName}!\n\nYou are currently in ${os.homedir}\n`, (answer)=>{
    console.log(`Ok, ${userName}`);
});
rl.on('line', (answer) =>{
    if(answer.startsWith('.exit')) rl.close()
})
rl.on('close', ()=>{
    console.log(`\nThank you for using File Manager, ${userName}\n`);
})