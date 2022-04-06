import { expect } from "chai";
import mocha, { afterEach } from "mocha";
import { readCsv, writeCsv } from "../../src/csv";

const invalidData = require('../mock/csv/invalid-data.mock.json');
const validData = require('../mock/csv/valid-data.mock.json');

const csvPath = process.cwd() + '/tests/mock/csv/';

describe('CSV Module', () => {

  describe('Read CSV', () => {

    it('should return an error if the file is invalid', (done) => {
      readCsv(csvPath + 'invalid-csv.mock.csv')
        .then(() => {
          done(new Error('No error was thrown for invalid csv'));
        })
        .catch(() => {
          done();
        })
    });

    it('should return the data if the file is valid', async () => {
      const data = await readCsv(csvPath + 'valid-csv.mock.csv');

      expect(data).to.be.an('array');
    })

  });

  describe('Write CSV', () => {

    it('should return an error if the file is invalid', (done) => {
      try {
        writeCsv(invalidData, csvPath + 'valid-csv.mock.csv')
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).to.equal('Invalid data to write in CSV file.')
          done();
        } else {
          console.log('Unexpected error', error);
        }
      }
    });

    it('should return the data if the file is valid', async () => {
      const writeStatus = await writeCsv(validData, csvPath + 'valid-csv.mock.csv');
      expect(writeStatus).to.be.eq(true);
    })

  })
})