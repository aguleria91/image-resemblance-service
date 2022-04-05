import "mocha";
import { expect } from "chai";
import ReadCli from '../../src/cli'
import { afterEach } from "mocha";

const filePath = './tmp/cli/path-passed/images.csv'

describe("Cli Module", () => {
  
  describe("ReadCli()", () => {
    let temp: string[] = [];

    beforeEach(() => {
      temp = Object.assign([], process.argv);
      
      process.argv = process.argv.slice(0, 2);  // Remove unnecessary arguments included by the test module 
    })

    it("should return an error if no arguments is passed in command line", () => {
      expect(ReadCli).throw("Please pass file path in the command line")
    })

    it("ReadCli should return a path if argument is passed", () => {
      process.argv.push(filePath); // Push the test file path of the csv
      const receivedPath = ReadCli()
      expect(receivedPath).eq(filePath)
    })

    afterEach(() => {
      // Remove the file path from process argument
      process.argv = temp;
    })
  })

})
