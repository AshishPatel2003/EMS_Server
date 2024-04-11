const ResponseCode = sails.config.constants.ResponseCode;


module.exports = async (req, res, proceed) => {
    console.log(req.params.eventId);
    if (!req.params.eventId) {
        return res.status(ResponseCode.UNAUTHORIZED).json({ "type": "error", "message": "Event Not found" });
    }

    try {
        let record = await Events.findOne({
            id: req.params.eventId,
        });
        if (record) {
            console.log("Rolename => ", record.eventName);
            console.log("Event Checked")

            proceed();
        } else {
            return res.status(ResponseCode.NOT_FOUND).json({ "type": "error", "message": "Invalid Event" });
        }
    } catch (error) {
        return res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({ "type": "error", "message": error.message });
    }
}