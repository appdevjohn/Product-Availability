const { newAgent } = require('mechanize');
const { parse } = require('node-html-parser');
const cron = require('node-cron');
const { sendMail } = require('./mail');

const agent = newAgent();

const webpageURL = 'https://www.sigsauer.com/store/9mm-115gr-elite-ball-fmj.html';

const checkAvailability = (url) => {
    return agent.get({ uri: url }).then(page => {
        const pageBody = parse(page.body);
        const availabilityRawText = pageBody.querySelector('.product-hero-description-price').rawText
        const available = availabilityRawText.includes('Out of Stock');

        return !available;

    }).catch(err => {
        console.error(err);
        return err;
    })
};

cron.schedule('5,20,35,50 * * * *', () => {
    const currentDate = new Date(Date.now());
    const timeString = currentDate.toLocaleTimeString('en-US');

    checkAvailability(webpageURL).then(result => {
        console.log(timeString + ' | Ammo available: ' + result);

        if (result) {
            sendMail();
        }

    }).catch(err => {
        console.log('There was an error checking the availability at ' + timeString);
        console.log(err);
    });
});

sendMail();