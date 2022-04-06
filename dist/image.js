"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffImage = exports.readImage = exports.getCsvOutput = void 0;
const fs_1 = __importDefault(require("fs"));
const compareImages_1 = __importDefault(require("resemblejs/compareImages"));
async function getCsvOutput(csvData) {
    let promises = [];
    for (let i = 0; i < csvData.length; i++) {
        promises.push(diffImage(csvData[i].image1, csvData[i].image2, i));
    }
    const data = await Promise.all(promises);
    return data;
}
exports.getCsvOutput = getCsvOutput;
/**
 *
 * @param firstImagePath
 * @param secondImagePath
 * @returns
 */
async function readImage(firstImagePath, secondImagePath) {
    if (!fs_1.default.existsSync(firstImagePath)) {
        throw new Error(`Images do not exist in the given path.${firstImagePath}`);
    }
    if (!fs_1.default.existsSync(secondImagePath)) {
        throw new Error(`Images do not exist in the given path.${secondImagePath}`);
    }
    const [firstImageData, secondImageData] = await Promise.all([
        fs_1.default.readFileSync(firstImagePath),
        fs_1.default.readFileSync(secondImagePath),
    ]);
    return { firstImageData, secondImageData };
}
exports.readImage = readImage;
/**
 *
 * @param firstImagePath
 * @param secondImagePath
 * @param index
 * @returns DiffOutput
 */
async function diffImage(firstImagePath, secondImagePath, index) {
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
        throw new Error("Error while comparing the images.");
    }
    // Calculate the time elapsed when comparing the images
    const start = new Date().getTime();
    // Passing image data of both images into resemblejs package to get the rawMisMatchPercentage
    const { rawMisMatchPercentage } = await (0, compareImages_1.default)(firstImageData, secondImageData, options);
    if (rawMisMatchPercentage === undefined) {
        throw new Error("Error while comparing the images.");
    }
    const end = new Date().getTime();
    const elapsed = (end - start) / 1000; // get elapsed time in seconds
    const similar = (parseInt((rawMisMatchPercentage).toFixed(2))) / 100; // Converting to John's score
    return { image1: firstImagePath, image2: secondImagePath, similar, elapsed };
}
exports.diffImage = diffImage;
