/**
 * GuestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    getGuests: async (req, res) => {
        try {
            let allRecords = await Guests.find({
                event: req.params.eventId
            })
                .populate("event")
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
            let event = await Events.create({
                eventName: eventName,
            }).fetch();

            if (event)
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Event Created Successful...",
                });
            else
                res.status(ResponseCode.CONFLICT).json({
                    type: "error",
                    message: "Event already exists",
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
        const { eventName, description, bannerImg, cardImg, date, startTime, endTime, venue, showSeats, maxSeats, paid, ticketPricing, budget } = req.body;

        try {
            let updateEvent = await Events.updateOne({ id: req.params.eventId }).set({
                description: description, bannerImg: bannerImg, cardImg: cardImg, date: date, startTime: startTime, endTime: endTime, venue:venue, showSeats : showSeats, maxSeats: maxSeats, paid: paid, ticketPricing: ticketPricing, status: "Created", budget: budget
            });

            if (updateEvent) {
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Event Updated Successfully",
                });
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    type: "error",
                    message: "Failed to update role",
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

    deleteEvent: async (req, res) => {
        console.log(req.params.eventId);
        try {
            const record = await Events.find({
                id: req.params.eventId,
            });
            if (Object.keys(record).length > 0) {
                if (record.status=="Approved" || record.status == "Concluded") {
                    res.status(ResponseCode.BAD_REQUEST).json({
                        type: "error",
                        message: "Can't Delete Event",
                    });
                } else {
                    const deleteRecord = await Events.destroyOne({
                        id: req.params.eventId,
                    });
                    if (deleteRecord) {
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
