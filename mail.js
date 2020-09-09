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
    transporter.sendMail({
        to: process.env.SEND_TO,
        from: process.env.SEND_FROM,
        subject: '9mm Ammo now In Stock!',
        html: `
        <p>Quick! Follow this link to buy some! <a href="https://www.sigsauer.com/store/9mm-115gr-elite-ball-fmj.html">Link</a></p>
        `
    });
};