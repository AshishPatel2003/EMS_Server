const ResponseCode = sails.config.constants.ResponseCode;


module.exports = async (req, res, proceed) => {
    if (!req.params.speakerId) {
        return res.status(ResponseCode.UNAUTHORIZED).json({ "type": "error", "message": "Speaker not found" });
    }
    console.log(req.params.speakerId);

    try {
        let record = await Speakers.findOne({
            id: req.params.speakerId
        });
        if (record) {
            console.log("Speaker Checked")

            proceed();
        } else {
            return res.status(ResponseCode.NOT_FOUND).json({ "type": "error", "message": "Invalid Speaker" });
        }
    } catch (error) {
        return res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({ "type": "error", "message": error.message });
    }
}