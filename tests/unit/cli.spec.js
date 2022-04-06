"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const cli_1 = __importDefault(require("../../src/cli"));
const mocha_1 = require("mocha");
const filePath = './tmp/cli/path-passed/images.csv';
describe("Cli Module", () => {
    describe("Read Cli", () => {
        let temp = [];
        beforeEach(() => {
            temp = Object.assign([], process.argv);
            process.argv = process.argv.slice(0, 2); // Remove unnecessary arguments included by the test module 
        });
        it("should return an error if no arguments is passed in command line", () => {
            (0, chai_1.expect)(cli_1.default).throw("Please pass file path in the command line");
        });
        it("ReadCli should return a path if argument is passed", () => {
            process.argv.push(filePath); // Push the test file path of the csv
            const receivedPath = (0, cli_1.default)();
            (0, chai_1.expect)(receivedPath).eq(filePath);
        });
        (0, mocha_1.afterEach)(() => {
            // Remove the file path from process argument
            process.argv = temp;
        });
    });
});
