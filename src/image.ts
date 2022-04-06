import fs from 'fs';
import compareImages from 'resemblejs/compareImages';
import { InputCsvData } from './csv';

interface DiffOutput {
  image1: string;
  image2: string;
  similar: number;
  elapsed: number;
}

interface ReadImageOutput {
  firstImageData: Buffer;
  secondImageData: Buffer;
}

export async function getCsvOutput(csvData: InputCsvData[]) {
  let promises = [];

  for (let i = 0; i < csvData.length; i++) {
    promises.push(diffImage(csvData[i].image1, csvData[i].image2, i));
  }

  const data = await Promise.all(promises);

  return data;
}

/**
 * 
 * @param firstImagePath 
 * @param secondImagePath 
 * @returns 
 */
export async function readImage(firstImagePath: string, secondImagePath: string): Promise<ReadImageOutput> {

  if (!fs.existsSync(firstImagePath) || !fs.existsSync(secondImagePath)) {
    throw new Error("Images do not exist in the given path.");
  }

  const [firstImageData, secondImageData] = await Promise.all([
    fs.readFileSync(firstImagePath),
    fs.readFileSync(secondImagePath),
  ]);

  return { firstImageData, secondImageData };
}

/**
 * 
 * @param firstImagePath 
 * @param secondImagePath 
 * @param index 
 * @returns DiffOutput
 */
export async function diffImage(firstImagePath: string, secondImagePath: string, index: number): Promise<DiffOutput> {
  const options = {
    output: {
      largeImageThreshold: 1200,
      useCrossOrigin: false,
      outputDiff: true
    },
    scaleToSameSize: true,
  };

  const { firstImageData, secondImageData } = await readImage(firstImagePath, secondImagePath);

  if (firstImageData === undefined || firstImageData === undefined) {
    throw new Error("Error while comparing the images.")
  }

  // Calculate the time elapsed when comparing the images
  const start = new Date().getTime();

  // Passing image data of both images into resemblejs package to get the rawMisMatchPercentage
  const { rawMisMatchPercentage } = await compareImages(firstImageData, secondImageData, options);

  if (rawMisMatchPercentage === undefined) {
    throw new Error("Error while comparing the images.")
  }

  const end = new Date().getTime();

  const elapsed = (end - start) / 1000; // get elapsed time in seconds

  const similar = (parseInt((rawMisMatchPercentage).toFixed(2))) / 100; // Converting to John's score

  return { image1: firstImagePath, image2: secondImagePath, similar, elapsed }
}
