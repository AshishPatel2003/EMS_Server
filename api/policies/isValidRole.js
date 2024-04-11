const ResponseCode = sails.config.constants.ResponseCode;


module.exports = async (req, res, proceed) => {
    if (!req.user) {
        return res.status(ResponseCode.UNAUTHORIZED).json({ "type": "error", "message": "Unauthorized..." });
    }
    console.log(req.user);

    try {
        let role_record = await Roles.findOne({
            id: req.user.role
        });
        if (role_record) {
            console.log("Rolename => ", role_record.roleName);
            console.log("Role Checked")

            req.user.roleName = role_record.roleName;
            proceed();
        } else {
            return res.status(ResponseCode.NOT_FOUND).json({ "type": "error", "message": "Unauthorized" });
        }
    } catch (error) {
        return res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({ "type": "error", "message": error.message });
    }
}