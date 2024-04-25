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
    expressValidator: require("express-validator")
};

const Pages = {
    Dashboard: {
        Organizer: {
            
        },
        Administration: {
            Events: [
                "Event",
                "EventMember",
                "Registration",
                "Speaker",
                "EventResource"
            ]
        }
    },
    General: [
        "My Event",
        "Profile",
    ]
}

const PublicAccessList = [
    "Event",
    "Speaker",
]

const SuperAdmin = {
    firstName: "Super",
    middleName: " ",
    lastName: "Admin",
    email: "ashishkumarpatel2003@gmail.com",
    password: "Ashish2003$"
}

const DashboardLink = [
    "Accounts",
    "Event"
]

const PublicRoutes = [
    '/login',
    '/register'
]

module.exports.constants = {
    ResponseCode,
    Dependencies,
    PublicRoutes,
    SuperAdmin
};
