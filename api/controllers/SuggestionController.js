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
    getSuggestions: async (req, res) => {
        try {
            let allRecords = await Suggestions.find({
                event: req.params.eventId,
            }).populate("sender");
            if (allRecords) {
                res.status(ResponseCode.OK).json(allRecords);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addSuggestion: async (req, res) => {
        const { message } = req.body;

        try {
            let record = await Suggestions.create({
                event: req.params.eventId,
                sender: req.user.userId,
                message: message,
            }).fetch();
            if (record) {
                let roleId = "";
                let receiverId = "";

                let role = await EventRoles.findOne({
                    eventRoleName: "Event Organizer"
                });
                if (role) {
                    roleId = role.id;
                }
                let receiverUser = await EventMembers.findOne({
                    event: req.params.eventId,
                    eventrole: roleId
                })
                if (receiverUser) {
                    receiverId = receiverUser.id;
                }

                try {
                    const result = await sails.helpers.notify(
                        `Suggestion from ${req.user.firstName}`,
                        message,
                        req.user.userId,
                        receiverId
                    );
                    if (result) {
                        res.status(ResponseCode.OK).json({
                            type: "success",
                            message: "Event Suggestion Added Successful...",
                        });
                    } else {
                        res.status(ResponseCode.CONFLICT).json({
                            type: "error",
                            message: "Fail to add Event Suggestion...",
                        });
                    }
                } catch (e) {
                    console.log(e.message);
                    return res
                        .status(ResponseCode.SERVER_ERROR)
                        .json({ type: "error", message: e.message });
                }
                
            } else {
                res.status(ResponseCode.CONFLICT).json({
                    type: "error",
                    message: "Fail to add Event Suggestion",
                });
            }
        } catch (error) {
            console.log("Event Suggestion Creation Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },
};
