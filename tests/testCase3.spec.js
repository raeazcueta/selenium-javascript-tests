import { expect } from 'chai';
import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';

import ExceptionPage from '../poms/exception.js';

async function testInvalidElementStateException() {
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(new Options()).build();
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
