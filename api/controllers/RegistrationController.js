/**
 * SuggestionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    getRegistrations: async (req, res) => {
        try {
            let allRecords = await Registrations.find({
                event: req.params.eventId,
            }).populate("event").populate("user");
            if (allRecords) {
                res.status(ResponseCode.OK).json(allRecords);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    enroll: async (req, res) => {

        try {
            await Registrations.findOrCreate(
                {
                    event: req.params.eventId,
                    user: req.user.userId,
                },
                {
                    event: req.params.eventId,
                    user: req.user.userId,
                }
            ).exec(async (error, registration, wasCreated) => {
                if (error) throw error;
                if (wasCreated){
                    try {
                            const result = await sails.helpers.emailSender(
                                req.user.email,
                                'Event Registration Confirmed.',
                                'EventRegistration', // Assuming you have a 'welcome.ejs' template in 'views/emails'
                                { name: req.user.firstName }, // Data to pass to the EJS template
                            );
                                if (result) {
                                    res.status(ResponseCode.OK).json({
                                        type: "success",
                                        message: "Event Registration Successful...",
                                    });
                                } else {
                                     return res.status(ResponseCode.SERVER_ERROR).json({"type": "error", "message":"Failed to register"})
                                }
                        } catch (e) {
                            return res.status(ResponseCode.SERVER_ERROR).json({"type": "error", "message": e.message})
                        }
                                        }
                else
                    res.status(ResponseCode.CONFLICT).json({
                        type: "error",
                        message: "Already Registered in the event",
                    });
            });
        } catch (error) {
            console.log("Event Registration Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    addAttendance: async (req, res) => {
        try {
            const record = await Registrations.findOne({
                event: req.params.eventId,
                user: req.user.userId,
            })
                .populate("user")
                .populate("event")
            console.log(record);
            if (record && Object.keys(record).length > 0) {
                if (record.attendance == true) {
                    res.status(ResponseCode.BAD_REQUEST).json({
                        type: "error",
                        message: "Your Attendance has been done...",
                    });
                } 
                else {
                    const updateRecord = await Registrations.updateOne({
                        event: req.params.eventId,
                        user: req.params.userId,
                    }).set({
                        attendance: true
                    });
                    if (updateRecord) {
                        res.status(ResponseCode.OK).json({
                            type: "success",
                            message: "Attendance Added Successfully",
                        });
                    } else {
                        res.status(ResponseCode.SERVER_ERROR).json({
                            type: "error",
                            message: "Failed to add Attendance",
                        });
                    }
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "You have not registered for this event",
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

    unenroll: async (req, res) => {
        console.log(req.params.eventId);
        try {
            const record = await Registrations.findOne({
                event: req.params.eventId,
                user: req.user.userId,
            })
                .populate("user")
                .populate("event")
            console.log(record);
            if (record && Object.keys(record).length > 0) {
                if (record.event && record.event.status == "Concluded") {
                    res.status(ResponseCode.BAD_REQUEST).json({
                        type: "error",
                        message: "Can't Unenroll Now...",
                    });
                } else if (record.attendance == true) {
                    res.status(ResponseCode.BAD_REQUEST).json({
                        type: "error",
                        message: "You have already attended this event...",
                    });
                } 
                else {
                    const deleteRecord = await Registrations.destroyOne({
                        event: req.params.eventId,
                        user: req.params.userId,
                    });
                    if (deleteRecord) {
                        res.status(ResponseCode.OK).json({
                            type: "success",
                            message: "Unenrolled Successfully",
                        });
                    } else {
                        res.status(ResponseCode.SERVER_ERROR).json({
                            type: "error",
                            message: "Failed to unenroll from event",
                        });
                    }
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "You have not registered for this event",
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
