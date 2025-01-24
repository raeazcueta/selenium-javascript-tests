import dotenv from 'dotenv';
import {
  By,
  until,
} from 'selenium-webdriver';

dotenv.config();

class ExceptionPage {
    constructor(driver) {
        this.driver = driver;
        this.BASE_URL = process.env.BASE_URL;
        this.addBtn = By.id('add_btn');
        this.row2 = By.id('row2');
        this.row1Tbox = By.css("input[value='Pizza']");
        this.row2Tbox = By.css("div[id='row2'] input[type='text']");
        this.saveBtn = By.name("Save");
        this.confirmationMsg = By.id('confirmation');
        this.editBtn = By.id('edit_btn');
        this.instructionsTxt = By.id('instructions');
    }

    async open() {
        await this.driver.get(this.BASE_URL);
    }

    async clickAddButton() {
        await this.driver.findElement(this.addBtn).click();
    }

    async findRow1Input() {
        return await this.driver.findElement(this.row1Tbox);
    }

    async enterRow1Input(text) {
        const input = await this.findRow1Input();
        await input.sendKeys(text);
    }

    async getRow1InputAttribute(attributeName) {
        const element = await this.findRow1Input();
        return await element.getAttribute(attributeName);
    }

    async clearRow1Input() {
        const input = await this.findRow1Input();
        await input.clear();
    }

    async findRow2() {
        return await this.driver.findElement(this.row2);
    }

    async waitForRow2(timeout) {
        await this.driver.wait(until.elementLocated(this.row2), timeout);
    }

    async findRow2Input() {
        return await this.driver.findElement(this.row2Tbox);
    }

    async enterRow2Input(text) {
        const input = await this.findRow2Input();
        await input.sendKeys(text);
    }

    async getRow2InputAttribute(attributeName) {
        const element = await this.findRow2Input();
        return await element.getAttribute(attributeName);
    }

    async findSaveButton() {
        return await this.driver.findElements(this.saveBtn);
    }

    async clickSaveButton(index) {
        const button = await this.findSaveButton();
        await button[index].click();
    }

    async findConfirmationMessage() {
        return await this.driver.findElement(this.confirmationMsg);
    }

    async getConfirmationMessageText() {
        const message = await this.findConfirmationMessage();
        return message.getText();
    }

    async findInstructionsText() {
        return await this.driver.findElement(this.instructionsTxt);
    }

    async clickEditButton() {
        await this.driver.findElement(this.editBtn).click();
    }
}

export default ExceptionPage;
