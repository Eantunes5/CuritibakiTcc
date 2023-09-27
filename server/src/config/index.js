const{
    MONGODB_URI,
    SECRET_JWT,
    APP_FRONT_URL,
    APP_EMAIL_SENDER_PASS
} = process.env

export default{
    databaseUrl: MONGODB_URI,
    appTokenSecret: SECRET_JWT,
    appFrontUrl: APP_FRONT_URL,
    appEmailSenderPass: APP_EMAIL_SENDER_PASS
}