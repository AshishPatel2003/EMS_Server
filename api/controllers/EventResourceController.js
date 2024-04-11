/**
 * EventResourceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    getEventResources: async (req, res) => {
        try {
            let allRecords = await EventResources.find({
                event: req.params.eventId,
            })
                .populate("resource")
            if (allRecords) {
                res.status(ResponseCode.OK).json(allRecords);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addEventResource: async (req, res) => {
        try {
            await EventResources.findOrCreate(
                {
                    event: req.params.eventId,
                    resource: req.params.resourceId,
                },
                {
                    event: req.params.eventId,
                    resource: req.params.resourceId,
                }
            ).exec((error, eventResource, wasCreated) => {
                if (error) throw error;
                if (wasCreated)
                    res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "Event Resource Added Successful...",
                    });
                else
                    res.status(ResponseCode.CONFLICT).json({
                        type: "error",
                        message: "Event Resource already exists",
                    });
            });
        } catch (error) {
            console.log("Event Resource Creation Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    deleteEventResource: async (req, res) => {
        try {
            const record = await EventResources.findOne({
                event: req.params.eventId,
                resource: req.params.resourceId,
            })
                .populate("event")
                .populate("resource");
            console.log(record);
            if (record && Object.keys(record).length > 0) {
                if (record.event && record.event.status == "Concluded") {
                    res.status(ResponseCode.BAD_REQUEST).json({
                        type: "error",
                        message: "Can't Delete Resource",
                    });
                } else {
                    const deleteRecord = await EventResources.destroyOne({
                        event: req.params.eventId,
                        resource: req.params.resourceId,
                    });
                    if (deleteRecord) {
                        res.status(ResponseCode.OK).json({
                            type: "success",
                            message: "Event Resource Deleted Successfully",
                        });
                    } else {
                        res.status(ResponseCode.SERVER_ERROR).json({
                            type: "error",
                            message: "Failed to Delete Event Resource",
                        });
                    }
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Event Resource not found",
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
