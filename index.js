const { chromium } = require('playwright');

// Function to scrape plant data from a given URL
async function scrapePlantData(page, url) {
    // Navigate to the provided URL
    await page.goto(url);

    // Get the Brand
    const brandElements = await page.$$('strong');
    const brandTexts = [];
    for (let i = 0; i < 5; i++) {
        brandTexts.push(await brandElements[i].textContent());
    }

    // Get the Common Name
    const commonNameElements = await page.$$('span.common-name');
    const commonNameTexts = [];
    for (let i = 0; i < 5; i++) {
        commonNameTexts.push(await commonNameElements[i].textContent());
    }

    // Get the Genus
    const genusElements = await page.$$('span.genus > em');
    const genusTexts = [];
    for (let i = 0; i < 5; i++) {
        genusTexts.push(await genusElements[i].textContent());
    }

// Get the Species// Get the Species
    const speciesElements = await page.$$('span.species > em');
    const speciesTexts = [];
    for (let i = 0; i < 5; i++) {
        const speciesText = await speciesElements[i].textContent();
        // Capitalize the first letter of the species text
        const capitalizedSpeciesText = speciesText.charAt(0).toUpperCase() + speciesText.slice(1);
        speciesTexts.push(capitalizedSpeciesText);
    }

    // Initialize an empty array to store the concatenated strings
    const concatenatedStrings = [];

    // Iterate through the first 5 elements of each array
    for (let i = 0; i < 5; i++) {
        // Concatenate the text contents and add them to the concatenatedStrings array
        concatenatedStrings.push(`${brandTexts[i]} ${commonNameTexts[i]} ${genusTexts[i]} ${speciesTexts[i]}`);
    }

    // Return the concatenatedStrings array
    return concatenatedStrings;
}

// Main function to handle browser initialization and scraping tasks
async function main() {
    // Launch a new browser with no headless mode so I can see what's happening
    const browser = await chromium.launch({ headless: false });
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