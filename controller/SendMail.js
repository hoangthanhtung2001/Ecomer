const nodemailer = require('nodemailer')
const{ google} = require('googleapis')
const {OAuth2} = google.auth 

const OAUTH2_PLAYGROUND = "https://developers.google.com/oauthplayground"

const {
    MALING_SERVER_ID,
    MALING_SERVER_SECRET,
    MALING_REFRESH_TOKEN,
    SEND_MAIL_ADDRESS
} = process.env

const oauth2client = new OAuth2(
    MALING_SERVER_ID,
    MALING_SERVER_SECRET,
    MALING_REFRESH_TOKEN,
    OAUTH2_PLAYGROUND
)

const sendMail =(to,url,txt,subject)=>{
    oauth2client.setCredentials({
        refresh_token:MALING_REFRESH_TOKEN
    })
    const accessToken = oauth2client.getAccessToken()
    const smptTranport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user:SEND_MAIL_ADDRESS,
            clientId:MALING_SERVER_ID,
            clientSecret:MALING_SERVER_SECRET,
            refreshToken:MALING_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOption = ({
        from:SEND_MAIL_ADDRESS,
        to:to,
        subject:subject,
        html:` <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DevAT channel.</h2>
        <p>Congratulations! You're almost set to start using DEVAT✮SHOP.
            Just click the button below to validate your email address.
        </p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
        <div>${url}</div>
        </div>`
    })
    smptTranport.sendMail(mailOption,(err,infor)=>{
        if(err) throw err;
        return infor
    })
}


module.exports = sendMail