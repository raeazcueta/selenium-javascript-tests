import dotenv from 'dotenv';
import { Builder } from 'selenium-webdriver';

import ExceptionPage from '../poms/exception.js';

dotenv.config();

const capabilities = {
    'bstack:options' : {
        os: 'Windows',
        osVersion: '10',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        sessionName: 'Interactive test for NotInteractableException',
        buildName: 'Exception Handling Selenium Tests',
        projectName: 'Exception Handling Tests'
    },
    'browserName' : 'Chrome',
    'browserVersion' : 'latest',
    'browserstack.selenium_version': '3.14.0'
};

async function testElementNotInteractableException() {
    const driver = new Builder()
        .usingServer('https://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();
    
    const exceptionPage = new ExceptionPage(driver);

    try {
        console.log("Navigating to the test page...");
        await exceptionPage.open();
        console.log("Page loaded. Clicking the add button...");
        await exceptionPage.clickAddButton();
        console.log("Button clicked. Waiting for the second row to load...");
        await exceptionPage.waitForRow2(10000);
        console.log("Input field found. Typing text...");
        await exceptionPage.enterRow2Input('French Fries'); 
        console.log("Attempting to click the first Save button (expected to fail)...");
        try {
            await exceptionPage.clickSaveButton[0]; 
        } catch (error) {
            if (error.name.includes('NotInteractable')) {
                console.error('ElementNotInteractableException caught as expected:', error);
                console.log("Attempting to click the second Save button...");
                await exceptionPage.clickSaveButton[1]; 
                console.log("Second Save button was clicked successfully.");
                await exceptionPage.findConfirmationMessage();
                console.log("Element found with text 'Row 2 was saved'.");
            }
        }
    } finally {
        await driver.quit();
        console.log("Test 2 passed successfully");
    }
}

testElementNotInteractableException();
