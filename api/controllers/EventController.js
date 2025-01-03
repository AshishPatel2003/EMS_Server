/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs, nestedPop } =
    constants.Dependencies;

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
                .populate("eventresource");
            if (allRecords) {
                res.status(ResponseCode.OK).json(allRecords);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },
    getEvent: async (req, res) => {
        try {
            let event = await Events.findOne({
                id: req.params.id,
            });
            console.log("Event data found", event);
            if (event) {
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Event found successfully",
                    event: event,
                });
            } else {
                res.status(ResponseCode.OK).json({
                    type: "error",
                    message: "YOUR EVENTS NOT FOUND",
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

    getMyEvents: async (req, res) => {
        try {
            let allRecords = await EventMembers.find({ user: req.user.id })
                .populate("event")
                .populate("eventrole")
                .then(async function (records) {
                    let venues = await Venues.find();
                    if (venues) {
                        for (let i in records) {
                            for (let j in venues) {
                                if ((records[i].event.venue = venues[j].id)) {
                                    records[i].event.venue = venues[j];
                                    break;
                                }
                            }
                        }
                    }
                    return records;
                });
            console.log("All Records => ", allRecords);
            if (allRecords) {
                // for (let i in allRecords) {
                //     let event = await Events.findOne({id: allRecords[i].event.id}).select([id]).populate("venue")
                // }
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "All Your Event",
                    events: allRecords,
                });
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "YOUR EVENTS NOT FOUND",
                });
            }
        } catch (error) {
            console.log("Error => ", error.message);
            res.status(ResponseCode.NOT_FOUND).json({
                type: "error",
                message: error.message,
            });
        }
    },

    getMyEvent: async (req, res) => {
        try {
            let event = await EventMembers.find({
                user: req.user.id,
                event: req.params.id,
            }).limit(1)
                .populate("event")
                .populate("eventrole")
                .then(async function (record) {
                    console.log("Event record from getMyEvent => ", record)
                    let venues = await Venues.findOne({
                        id: record[0].event.venue,
                    });
                    if (venues) {
                        record[0].event.venue = venues;
                    }
                    return record[0];
                });
            console.log("Event found asdfadfads ", event);
            if (event) {
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Event found successfully",
                    event: event,
                });
            } else {
                res.status(ResponseCode.OK).json({
                    type: "error",
                    message: "YOUR EVENTS NOT FOUND",
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

    uploadBanner: async (req, res) => {
        console.log(req.params.id);
        try {
            const event = await Events.findOne({ id: req.params.id });
            console.log(event);
            if (event) {
                // console.log(event)
                const oldBanner = event.bannerImg;
                const eventUpdate = await Events.updateOne(
                    { id: req.params.id },
                    { bannerImg: req.body.bannerImg }
                );
                if (eventUpdate) {
                    return res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "Banner Updated",
                        oldBanner: oldBanner,
                    });
                } else {
                    return res
                        .status(ResponseCode.CONFLICT)
                        .json({ type: "error", message: "Upload Failed" });
                }
            } else {
                return res
                    .status(ResponseCode.NOT_FOUND)
                    .json({ type: "error", message: "Event Not found" });
            }
        } catch (error) {
            return res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },

    updateEventName: async (req, res) => {
        console.log(req.params.id);
        const { eventName } = req.body;
        try {
            const event = await Events.findOne({ id: req.params.id });
            console.log(event);
            if (event) {
                // console.log(event)
                const oldName = event.eventName;
                if (oldName != eventName) {
                    const eventUpdate = await Events.updateOne(
                        { id: req.params.id },
                        { eventName: eventName }
                    );
                    if (eventUpdate) {
                        return res.status(ResponseCode.OK).json({
                            type: "success",
                            message: "Title Updated",
                        });
                    } else {
                        return res
                            .status(ResponseCode.CONFLICT)
                            .json({ type: "error", message: "Update Failed" });
                    }
                } else {
                    return res
                        .status(ResponseCode.CONFLICT)
                        .json({ type: "error", message: "No Change Made" });
                }
            } else {
                return res
                    .status(ResponseCode.NOT_FOUND)
                    .json({ type: "error", message: "Event Not found" });
            }
        } catch (error) {
            return res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },

    updateEventInfo: async (req, res) => {
        console.log(req.params.id);
        const { description } = req.body;
        try {
            const event = await Events.findOne({ id: req.params.id });
            console.log(event);
            if (event) {
                // console.log(event)
                const old = event.description;
                if (old != description) {
                    const eventUpdate = await Events.updateOne(
                        { id: req.params.id },
                        { description: description }
                    );
                    if (eventUpdate) {
                        return res
                            .status(ResponseCode.OK)
                            .json({ type: "success", message: "Info Updated" });
                    } else {
                        return res
                            .status(ResponseCode.CONFLICT)
                            .json({ type: "error", message: "Update Failed" });
                    }
                } else {
                    return res
                        .status(ResponseCode.CONFLICT)
                        .json({ type: "error", message: "No Change Made" });
                }
            } else {
                return res
                    .status(ResponseCode.NOT_FOUND)
                    .json({ type: "error", message: "Event Not found" });
            }
        } catch (error) {
            return res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },
    updateSchedule: async (req, res) => {
        console.log(req.params.id);
        const { startTime, endTime, venue, showSeats, maxSeats } = req.body;
        try {
            const event = await Events.findOne({ id: req.params.id });
            console.log(event);
            if (event) {
                // console.log(event)
                const old = event.startTime;
                // if (old != startTime ) {
                const eventUpdate = await Events.updateOne(
                    { id: req.params.id },
                    {
                        startTime: startTime,
                        endTime: endTime,
                        venue: venue,
                        showSeats: showSeats,
                        maxSeats: maxSeats,
                    }
                );
                if (eventUpdate) {
                    return res
                        .status(ResponseCode.OK)
                        .json({ type: "success", message: "Schedule Updated" });
                } else {
                    return res
                        .status(ResponseCode.CONFLICT)
                        .json({ type: "error", message: "Update Failed" });
                }
                // } else {
                //     return res
                //             .status(ResponseCode.CONFLICT)
                //             .json({ type: "error", message: "No Change Made" });
                // }
            } else {
                return res
                    .status(ResponseCode.NOT_FOUND)
                    .json({ type: "error", message: "Event Not found" });
            }
        } catch (error) {
            return res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },

    addEvent: async (req, res) => {
        const { eventName } = req.body;
        console.log(eventName);
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
                    console.log("Addevent : event=>", event);
                    console.log("Addevent : role=>", eventRoleRecord);

                    if (eventRoleRecord) {
                        await EventMembers.findOrCreate(
                            {
                                user: req.user.id,
                                event: event.id,
                                eventrole: eventRoleRecord.id,
                            },
                            {
                                user: req.user.id,
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
                            event: req.params.eventId,
                        }).fetch();
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
