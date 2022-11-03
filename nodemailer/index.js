const express = require('express')
const app = express()
const port = 3000
var path = require('path');
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json())

const APP_PORT = 3000
const APP_HOST = 'localhost'
const GOOGLE_MAILER_CLIENT_ID = '49503388661-df69vuns5r99pl1hlsn1k05gejck6gof.apps.googleusercontent.com'
const GOOGLE_MAILER_CLIENT_SECRET = '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'
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04NV78HwwS2buCgYIARAAGAQSNwF-L9Ir4xcPRspjBmSv_9iC6v7WTN9cX5P9d_MyJABqv4i1NjykvTAIbn3TuJLJiWWfEZZt4nA'
const ADMIN_EMAIL_ADDRESS = 'ma.quy1987@gmail.com'

const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET
)
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})

app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname),
    };
    var fileName = "./sendEmail.html";
    res.sendFile(fileName, options);
})

app.post('/email/send', async (req, res) => {
    console.log(req.body)
    try {
        const email = req.body.email;
        const subject = req.body.subject;
        const content = req.body.content;

        if (!email || !subject || !content) throw new Error('Please provide email, subject and content!')
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        const myAccessToken = myAccessTokenObject?.token
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken
            }
        })
        const mailOptions = {
            to: email,
            subject: subject,
            html: `<h3>${content}</h3>`
        }
        await transport.sendMail(mailOptions)
        console.log("Email sent successfully.")
        res.status(200).json({ message: 'Email sent successfully.' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error.message })
    }

})

app.listen(port, () => {
    console.log(`I'm running at ${port}`)
})