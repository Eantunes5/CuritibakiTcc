import { clientEmail } from './index.js'

const sendEmail = async(User, from, subject, html) => {
    clientEmail.sendMail({
        from,
        to: User.email,
        subject,
        html
    })
}

export {sendEmail}