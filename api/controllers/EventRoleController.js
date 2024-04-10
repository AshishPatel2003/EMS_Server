/**
 * EventRoleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    getEventRoles: async (req, res) => {
        try {
            let eventRolesRecords = await EventRoles.find();
            if (eventRolesRecords) {
                res.status(ResponseCode.OK).json(eventRolesRecords);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addEventRole: async (req, res) => {
        const { eventRoleName } = req.body;

        try {
            await EventRoles.findOrCreate(
                { eventRoleName: eventRoleName },
                {
                    eventRoleName: eventRoleName,
                }
            ).exec((error, eventRole, wasCreated) => {
                if (error) throw error;
                if (wasCreated)
                    res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "Event Role Created Successful...",
                    });
                else
                    res.status(ResponseCode.CONFLICT).json({
                        type: "error",
                        message: "Event Role already exists",
                    });
            });
        } catch (error) {
            console.log("Role Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    updateEventRole: async (req, res) => {
        const { eventRoleName } = req.body;

        try {
            let updateEventRoleRecord = await EventRoles.updateOne({
                id: req.params.id,
            }).set({
                eventRoleName: eventRoleName,
            });

            if (updateEventRoleRecord) {
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Role Updated Successfully",
                });
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    type: "error",
                    message: "Failed to update event role",
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

    deleteEventRole: async (req, res) => {
        console.log(req.params.id);
        try {
            const getRecord = await EventRoles.find({
                id: req.params.id,
            });
            if (Object.keys(getRecord).length > 0) {
                const deleteRecord = await EventRoles.destroyOne({
                    id: req.params.id,
                });
                if (deleteRecord) {
                    res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "Role Deleted Successfully",
                    });
                } else {
                    res.status(ResponseCode.SERVER_ERROR).json({
                        type: "error",
                        message: "Failed to Delete Role",
                    });
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Role not found",
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
