import { parse as csvParser } from 'fast-csv';
import { writeToPath } from '@fast-csv/format';
import * as path from 'path';
import * as fs from 'fs';

export interface InputCsvData {
  image1: string;
  image2: string;
}

interface OutputCsvData {
  image1: string;
  image2: string;
  similar: number;
  elapsed: number;
}

/**
 * Function to readCsv and return parsed data
 * @param path string
 * @returns InputCsvData[]
 */
export async function readCsv(path: string): Promise<InputCsvData[]> {
  return new Promise((resolve, reject) => {
    let rows: InputCsvData[] = [];

    // Reads a CSV from the given path
    fs.createReadStream(path)
      .pipe(csvParser({ headers: true }))
      .on('error', () => reject)
      .on('data', row => {
        if (Object.getOwnPropertyNames(row).length !== 2) {
          reject("Invalid CSV file.")
        }
        rows.push(row);
      })
      .on('end', () => resolve(rows));
  })
}

/**
 * Function which takes data as input and writes it to a new csv file
 * @param data 
 * @param path 
 * @returns 
 */
export function writeCsv(data: OutputCsvData[], path: string) {
  if (data.length === 0) {
    throw new Error("No data to write in CSV file.");
  }

  let rows: Array<any> = [
    ['image1', 'image2', 'similar', 'elapsed']
  ]

  for (let i = 0; i < data.length; i++) {
    if (data[i].image1 === undefined || data[i].image2 === undefined || data[i].similar === undefined || data[i].elapsed === undefined) {
      throw new Error("Invalid data to write in CSV file.");
    }
    // Create an array of strings for each row.
    rows.push([data[i].image1, data[i].image2, data[i].similar, data[i].elapsed]);
  }

  // Create a new path to write the CSV
  let newPath = path.substring(0, path.lastIndexOf('/'));
  let filename = path.substring(path.lastIndexOf('/') + 1);

  newPath = newPath + '/out_' + filename;

  // Writes a CSV to a given path
  const writeSuccess = new Promise((resolve, reject) => {
    writeToPath(newPath, rows)
      .on('error', () => reject)
      .on('finish', () => resolve(true));
  });

  return { writeSuccess, newPath };
}
