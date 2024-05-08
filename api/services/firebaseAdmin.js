const { firebaseAdmin } = sails.config.constants.Dependencies;
const { FirebaseConfig } = sails.config.constants

// console.log(FirebaseConfig)
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(FirebaseConfig)
});

module.exports = firebaseAdmin;

