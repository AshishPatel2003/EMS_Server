/**
 * EventMemberController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    getEventMembers: async (req, res) => {
        try {
            let allRecords = await EventMembers.find({
                event: req.params.eventId,
            })
                .populate("eventrole")
                .populate("event")
                .populate("eventrole")
                .populate("user");
            if (allRecords) {
                res.status(ResponseCode.OK).json(allRecords);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addEventMember: async (req, res) => {
        const { userId, eventRole } = req.body;

        try {
            await EventMembers.findOrCreate(
                {
                    event: req.params.eventId,
                    user: req.params.userId,
                },
                {
                    event: req.params.eventId,
                    user: req.params.userId,
                    eventrole: eventRole,
                }
            ).exec((error, eventMember, wasCreated) => {
                if (error) throw error;
                if (wasCreated)
                    res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "Event Member Added Successful...",
                    });
                else
                    res.status(ResponseCode.CONFLICT).json({
                        type: "error",
                        message: "Event Member already exists",
                    });
            });
        } catch (error) {
            console.log("Event Member Creation Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    deleteEventMember: async (req, res) => {
        console.log(req.params.eventId);
        try {
            const record = await EventMembers.findOne({
                event: req.params.eventId,
                user: req.params.userId,
            })
                .populate("user")
                .populate("event")
                .populate("eventrole");
            console.log(record);
            if (record && Object.keys(record).length > 0) {
                if (record.event && record.event.status == "Concluded") {
                    res.status(ResponseCode.BAD_REQUEST).json({
                        type: "error",
                        message: "Can't Delete Member",
                    });
                } else {
                    const deleteRecord = await EventMembers.destroyOne({
                        event: req.params.eventId,
                        user: req.params.userId,
                    });
                    if (deleteRecord) {
                        res.status(ResponseCode.OK).json({
                            type: "success",
                            message: "Member Deleted Successfully",
                        });
                    } else {
                        res.status(ResponseCode.SERVER_ERROR).json({
                            type: "error",
                            message: "Failed to Delete Member",
                        });
                    }
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Member not found",
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
