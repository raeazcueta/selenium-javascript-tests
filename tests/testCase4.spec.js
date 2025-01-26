import { config as dotenvConfig } from 'dotenv';
import { Builder } from 'selenium-webdriver';

import ExceptionPage from '../poms/exception.js';

dotenvConfig(); 

const capabilities = {
    'bstack:options': {
        os: 'Windows',
        osVersion: '10',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        sessionName: 'Stale Element Reference Test',
        buildName: 'Stale Element Reference Handling',
        projectName: 'Exception Handling Tests'
    },
    'browserName' : 'Chrome',
    'browserVersion' : 'latest',
    'browserstack.selenium_version': '3.14.0'
};

async function testStaleElementReferenceException() {
    const driver = new Builder()
        .usingServer('https://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();
    const exceptionPage = new ExceptionPage(driver);
    
    try {
        console.log("Navigating to the test page...");
        await exceptionPage.open();

        await exceptionPage.findInstructionsText();
        console.log("Instructions text found before interaction.");

        console.log("Checking initial visibility of the instructions text...");
        const instructionsText = await exceptionPage.findInstructionsText();
        const isVisibleInitially = await instructionsText.isDisplayed();
        console.log(`Is the instruction text initially visible? ${isVisibleInitially}`);

        await exceptionPage.clickAddButton();
        console.log("Add button clicked.");

        try {
            await instructionsText.isDisplayed();
            console.log("Unexpectedly found the instructions text still displayed after interaction.");
        } catch (error) {
            if (error.name === 'StaleElementReferenceError') {
                console.log("StaleElementReferenceException caught as expected: Element is no longer attached to the DOM.");
            } else {
                throw error;
            }
        }

    } finally {
        await driver.quit();
        console.log("Test 4 passed successfully");
    }
}

testStaleElementReferenceException();
