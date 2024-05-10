require("dotenv").config()

const FirebaseConfig = {
    type: process.env.FB_TYPE,
    project_id: process.env.FB_PROJECT_ID,
    private_key_id: process.env.FB_PRIVATE_KEY_ID,
    private_key: process.env.FB_PRIVATE_KEY,
    client_email: process.env.FB_CLIENT_EMAIL,
    client_id: process.env.FB_CLIENT_ID,
    auth_uri: process.env.FB_AUTH_URI,
    token_uri: process.env.FB_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FB_CLIENT_X509_CERT_URL,
};

const ResponseCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
    FORCE_LOGOUT: 303,
};

const Dependencies = {
    jwt: require("jsonwebtoken"),
    dotenv: require("dotenv"),
    bcrypt: require("bcrypt"),
    expressValidator: require("express-validator"),
    nodemailer: require("nodemailer"),
    ejs: require("ejs"),
    path: require("path"),
    expressValidator: require("express-validator"),
    firebaseAdmin: require("firebase-admin"),
    nestedPop: require('nested-pop')
};

const Pages = {
    Dashboard: {
        Organizer: {},
        Administration: {
            Events: [
                "Event",
                "EventMember",
                "Registration",
                "Speaker",
                "EventResource",
            ],
        },
    },
    General: ["My Event", "Profile"],
};

const PublicAccessList = ["Event", "Speaker"];

const SuperAdmin = {
    firstName: "Super",
    middleName: " ",
    lastName: "Admin",
    email: "ashishkumarpatel2003@gmail.com",
    password: "Ashish2003$",
};

const DashboardLink = ["Accounts", "Event"];

const PublicRoutes = ["/login", "/register"];

module.exports.constants = {
    ResponseCode,
    Dependencies,
    PublicRoutes,
    SuperAdmin,
    FirebaseConfig
};
