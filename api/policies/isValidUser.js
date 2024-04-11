const ResponseCode = sails.config.constants.ResponseCode;


module.exports = async (req, res, proceed) => {
    console.log(req.params.userId);
    if (!req.params.userId) {
        return res.status(ResponseCode.UNAUTHORIZED).json({ "type": "error", "message": "User Not found" });
    }

    try {
        let record = await Users.findOne({
            id: req.params.userId,
        });
        if (record) {
            console.log("User Checked")
            proceed();
        } else {
            return res.status(ResponseCode.NOT_FOUND).json({ "type": "error", "message": "Invalid User" });
        }
    } catch (error) {
        return res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({ "type": "error", "message": error.message });
    }
}