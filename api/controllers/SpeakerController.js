/**
 * SpeakerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    getSpeakers: async (req, res) => {
        try {
            let allRecords = await Speakers.find({
                event: req.params.eventId,
            }).populate("event");
            if (allRecords) {
                res.status(ResponseCode.OK).json(allRecords);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addSpeaker: async (req, res) => {
        const { speakerName, speakerImg, designation } = req.body;

        try {
            await Speakers.findOrCreate(
                {
                    event: req.params.eventId,
                    speakerName: speakerName,
                    speakerImg: speakerImg,
                    designation: designation,
                },
                {
                    event: req.params.eventId,
                    speakerName: speakerName,
                    speakerImg: speakerImg,
                    designation: designation,
                }
            ).exec((error, event, wasCreated) => {
                if (error) throw error;
                if (wasCreated)
                    res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "Event Speaker Created Successful...",
                    });
                else
                    res.status(ResponseCode.CONFLICT).json({
                        type: "error",
                        message: "Event Speaker already Created",
                    });
            });
        } catch (error) {
            console.log("Event Speaker Creation Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    updateSpeaker: async (req, res) => {
        const { speakerName, speakerImg, designation } = req.body;
        try {
            let updateEventSpeaker = await Speakers.updateOne({
                id: req.params.speakerId,
                event: req.params.eventId,
            }).set({
                speakerName: speakerName,
                speakerImg: speakerImg,
                designation: designation,
            });


            if (updateEventSpeaker) {
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Event Speaker Updated Successfully",
                });
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    type: "error",
                    message: "Failed to update Speaker",
                });
            }
        } catch (error) {
            console.log("Role Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    deleteSpeaker: async (req, res) => {
        console.log(req.params.eventId);
        try {
            const record = await Speakers.findOne({
                id: req.params.speakerId,
            }).populate('event');
            console.log(record)
            if (record && Object.keys(record).length > 0) {
                if (
                    record.event &&
                    (record.event.status == "Approved" ||
                    record.event.status == "Concluded")
                ) {
                    res.status(ResponseCode.BAD_REQUEST).json({
                        type: "error",
                        message: "Can't Delete Speaker",
                    });
                } else {
                    const deleteRecord = await Speakers.destroyOne({
                        id: req.params.speakerId,
                    });
                    if (deleteRecord) {
                        res.status(ResponseCode.OK).json({
                            type: "success",
                            message: "Speaker Deleted Successfully",
                        });
                    } else {
                        res.status(ResponseCode.SERVER_ERROR).json({
                            type: "error",
                            message: "Failed to Delete Speaker",
                        });
                    }
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Speaker not found",
                });
            }
        } catch (error) {
            console.log("Error => ", error);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },
};
