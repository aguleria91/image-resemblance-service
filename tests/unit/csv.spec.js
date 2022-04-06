"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const csv_1 = require("../../src/csv");
const invalidData = require('../mock/csv/invalid-data.mock.json');
const validData = require('../mock/csv/valid-data.mock.json');
const csvPath = process.cwd() + '/tests/mock/csv/';
describe('CSV Module', () => {
    describe('Read CSV', () => {
        it('should return an error if the file is invalid', (done) => {
            (0, csv_1.readCsv)(csvPath + 'invalid-csv.mock.csv')
                .then(() => {
                done(new Error('No error was thrown for invalid csv'));
            })
                .catch(() => {
                done();
            });
        });
        it('should return the data if the file is valid', async () => {
            const data = await (0, csv_1.readCsv)(csvPath + 'valid-csv.mock.csv');
            (0, chai_1.expect)(data).to.be.an('array');
        });
    });
    describe('Write CSV', () => {
        it('should return an error if the file is invalid', (done) => {
            try {
                (0, csv_1.writeCsv)(invalidData, csvPath + 'valid-csv.mock.csv');
            }
            catch (error) {
                if (error instanceof Error) {
                    (0, chai_1.expect)(error.message).to.equal('Invalid data to write in CSV file.');
                    done();
                }
                else {
                    console.log('Unexpected error', error);
                }
            }
        });
        it('should return the data if the file is valid', async () => {
            const writeStatus = await (0, csv_1.writeCsv)(validData, csvPath + 'valid-csv.mock.csv');
            (0, chai_1.expect)(writeStatus).to.be.eq(true);
        });
    });
});
