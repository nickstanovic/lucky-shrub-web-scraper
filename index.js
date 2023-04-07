const { chromium } = require('playwright');
const request = require('request');
const fs = require('fs');
const path = require('path');


async function scrapePlantData(page, url) {
    await page.goto(url);

    const imageElements = await page.$$('div.field-item.odd > img');
    const plantImageUrls = [];
    const plantImageAlts = [];
    for (let i = 0; i < 4; i++) {
        const src = await imageElements[i].getAttribute('src');
        const alt = await imageElements[i].getAttribute('alt');
        plantImageUrls.push(src);
        plantImageAlts.push(alt)

        // add a 7 second delay to scrape ethically
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    const downloadDir = 'C:/Users/nicks/Downloads';
    for (let i = 0; i < 4; i++) {
        const imageUrl = plantImageUrls[i];
        const imageAlt = plantImageAlts[i];
        const formattedFilename = `${imageAlt}.jpg`.split('- ').join('');
        const imagePath = path.join(downloadDir, formattedFilename);
        request(imageUrl).pipe(fs.createWriteStream(imagePath));
    }
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

    await browser.close();
}

main();

