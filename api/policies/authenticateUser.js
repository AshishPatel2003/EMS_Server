const { jwt, dotenv } = sails.config.constants.Dependencies;
const ResponseCode = sails.config.constants.ResponseCode;


module.exports = async (req, res, proceed) => {
    // if (!req.url.includes('/api/secure')) return proceed();
    try {
        admin = sails.config.constants.Dependencies.firebaseAdmin.initializeApp({
            credential: sails.config.constants.Dependencies.firebaseAdmin.credential.cert(
                sails.config.constants.FirebaseConfig
            ),
        });
        const token = req.headers.authorization.split(' ')[1];
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
            req.user = decodeValue;
            return proceed();
        } else {
            return res.status(ResponseCode.UNAUTHORIZED).json({ message: "Unauthorized", type: "error" });
        }
    } catch (e) {
        console.log(e);
        return res.status(ResponseCode.SERVER_ERROR).json({ message: "Internal Server Error", type: "error" });
    }
}

