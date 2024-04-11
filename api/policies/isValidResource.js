const ResponseCode = sails.config.constants.ResponseCode;


module.exports = async (req, res, proceed) => {
    if (!req.params.resourceId) {
        return res.status(ResponseCode.UNAUTHORIZED).json({ "type": "error", "message": "Resource not found" });
    }
    console.log(req.params.resourceId);

    try {
        let record = await Resources.findOne({
            id: req.params.resourceId
        });
        if (record) {
            console.log("Resource Checked")
            proceed();
        } else {
            return res.status(ResponseCode.NOT_FOUND).json({ "type": "error", "message": "Invalid Resource" });
        }
    } catch (error) {
        return res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({ "type": "error", "message": error.message });
    }
}