
# Node.js File manager CLI app

## Description

This is my implementation of File Manager using Node.js APIs.

The file manager is able to do the following things:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

## How to run
Clone this repository with comand:
`git clone`

To run this app open the terminal (your curent work directory should be: ***Users/../nodeJS-CLI-app/*** ) and follow this instructions:
 

```bash
npm run start -- --username=your_username
``` 
write down your name

#### List of operations and their syntax:
- **Navigation & working directory (nwd)**
    - Go upper from current directory (when you are in the root folder this operation doesn't change working directory)  
    ```bash
    up
    ```
    - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)
    ```bash
    cd path_to_directory
    ```
    - List all files and folder in current directory and print it to console
    ```bash
    ls
    ```
- **Basic operations with files**
    - Read file and print it's content in console: 
    ```bash
    cat path_to_file
    ```
    - Create empty file in current working directory: 
    ```bash
    add new_file_name
    ```
    - Rename file: 
    ```bash
    rn path_to_file new_filename
    ```
    - Copy file (It will copy file to any existing folder): 
    ```bash
    cp path_to_file path_to_new_directory
    ```
    - Move file (same as copy but initial file is deleted. It will move file to any existing folder): 
    ```bash
    mv path_to_file path_to_new_directory
    ```
    - Delete file: 
    ```bash
    rm path_to_file
    ```
- **Operating system info** (prints following information in console)
    - Get EOL (default system End-Of-Line)  
    ```bash
    os --EOL
    ```
    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)  
    ```bash
    os --cpus
    ```
    - Get home directory: 
    ```bash
    os --homedir
    ```
    - Get current *system user name* 
    ```bash
    os --username
    ```
    - Get CPU architecture for which Node.js binary has compiled  
    ```bash
    os --architecture
    ```
- **Hash calculation**  
    - Calculate hash for file and print it into console (**the file should not be empty**) 
    ```bash
    hash path_to_file
    ```
- **Compress and decompress operations**  
    - Compress file (using Brotli algorithm)  
    ```bash
    compress path_to_file path_to_destination
    ```
    - Decompress file (using Brotli algorithm)  
    ```bash
    decompress path_to_file path_to_destination
    ```
  

***Possible use cases:***  
    
    ```for example: 
    hash file.txt or hash /Users/username/Desktop/file.txt 
    
    add some_file.txt or add /Users/username/Desktop/some_file.txt

    cp /Users/username/Desktop/file.txt  someFolder/ 
    
    mv /Users/username/Desktop/file.txt  someFolder/ 
    
    (in the same folder) compress file.txt file.txt 
    or 
    compress /Users/username/Desktop/file.txt  /Users/username/Desktop/someFolder/file.txt 
    ```
