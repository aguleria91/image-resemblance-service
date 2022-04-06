# John's Image Resemblence Service

This is service is built with 💕 to help John automate his tedios manual work
of comparing the visual appearance of two images and then giving the pair of images a **John score**.

## Application Architecture

The application is a simple nodejs command line tool
that reads a csv file containing rows of image files with each row
having 2 image paths. The program checks the two images and reports
with a score of likeness that was previously being done by John manually.

### Modules

1. **Cli Module** - Reads passed arguments from cli command.
2. **CSV Module** - Reads and writes a CSV.
3. **Image Module** - Compares images to provide resemblance score and time taken for comparison.

## Getting Started

### Packages used

This project uses multiple 3rd Party packages -

1. **[fast-csv](https://www.npmjs.com/package/fast-csv)** - NPM Package to read and write CSV files
2. **[resemblejs](https://www.npmjs.com/package/resemblejs)** - NPM Package to visually compare images and get image difference .

### Minimum Requirements

1.  Requires Node.js (v14 and above) installed on the machine. You can install from [Node.js Installation](https://nodejs.org/en/download/)

### Installation, Build and Run Guide

1. Clone the project from [Image Resemblance Service](https://github.com/aguleria91/image-resemblance-service) into your working directory.
2. Navigate to `image-resemblance-service` directory using `cd image-resemblance-service`
3. Run `npm install` to install dependencies and packages.
4. Run `npm run build` to build the application.
5. Run `node ./dist/main.js` "enter you absolute path of your csv file"

   ```
    Example: $ node ./dist/main.js "node ./dist/main.js "/home/aguleria/work/examples/image-resemblance-test.csv"
   ```

### CSV format

| image1                                                                         |                                     image2                                     |
| ------------------------------------------------------------------------------ | :----------------------------------------------------------------------------: |
| /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg | /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg |
| /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg | /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg |
| /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg | /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg |
| /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg | /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg |
| /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg | /home/aguleria/work/examples/image-resemblance-service/tests/mock/images/a.jpg |

### Testing

Run `npm test` to run test cases.
