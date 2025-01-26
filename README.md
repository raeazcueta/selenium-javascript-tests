# Selenium JavaScript Test

This project contains automated web tests using Selenium WebDriver with JavaScript. It is designed to validate the functionality of a web application through a series of automated browser tests.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [npm](https://www.npmjs.com/) - Node Package Manager, comes with Node.js.
- Web browsers (Google Chrome)
- Corresponding WebDriver for each browser:
  - [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/) for Google Chrome

### Installing

A step-by-step series of examples that tell you how to get a development env running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/yourprojectname.git
   cd yourprojectname
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   BASE_URL=https://yourtestingdomain.com
   ```

4. **Running tests:**

   ```bash
   node tests/testName.spec.js
   ```

## Running Tests on BrowserStack
To run your tests on various browser and OS combinations using BrowserStack Automate, follow these steps:

1. **Set up BrowserStack credentials:**
Add your BrowserStack username and access key to your environment variables or directly in your test setup:

   ```bash
   BROWSERSTACK_USERNAME=your_browserstack_username
   BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key
   ```

2. **Configure your tests to run on BrowserStack:**
Update your test scripts to use BrowserStack's WebDriver hub URL and include desired capabilities that specify the browser, version, and OS settings.

   Example of setting capabilities:
   ```bash
   const capabilities = {
    'bstack:options' : {
        os: 'Windows',
        osVersion: '10',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    },
    browserName: 'Chrome',
    browserVersion: 'latest'
   };
   ```

3. **Run your tests:**
Use the same command to run your tests, which will now execute on BrowserStack's servers.

   ```bash
   node tests/testName.spec.js
   ```

4. **Review test results:**
Access your BrowserStack Automate Dashboard to view test results, including videos, screenshots, and logs for debugging.

## Built With

1. Selenium WebDriver - The web framework used for testing
2. Chai - Assertion library for Node and the browser

## Authors

Rae Azcueta - Initial work
