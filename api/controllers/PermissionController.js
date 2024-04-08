/**
 * PermissionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {

    getPermissions: async (req, res) => {
        try {
            let permissions_records = await Permissions.find();
            if (permissions_records) {
                res.status(ResponseCode.OK).json(permissions_records);
            } 
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addPermission: async (req, res) => {
        const { permissionName } = req.body;

        try {
            await Permissions.findOrCreate(
                { permissionName: permissionName },
                {
                    permissionName: permissionName,
                }
            ).exec((error, permission, wasCreated) => {
                if (error) throw error;
                if (wasCreated)
                    res
                        .status(ResponseCode.OK)
                        .json({ type: "success", message: "Permission Created Successful..." });
                else
                    res
                        .status(ResponseCode.CONFLICT)
                        .json({ type: "error", message: "Permission already exists" });
            });
        } catch (error) {
            console.log("Permission Error => ", error.message);
            res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },

    updatePermission: async (req, res) => {
        const { permissionName } = req.body;

        try {
            let update_permission = await Permissions.updateOne({id: req.params.id}).set({
                permissionName: permissionName
            });

            if (update_permission) {
                res.status(ResponseCode.OK).json({
                    "type": "success",
                    "message": "Permission Updated Successfully"
                })
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    "type": "error",
                    "message": "Failed to update permission"
                })
            }
        } catch (error) {
            console.log("Permission Error => ", error.message);
            res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },

    deletePermission: async (req, res) => {
        try {

            const get_record = await Permissions.find({
                id : req.params.id
            })
            if (Object.keys(get_record).length > 0) {
                const delete_record = await Permissions.destroyOne({
                    id: req.params.id
                })
                if (delete_record) {
                    res.status(ResponseCode.OK).json({
                        "type": "success",
                        "message": "Permission Deleted Successfully"
                    })
                } else {
                    res.status(ResponseCode.SERVER_ERROR).json({
                        "type": "error",
                        "message": "Failed to Delete Permission"
                    })
                }

            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    "type": "error",
                    "message": "Record not found"
                })
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
