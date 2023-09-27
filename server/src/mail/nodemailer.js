import nodemailer from 'nodemailer'
import config from '../config/index.js'
import {emailDefault} from '../config/auth.js'

const transporte = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: `${emailDefault}`,
            pass: `qstbvshzbgdharha`
        },
        tls: {
            rejectUnauthorized: false
        }
    }
)

export {transporte}