const { chromium } = require('playwright');
const request = require('request');
const fs = require('fs');
const path = require('path');


async function scrapePlantData(page, url) {
    await page.goto(url);

    const imageElements = await page.$$('div.field-item.odd > img');
    const plantImages = [];
    for (let i = 0; i < 5; i++) {
        plantImages.push(await imageElements[i].getProperty('src'));
    }

    const brandElements = await page.$$('strong');
    const brandTexts = [];
    for (let i = 0; i < 5; i++) {
        brandTexts.push(await brandElements[i].textContent());
    }

    const commonNameElements = await page.$$('span.common-name');
    const commonNameTexts = [];
    for (let i = 0; i < 5; i++) {
        commonNameTexts.push(await commonNameElements[i].textContent());
    }

    const genusElements = await page.$$('span.genus > em');
    const genusTexts = [];
    for (let i = 0; i < 5; i++) {
        genusTexts.push(await genusElements[i].textContent());
    }

    const speciesElements = await page.$$('span.species > em');
    const speciesTexts = [];
    for (let i = 0; i < 5; i++) {
        const speciesText = await speciesElements[i].textContent();
        const capitalizedSpeciesText = speciesText.charAt(0).toUpperCase() + speciesText.slice(1);
        speciesTexts.push(capitalizedSpeciesText);
    }

    const downloadDir = 'C:/Users/nicks/Downloads';
    for (let i = 0; i < 5; i++) {
        const imageUrl = await plantImages[i].jsonValue();
        const brand = await brandTexts[i];
        const commonName = await commonNameTexts[i];
        const genus = await genusTexts[i];
        const species = await speciesTexts[i];

        const formattedFilename = `${brand}-${commonName}-${genus}-${species}.jpg`.split(' ').join('');
        const imagePath = path.join(downloadDir, formattedFilename);
        request(imageUrl).pipe(fs.createWriteStream(imagePath));
    }

    const concatenatedStrings = [];
    for (let i = 0; i < 5; i++) {
        concatenatedStrings.push(`${plantImages[i]} ${brandTexts[i]} ${commonNameTexts[i]} ${genusTexts[i]} ${speciesTexts[i]}`);
    }

    return concatenatedStrings;
}

async function main() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const greenIndoorPlants = await scrapePlantData(page, 'https://www.provenwinners.com/plants/search/advanced?duration=Houseplant');
    console.log("Green Indoor Plants:");
    console.log(greenIndoorPlants);

    const redShrubs = await scrapePlantData(page, 'https://www.provenwinners.com/plants/search?hardiness_zone=All&duration=Shrub&flower-color=Red&light_requirement=All&available_online=All');
    console.log("Red Shrubs:");
    console.log(redShrubs);

    const whiteShrubs = await scrapePlantData(page, 'https://www.provenwinners.com/plants/search?hardiness_zone=All&duration=Shrub&flower-color=White&light_requirement=All&available_online=All');
    console.log("White Shrubs:");
    console.log(whiteShrubs);


// Close the browser
    await browser.close();
}

// Call the main function to start the scraping process
main();

