import { osCommandsObj, onePathCommandsObj} from "../commands/commands.js";
import { INVALID_INPUT, OPERATION_FAILED, NO_SUCH_COMMAND } from "../errors/errors.js";

export const getOSCommand = (command) => {
        if(!Object.keys(osCommandsObj).includes(command)) return INVALID_INPUT+ NO_SUCH_COMMAND 
    return osCommandsObj[command];
  };
  
export const getOnePathCommand = (command, pathTo) => {
    
      
      return onePathCommandsObj[command](pathTo);
    };