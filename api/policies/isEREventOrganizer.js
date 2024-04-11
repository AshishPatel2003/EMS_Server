const ResponseCode = sails.config.constants.ResponseCode;


module.exports = async (req, res, proceed) => {
    console.log("Checking For Event Organizer Role");

    console.log("Event id", req.params.eventId);
    if (!req.params.eventId) {
        console.log("Event Id not found")
        return res.status(ResponseCode.UNAUTHORIZED).json({ "type": "error", "message": "Unauthorized..." });
    }

    console.log(req.params.eventId, req.user.userId)
    if (req.user.roleName == "Admin") {
        proceed()
    } else {
        let record = await EventMembers.findOne({
            event: req.params.eventId,
            user: req.user.userId
        }).populate('eventrole');
        console.log(record)
        if (record) {
            if (record.eventrole && (record.eventrole.eventRoleName === "Event Organizer")) {
                req.user.eventRole = "Event Organizer";
                proceed();
            } else {
                return res.status(ResponseCode.FORBIDDEN).json({ "type": "error", "message": "Unauthorized" });
            }
        } else {
            return res.status(ResponseCode.FORBIDDEN).json({ "type": "error", "message": "Unauthorized" });
        }
    }
}