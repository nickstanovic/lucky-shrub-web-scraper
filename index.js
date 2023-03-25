const { chromium } = require('playwright');


scrapeGreenPlants = async () => {
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();

    const greenPlantSite = 'https://www.provenwinners.com/plants/search/advanced?duration=Houseplant';
    await page.goto(greenPlantSite);
    await page.locator('#closeIconContainer').click();

    const greenPlantNames = await page.evaluate(() => {
        const greenPlantNames = [];
        const elements = document.querySelectorAll('span.variety');
        for (let i = 0; i < 5 && i < elements.length; i++) {
            greenPlantNames.push(elements[i].textContent);
        }
        return greenPlantNames;
    });

    console.log(greenPlantNames);
    await page.waitForTimeout(15000)
    await browser.close();
};

scrapeRedShrubs = async () => {
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();

    const redShrubSite = 'https://www.provenwinners.com/plants/search?hardiness_zone=All&duration=Shrub&flower-color=Red&light_requirement=All&available_online=All';
    await page.goto(redShrubSite);
    await page.locator('#closeIconContainer').click();

    const redShrubNames = await page.evaluate(() => {
        const redShrubNames = [];
        const elements = document.querySelectorAll('span.variety');
        for (let i = 0; i < 5 && i < elements.length; i++) {
            redShrubNames.push(elements[i].textContent);
        }
        return redShrubNames;
    });

    console.log(redShrubNames);
    await page.waitForTimeout(15000)
    await browser.close();
};

scrapeWhiteShrubs = async () => {
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();

    const whiteShrubSite = 'https://www.provenwinners.com/plants/search?hardiness_zone=All&duration=Shrub&flower-color=White&light_requirement=All&available_online=All';
    await page.goto(whiteShrubSite);
    await page.locator('#closeIconContainer').click();

    const whiteShrubNames = await page.evaluate(() => {
        const whiteShrubNames = [];
        const elements = document.querySelectorAll('span.variety');
        for (let i = 0; i < 5 && i < elements.length; i++) {
            whiteShrubNames.push(elements[i].textContent);
        }
        return whiteShrubNames;
    });

    console.log(whiteShrubNames);
    await page.waitForTimeout(15000)
    await browser.close();
};

scrapeGreenPlants();
scrapeRedShrubs();
scrapeWhiteShrubs();

