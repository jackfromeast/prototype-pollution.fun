const puppeteer = require('puppeteer');

async function adminVisit() {
    const browser = await puppeteer.launch({ 
        headless: "new", 
        args: ['--disable-web-security']});
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', request => {
        console.log(`Request URL: ${request.url()}`);
        request.continue();
    });


    // Navigate to your admin panel
    await page.goto('http://localhost:8399/', { waitUntil: 'networkidle0' });
    
    // Authenticate if needed
    const name = await page.waitForXPath('/html/body/main/section/form/input[1]');
    await name.type('admin');
    
    // Adjusted XPath to target the password input field instead of a label
    const pass = await page.waitForXPath('/html/body/main/section/form/input[2]'); 
    await pass.type('flag{prototype_pollution_2_XSS_!!!}'); // flag{REDACTED}

    const submitButton = await page.waitForXPath('/html/body/main/section/form/button');
    submitButton.click();

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const value = await page.evaluate(() => {
        return localStorage.getItem('jwtToken');
    });
    console.log(`[+] jwtToken: ${value}`)

    // // Capture all console messages
    // page.on('console', message => {
    //     console.log(`Page Console ${message.type()}: ${message.text()}`);
    // });
        
    // Input text into the editor textarea
    await page.type('#editor', 'id = "?"');

    // Click the "compile" button
    await page.click('#compileButton');

    await page.waitForTimeout(10000); // Waits for 10 seconds.

    // After all tasks are done, close the browser
    await browser.close();
}

module.exports = adminVisit;