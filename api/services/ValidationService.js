// api/services/ValidationService

const { validationResult } = require("express-validator");

module.exports = {
    validate: async (req, res, proceed, validationRules) => {
        console.log("Validation process Started");
        try {
            // Run validation.
            await Promise.all(validationRules.map((rule) => rule.run(req)));

            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                return res
                    .status(200)
                    .json({ type: "error", message: errors.array()[0].msg });
            }

            // If validation passed, proceed to the next middleware or controller.
            proceed();
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                type: "error",
                message: "An error occurred during validation.",
            });
        }
    },
};