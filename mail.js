const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');
require('dotenv').config();

const transporter = nodemailer.createTransport(transport({
    auth: {
        api_key: process.env.SGD_API_KEY
    }
}));

exports.sendMail = () => {
    console.log('Sending Mail');

    const emails = [process.env.SEND_TO_ONE, process.env.SEND_TO_TWO];

    emails.forEach(email => {
        transporter.sendMail({
            to: email,
            from: process.env.SEND_FROM,
            subject: '9mm Ammo now In Stock!',
            html: `
            <p>Quick! Follow this link to buy some! <a href="https://www.sigsauer.com/store/9mm-115gr-elite-ball-fmj.html">Link</a></p>
            `
        });
    });
};