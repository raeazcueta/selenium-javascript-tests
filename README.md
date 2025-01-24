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

## Built With

1. Selenium WebDriver - The web framework used for testing
2. Chai - Assertion library for Node and the browser

## Authors

Rae Azcueta - Initial work
