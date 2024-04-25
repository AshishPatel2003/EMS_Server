/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    getEvents: async (req, res) => {
        try {
            let allRecords = await Events.find()
                .populate("speaker")
                .populate("suggestion")
                .populate("eventmember")
                .populate("registration")
                .populate('eventresource');
            if (allRecords) {
                res.status(ResponseCode.OK).json(allRecords);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addEvent: async (req, res) => {
        const { eventName } = req.body;

        try {
            await Events.findOrCreate(
                {
                    eventName: eventName,
                    status: "Initiated",
                },
                {
                    eventName: eventName,
                    status: "Initiated",
                }
            ).exec(async (error, event, wasCreated) => {
                if (error) throw error;
                if (wasCreated) {
                    let eventRoleRecord = await EventRoles.findOne({
                        eventRoleName: "Event Organizer",
                    });
                    console.log("Addevent : event=>",event)
                    console.log("Addevent : role=>",eventRoleRecord)

                    if (eventRoleRecord) {
                        await EventMembers.findOrCreate(
                            {
                                user: req.user.userId,
                                event: event.id,
                                eventrole: eventRoleRecord.id,
                            },
                            {
                                user: req.user.userId,
                                event: event.id,
                                eventrole: eventRoleRecord.id,
                            }
                        ).exec((error, eventMember, wasCreated) => {
                            if (error) throw error;
                            if (wasCreated)
                                res.status(ResponseCode.OK).json({
                                    type: "success",
                                    message:
                                        "Event Initiated Created Successful...",
                                });
                            else
                                res.status(ResponseCode.CONFLICT).json({
                                    type: "error",
                                    message: "Event Member already exists",
                                });
                        });
                    } else {
                        res.status(ResponseCode.CONFLICT).json({
                            type: "error",
                            message: "Event Organizer Role not found",
                        });
                    }
                } else {
                    res.status(ResponseCode.CONFLICT).json({
                        type: "error",
                        message: "Event already initiated",
                    });
                }
            });
        } catch (error) {
            console.log("Event Creation Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    updateEvent: async (req, res) => {
        const {
            eventName,
            description,
            bannerImg,
            cardImg,
            date,
            startTime,
            endTime,
            venue,
            showSeats,
            maxSeats,
            paid,
            ticketPricing,
            budget,
        } = req.body;

        try {
            let updateEvent = await Events.updateOne({
                id: req.params.eventId,
            }).set({
                description: description,
                bannerImg: bannerImg,
                cardImg: cardImg,
                date: date,
                startTime: startTime,
                endTime: endTime,
                venue: venue,
                showSeats: showSeats,
                maxSeats: maxSeats,
                paid: paid,
                ticketPricing: ticketPricing,
                status: "Created",
                budget: budget,
            });

            if (updateEvent) {
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Event Updated Successfully",
                });
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    type: "error",
                    message: "Failed to update event",
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

    approveEvent: async (req, res) => {
        try {
            let updateEvent = await Events.updateOne({
                id: req.params.eventId,
            }).set({
                status: "Approved",
            });

            if (updateEvent) {
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Event Approved Successfully",
                });
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    type: "error",
                    message: "Failed to approve event",
                });
            }
        } catch (error) {
            console.log("Approval Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    deleteEvent: async (req, res) => {
        console.log(req.params.eventId);
        try {
            const record = await Events.findOne({
                id: req.params.eventId,
            });
            if (Object.keys(record).length > 0) {
                if (
                    record.status == "Approved" ||
                    record.status == "Concluded"
                ) {
                    res.status(ResponseCode.BAD_REQUEST).json({
                        type: "error",
                        message: "Can't Delete Event",
                    });
                } else {
                    const deleteRecord = await Events.destroyOne({
                        id: req.params.eventId,
                    });
                    if (deleteRecord) {
                        const deleteMember = await EventMembers.destroy({
                            event: req.params.eventId
                        }).fetch()
                        if (deleteMember) {
                            res.status(ResponseCode.OK).json({
                                type: "success",
                                message: "Event Deleted Successfully",
                            });
                        } else {
                            res.status(ResponseCode.SERVER_ERROR).json({
                                type: "error",
                                message: "Failed to Delete Event",
                            });
                        }
                    } else {
                        res.status(ResponseCode.SERVER_ERROR).json({
                            type: "error",
                            message: "Failed to Delete Event",
                        });
                    }
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Event not found",
                });
            }
        } catch (error) {
            console.log("Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },
};
