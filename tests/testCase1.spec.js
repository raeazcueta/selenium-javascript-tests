import { config as dotenvConfig } from 'dotenv';
import { Builder } from 'selenium-webdriver';

import ExceptionPage from '../poms/exception.js';

dotenvConfig(); 

const capabilities = {
    'bstack:options' : {
        os: 'Windows',
        osVersion: '10',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        sessionName: 'No Such Element Test',
        buildName: 'No Such Element Handling',
        projectName: 'Exception Handling Tests'
    },
    'browserName' : 'Chrome',
    'browserVersion' : 'latest',
    'browserstack.selenium_version': '3.14.0'
};

async function testNoSuchElementException() {
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

        try {
            console.log("Checking for Row 2 input field...");
            let row2 = await exceptionPage.findRow2Input();
            console.log("Row 2 found unexpectedly:", await row2.getAttribute('outerHTML'));
        } catch (error) {
            if (error.name === 'NoSuchElementError') {
                console.error('NoSuchElementException caught as expected:', error);
                console.log("Retrying with proper wait...");
                await exceptionPage.waitForRow2(5000);
                console.log("Test 1 passed successfully, found Row 2 input field.");
            } else {
                throw error;  
            }
        }
    } finally {
        await driver.quit();
    }
}

testNoSuchElementException();
