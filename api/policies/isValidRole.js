const ResponseCode = sails.config.constants.ResponseCode;


module.exports = async (req, res, proceed) => {
    if (!req.user) {
        return res.status(ResponseCode.UNAUTHORIZED).json({ "type": "error", "message": "Unauthorized..." });
    }
    console.log(req.user);

    try {
        if (req.user.role) {
            console.log("Role Checked")

            req.user.roleName = req.user.role.roleName;
            proceed();
        } else {
            return res.status(ResponseCode.NOT_FOUND).json({ "type": "error", "message": "Unauthorized" });
        }
    } catch (error) {
        console.log(error)
        return res.status(ResponseCode.SERVER_ERROR).json({ "type": "error", "message": error.message });
    }
}