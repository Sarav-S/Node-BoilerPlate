const { SEND_GRID_ID, FRONTEND_APP_URL, SENDER_EMAIL_ADDRESS, APP_NAME } = process.env;

const send = ({ to, subject, html }) => {
    const mail = require('@sendgrid/mail');
    try {
        mail.setApiKey(SEND_GRID_ID);
        mail.send({
            from: SENDER_EMAIL_ADDRESS,
            to,
            subject,
            html
        });
    } catch (error) {
        console.log(error);
    }
}

const sendResetPasswordLink = ({ email, token }) => {
    const url = `${FRONTEND_APP_URL}?email=${email}&token=${token}`;
    send(
        {
            to: email,
            subject: 'Reset Password',
            html: `
            Hi,<br/><br/>
            We have received password reset request from you. Inorder to reset your password, click on the link below<br/><br/>

            ${url} 
            <br/><br/>
            Thank you,<br/>
            Team ${APP_NAME}
            <br/><br/>
            <small>If it wasn't you who requested for password reset, then no action is required to perform</small>
        `
        }
    );
}

module.exports = {
    sendResetPasswordLink
}