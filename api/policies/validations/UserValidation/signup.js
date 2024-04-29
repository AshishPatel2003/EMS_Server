const { body } = sails.config.constants.Dependencies.expressValidator;

// Note: This method will be executed only for authenticated Users and verfied user account.
module.exports = async function (req, res, proceed) {
    console.log("Register Rules application");

    // Register Validation Rules for Incoming Data.
    const registerRules = [
        body("firstName").notEmpty().withMessage("Firstname is required"),
        body("lastName").notEmpty().withMessage("Lastname is required"),
        body("email").notEmpty().withMessage("Email is required"),
        body("email").isEmail().withMessage("Invalid Email Address"),
        body("googleAuth").notEmpty().withMessage("Password is required")
    ];

    console.log("Validation processing...");
    await sails.config.services.validator.validate(
        req,
        res,
        proceed,
        registerRules
    );
};