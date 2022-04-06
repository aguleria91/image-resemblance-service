"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const image_1 = require("../../src/image");
const folderPath = process.cwd() + '/tests/mock/images/';
describe("Image Module", () => {
    describe("readImage()", () => {
        it("should return an error if the image is not found", async () => {
            const img1 = folderPath + 'a.jpg';
            const img2 = folderPath + 'invalid.jpg';
            try {
                await (0, image_1.readImage)(img1, img2);
            }
            catch (error) {
                if (error instanceof Error) {
                    (0, chai_1.expect)(error.message).to.be.eq("Images do not exist in the given path.");
                }
                else {
                    console.log('Unexpected error', error);
                }
            }
        });
        it("should return the image data", async () => {
            const img1 = folderPath + 'a.jpg';
            const img2 = folderPath + 'b.jpg';
            const { firstImageData, secondImageData } = await (0, image_1.readImage)(img1, img2);
            (0, chai_1.expect)(firstImageData).to.be.not.empty;
            (0, chai_1.expect)(firstImageData).to.be.instanceof(Buffer);
            (0, chai_1.expect)(secondImageData).to.be.not.empty;
            (0, chai_1.expect)(secondImageData).to.be.instanceof(Buffer);
        });
    });
    describe("imageDiff()", () => {
        it("should return the diff for visually different images", async () => {
            const img1 = folderPath + 'a.jpg';
            const img2 = folderPath + 'c.jpg';
            const data = await (0, image_1.diffImage)(img1, img2, 1);
            (0, chai_1.expect)(data).to.have.a.property('image1');
            (0, chai_1.expect)(data).to.have.a.property('image2');
            (0, chai_1.expect)(data).to.have.a.property('similar');
            (0, chai_1.expect)(data).to.have.a.property('elapsed');
            (0, chai_1.expect)(data.similar).to.be.eq(1); // Score for different images
        });
        it("should return the diff for the images with different extension", async () => {
            const img1 = folderPath + 'b.jpg';
            const img2 = folderPath + 'bb.gif';
            const data = await (0, image_1.diffImage)(img1, img2, 1);
            (0, chai_1.expect)(data).to.have.property('image1');
            (0, chai_1.expect)(data).to.have.property('image2');
            (0, chai_1.expect)(data).to.have.property('similar');
            (0, chai_1.expect)(data).to.have.property('elapsed');
            (0, chai_1.expect)(data.similar).to.be.eq(0); // Score for similar images with different extension
        });
        it("should return the diff for the same images with same extension", async () => {
            const img1 = folderPath + 'a.jpg';
            const img2 = folderPath + 'aa.jpg';
            const data = await (0, image_1.diffImage)(img1, img2, 1);
            (0, chai_1.expect)(data).to.have.property('image1');
            (0, chai_1.expect)(data).to.have.property('image2');
            (0, chai_1.expect)(data).to.have.property('similar');
            (0, chai_1.expect)(data).to.have.property('elapsed');
            (0, chai_1.expect)(data.similar).to.be.eq(0); // Score for similar images with same extension
        });
    });
    describe("getCsvOutput()", () => {
        const csvData = [
            {
                "image1": folderPath + "a.jpg",
                "image2": folderPath + "aa.jpg",
            },
            {
                "image1": folderPath + "a.jpg",
                "image2": folderPath + "c.jpg",
            },
            {
                "image1": folderPath + "b.jpg",
                "image2": folderPath + "bb.gif",
            },
            {
                "image1": folderPath + "c.jpg",
                "image2": folderPath + "cc.gif",
            },
            {
                "image1": folderPath + "d.jpg",
                "image2": folderPath + "dd.gif",
            },
            {
                "image1": folderPath + "e.jpg",
                "image2": folderPath + "ee.gif",
            },
        ];
        it("should return the output csv data", async () => {
            const data = await (0, image_1.getCsvOutput)(csvData);
            (0, chai_1.expect)(data).to.be.not.empty;
            (0, chai_1.expect)(data).to.be.an('Array');
            (0, chai_1.expect)(data[0]).to.have.property('image1');
            (0, chai_1.expect)(data[0]).to.have.property('image2');
            (0, chai_1.expect)(data[0]).to.have.property('similar');
            (0, chai_1.expect)(data[0]).to.have.property('elapsed');
            (0, chai_1.expect)(data[0].image1).to.be.a('String');
            (0, chai_1.expect)(data[0].image2).to.be.a('String');
            (0, chai_1.expect)(data[0].similar).to.be.a('Number');
            (0, chai_1.expect)(data[0].elapsed).to.be.a('Number');
        });
    });
});
