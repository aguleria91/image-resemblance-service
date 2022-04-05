import fs from 'fs';
import ReadCli from "./cli";
import { readCsv } from "./csv";

function main() {
  // Get file path from Cli
  const filePath = ReadCli();

  if (!fs.existsSync(filePath)) {
    throw new Error("CSV file does not exist in the provided path.");
  }
  // Pass file path to csv reader and get the images paths
  const csvData = readCsv(filePath);

  // Convert the images to a standard format and size

  // Compare the images to get a John score

  // Write the a csv file with the pair of images and their score


}

main();