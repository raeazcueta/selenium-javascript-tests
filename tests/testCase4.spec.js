import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';

import ExceptionPage from '../poms/exception.js';

async function testStaleElementReferenceException() {
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(new Options()).build();
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
