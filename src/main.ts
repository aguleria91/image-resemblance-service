import fs from 'fs';
import ReadCli from "./cli";
import { readCsv, writeCsv } from "./csv";
import { getCsvOutput } from "./image";

async function main() {
  // Get file path from Cli
  const filePath = ReadCli();

  if (!fs.existsSync(filePath)) {
    throw new Error("CSV file does not exist in the provided path.");
  }
  // Pass file path to csv reader and get the images paths
  const csvData = await readCsv(filePath);

  // Compare the images to get the csv data
  const csvWriteData = await getCsvOutput(csvData)

  // Write the a csv file with the pair of images and their score
  const { writeSuccess, newPath } = await writeCsv(csvWriteData, filePath);

  // Check Write success of the csv file
  if (!writeSuccess) {
    throw new Error("Could not write the csv file.")
  }

  console.log("Your Image Resemblence score has been written to " + newPath)

}

main();