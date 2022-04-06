"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cli_1 = __importDefault(require("./cli"));
const csv_1 = require("./csv");
const image_1 = require("./image");
async function main() {
    // Get file path from Cli
    const filePath = (0, cli_1.default)();
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error("CSV file does not exist in the provided path.");
    }
    // Pass file path to csv reader and get the images paths
    const csvData = await (0, csv_1.readCsv)(filePath);
    // Convert the images to a standard format and size
    const csvWriteData = await (0, image_1.getCsvOutput)(csvData);
    // Compare the images to get a John score
    // Write the a csv file with the pair of images and their score
    const { writeSuccess, newPath } = await (0, csv_1.writeCsv)(csvWriteData, filePath);
    // Write the a csv file with the pair of images and their score
    if (!writeSuccess) {
        throw new Error("Could not write the csv file.");
    }
    console.log("Your CSV file has been successfully written to " + newPath);
}
main();
