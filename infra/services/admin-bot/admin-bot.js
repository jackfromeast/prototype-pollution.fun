const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 80;

const app = express();
app.use(bodyParser.json());

async function adminVisit(url) {
    const browser = await puppeteer.launch({ 
        headless: "new", 
        args: ['--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 0});
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', request => {
        console.log(`Request URL: ${request.url()}`);
        request.continue();
    });


    console.log('[+] Visiting admin page');
    
    // Navigate to your admin panel
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Authenticate if needed
    const name = await page.waitForXPath('/html/body/main/section/form/input[1]');
    await name.type('admin');
    
    // Adjusted XPath to target the password input field instead of a label
    const pass = await page.waitForXPath('/html/body/main/section/form/input[2]');
    await pass.type(process.env.FLAG || 'ppfun{prototype_pollution_2_XSS_!!!}'); // flag{REDACTED}

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
    // await page.type('#editor', '');

    // Click the "compile" button
    await page.click('#compileButton');

    await page.waitForTimeout(10000); // Waits for 10 seconds.

    // After all tasks are done, close the browser
    await browser.close();
}

app.get('/admin', (req, res) => {
    const url = req.query.url;
    console.log("[+] URL Arrived: ", url)

    const regex = /http[s]?:\/\/drink-some-coffee-[\w]+.chal.prototype-pollution.fun\//;
    if(url && regex.test(url)){
        res.send('Request accepted!')
        adminVisit(url);
    }else{
        res.send('Request denied!')
    }
})


app.listen(PORT, () => {
    console.log(`[+] Admin Bot has started on port ${PORT}`)
});