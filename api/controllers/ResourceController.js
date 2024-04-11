/**
 * ResourcesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    getResources: async (req, res) => {
        try {
            let records = await Resources.find();
            if (records) {
                res.status(ResponseCode.OK).json(records);
            } 
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addResource: async (req, res) => {
        const { resourceName } = req.body;

        try {
            await Resources.findOrCreate(
                { resourceName: resourceName },
                {
                    resourceName: resourceName,
                }
            ).exec((error, resource, wasCreated) => {
                if (error) throw error;
                if (wasCreated)
                    res
                        .status(ResponseCode.OK)
                        .json({ type: "success", message: "Resource Created Successful..." });
                else
                    res
                        .status(ResponseCode.CONFLICT)
                        .json({ type: "error", message: "Resource already exists" });
            });
        } catch (error) {
            console.log("Resource Error => ", error.message);
            res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },

    updateResource: async (req, res) => {
        const { resourceName } = req.body;

        try {
            let updateRecord = await Resources.updateOne({id: req.params.id}).set({
                resourceName: resourceName
            });

            if (updateRecord) {
                res.status(ResponseCode.OK).json({
                    "type": "success",
                    "message": "Resource Updated Successfully"
                })
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    "type": "error",
                    "message": "Failed to update Resource"
                })
            }
        } catch (error) {
            console.log("Resource Error => ", error.message);
            res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },

    deleteResource: async (req, res) => {
        console.log(req.params.id);
        try {
            const getRecord = await Resources.find({
                id: req.params.id,
            });
            if (Object.keys(getRecord).length > 0) {
                const deleteRecord = await Resources.destroyOne({
                    id: req.params.id,
                });
                if (deleteRecord) {
                    res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "Resource Deleted Successfully",
                    });
                } else {
                    res.status(ResponseCode.SERVER_ERROR).json({
                        type: "error",
                        message: "Failed to Delete Resource",
                    });
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Resource not found",
                });
            }
        } catch (error) {
            console.log("Error => ", error.message)
            res.status(ResponseCode.SERVER_ERROR).json({
                "type": "error",
                "message": error.message
            })
        }
    },

};
