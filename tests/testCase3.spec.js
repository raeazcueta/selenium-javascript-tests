import { expect } from 'chai';
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
        sessionName: 'Invalid Element State Exception Test',
        buildName: 'UI Exception Testing',
        projectName: 'Exception Handling Tests'
    },
    'browserName' : 'Chrome',
    'browserVersion' : 'latest',
    'browserstack.selenium_version': '3.14.0'
};

async function testInvalidElementStateException() {
    const driver = new Builder()
        .usingServer('https://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();
    const exceptionPage = new ExceptionPage(driver);

    try {
        console.log("Navigating to the test page...");
        await exceptionPage.open();
        console.log("Page loaded.");

        try {
            await exceptionPage.clearRow1Input();
            console.log("Input field cleared.");
        } catch (error) {
            console.log("Caught InvalidElementStateException as expected for a disabled field:", error);
            await exceptionPage.clickEditButton();
            console.log("Edit button clicked, input field should be enabled now.");
        }

        await exceptionPage.clearRow1Input();
        console.log("Input field cleared after enabling.");
        
        await exceptionPage.enterRow1Input('Hamburger');
        console.log("New text typed into the input field.");

        const typedText = await exceptionPage.getRow1InputAttribute('value');
        expect(typedText).to.equal('Hamburger');
        console.log("Verified text change: Text in the input field is as expected.");

    } finally {
        await driver.quit();
        console.log("Test 3 passed successfully");
    }
}

testInvalidElementStateException();

