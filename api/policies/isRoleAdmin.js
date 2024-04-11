const ResponseCode = sails.config.constants.ResponseCode;


module.exports = async (req, res, proceed) => {
    console.log("Checking For Admin Role");

    if (!req.user || !req.user.roleName) {
        return res.status(ResponseCode.UNAUTHORIZED).json({ "type": "error", "message": "Unauthorized..." });
    }

    if (req.user.roleName === "Admin") {
        proceed();
    } else {
        return res.status(ResponseCode.FORBIDDEN).json({ "type": "error", "message": "Unauthorized" });
    }
}