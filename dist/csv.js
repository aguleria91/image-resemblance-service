"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCsv = exports.readCsv = void 0;
const fast_csv_1 = require("fast-csv");
const format_1 = require("@fast-csv/format");
const fs = __importStar(require("fs"));
/**
 * Function which takes file path as argument and reads the file
 * @param path string
 */
async function readCsv(path) {
    return new Promise((resolve, reject) => {
        let rows = [];
        // Reads a CSV from the given path
        fs.createReadStream(path)
            .pipe((0, fast_csv_1.parse)({ headers: true }))
            .on('error', () => reject)
            .on('data', row => {
            if (Object.getOwnPropertyNames(row).length !== 2) {
                reject("Invalid CSV file.");
            }
            rows.push(row);
        })
            .on('end', () => resolve(rows));
    });
}
exports.readCsv = readCsv;
/**
 * Function which takes data as input and writes it to a csv file
 * @param path string
 */
function writeCsv(data, path) {
    if (data.length === 0) {
        throw new Error("No data to write in CSV file.");
    }
    let rows = [
        ['image1', 'image2', 'similar', 'elapsed']
    ];
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
        (0, format_1.writeToPath)(newPath, rows)
            .on('error', () => reject)
            .on('finish', () => resolve(true));
    });
    return { writeSuccess, newPath };
}
exports.writeCsv = writeCsv;
