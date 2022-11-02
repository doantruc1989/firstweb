const express = require('express')
const app = express()
const port = 3000
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');

app.use(express.json())
/**
 * Những biến sau trong thực tế nên đưa vào biến môi trường ENV vì mục đích bảo mật hơn.
 * Các bạn có thể tham khảo khóa Lập Trình MERN Stack nâng cao trên kênh YouTube:
 *  Trungquandev Official của mình để học cách triển khai & tổ chức code như đi làm thực tế nhé.
 * Link: https://www.youtube.com/c/TrungquandevOfficial/
 */
const APP_PORT = 3000
const APP_HOST = 'localhost'
const GOOGLE_MAILER_CLIENT_ID = '49503388661-df69vuns5r99pl1hlsn1k05gejck6gof.apps.googleusercontent.com'
const GOOGLE_MAILER_CLIENT_SECRET = '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'
const GOOGLE_MAILER_REFRESH_TOKEN = '1//04zYF-a7wU5ckCgYIARAAGAQSNwF-L9IrN8u4xBQUW-Tz2b9IrRsmo7Acl6Kf73f57yHAfeeRquPA9PUFsTpXJYkfOrn0A1NTVHE'
const ADMIN_EMAIL_ADDRESS = 'ma.quy1987@gmail.com'
// Khởi tạo OAuth2Client với Client ID và Client Secret 
const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})
// Tạo API /email/send với method POST
app.post('/email/send', async (req, res) => {
    try {
        // Lấy thông tin gửi lên từ client qua body
        const { email, subject, content } = req.body
        if (!email || !subject || !content) throw new Error('Please provide email, subject and content!')
        /**
         * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
         * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
         */
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
        const myAccessToken = myAccessTokenObject?.token
        // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
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
        // mailOption là những thông tin gửi từ phía client lên thông qua API
        const mailOptions = {
            to: email, // Gửi đến ai?
            subject: subject, // Tiêu đề email
            html: `<h3>${content}</h3>` // Nội dung email
        }
        // Gọi hành động gửi email
        await transport.sendMail(mailOptions)
        // Không có lỗi gì thì trả về success
        res.status(200).json({ message: 'Email sent successfully.' })
    } catch (error) {
        // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
        console.log(error)
        res.status(500).json({ errors: error.message })
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))