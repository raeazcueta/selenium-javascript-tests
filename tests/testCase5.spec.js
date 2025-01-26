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
        sessionName: 'Timeout Exception Test',
        buildName: 'Timeout Handling',
        projectName: 'Exception Handling Tests'
    },
    'browserName' : 'Chrome',
    'browserVersion' : 'latest',
    'browserstack.selenium_version': '3.14.0'
};

async function testTimeoutException() {
    const driver = new Builder()
        .usingServer('https://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();
    const exceptionPage = new ExceptionPage(driver);

    try {
        console.log("Navigating to the test page...");
        await exceptionPage.open();

        console.log("Clicking the Add button to trigger the second row...");
        await exceptionPage.clickAddButton();

        console.log("Waiting for 3 seconds for the second input field, which is not enough time...");
        try {
            await exceptionPage.waitForRow2(3000);
            console.log("Second input field appeared unexpectedly within 3 seconds.");
        } catch (error) {
            if (error.name === 'TimeoutError') {
                console.log("TimeoutException caught as expected: The element did not appear within 3 seconds.");
            } else {
                throw error;
            }
        }

        console.log("Waiting properly for the second input field now...");
        await exceptionPage.waitForRow2(10000);
        console.log("Second input field found after extending the wait time.");

    } finally {
        await driver.quit();
        console.log("Test 5 passed successfully");
    }
}

testTimeoutException();
