/**
 * AccessMappingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    getAccessMappings: async (req, res) => {
        try {
            let permissions_records = await AccessMappings.find({
                role: req.params.id,
            }).populate('role').populate('permission');
            if (permissions_records) {
                res.status(ResponseCode.OK).json(permissions_records);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addAccessMapping: async (req, res) => {
        try {
            let role_record = await Roles.find({
                id: req.params.id,
            });
            if (Object.keys(role_record).length > 0) {
                let permission_record = await Permissions.find({
                    id: req.params.permissionId,
                });

                if (Object.keys(permission_record).length > 0) {
                    await AccessMappings.findOrCreate(
                        {
                            role: req.params.id,
                            permission: req.params.permissionId,
                        },
                        {
                            role: req.params.id,
                            permission: req.params.permissionId,
                        }
                    ).exec((error, permission, wasCreated) => {
                        if (error) throw error;
                        if (wasCreated)
                            res.status(ResponseCode.OK).json({
                                type: "success",
                                message: "AccessMapping Created Successful...",
                            });
                        else
                            res.status(ResponseCode.CONFLICT).json({
                                type: "error",
                                message: "AccessMapping already exists",
                            });
                    });
                } else {
                    console.log("Permission => ", role_record);
                    res.status(ResponseCode.NOT_FOUND).json({
                        type: "error",
                        message: "Permission not found",
                    });
                }
            } else {
                console.log("Role => ", role_record);
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Role not found",
                });
            }
        } catch (error) {
            console.log("AccessMapping Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    // updateAccessMapping: async (req, res) => {
    //     const { permissionName } = req.body;

    //     try {
    //         let update_permission = await AccessMappings.updateOne({id: req.params.id}).set({
    //             permissionName: permissionName
    //         });

    //         if (update_permission) {
    //             res.status(ResponseCode.OK).json({
    //                 "type": "success",
    //                 "message": "AccessMapping Updated Successfully"
    //             })
    //         } else {
    //             res.status(ResponseCode.SERVER_ERROR).json({
    //                 "type": "error",
    //                 "message": "Failed to update permission"
    //             })
    //         }
    //     } catch (error) {
    //         console.log("AccessMapping Error => ", error.message);
    //         res
    //             .status(ResponseCode.SERVER_ERROR)
    //             .json({ type: "error", message: error.message });
    //     }
    // },

    deleteAccessMapping: async (req, res) => {
        try {
            const get_record = await AccessMappings.find({
                role: req.params.id,
                permission: req.params.permissionId,
            });
            if (Object.keys(get_record).length > 0) {
                const delete_record = await AccessMappings.destroyOne({
                    role: req.params.id,
                    permission: req.params.permissionId,
                });
                if (delete_record) {
                    res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "AccessMapping Deleted Successfully",
                    });
                } else {
                    res.status(ResponseCode.SERVER_ERROR).json({
                        type: "error",
                        message: "Failed to Delete AccessMapping",
                    });
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Record not found",
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
