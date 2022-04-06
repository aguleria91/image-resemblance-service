"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Reads the command line arguments and returns the third argument
  which is expected to be a file path of the csv
*/
const ReadCli = () => {
    // Read the command line arguments and 
    // remove the first (path to node js) and second arg (location of the script).
    const args = process.argv.slice(2);
    // Check if the argument has 
    if (args.length == 0) {
        throw new Error("Please pass file path in the command line");
    }
    return args[0];
};
exports.default = ReadCli;
