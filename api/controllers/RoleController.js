/**
 * RoleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {

    getRoles: async (req, res) => {
        try {
            let roles_records = await Roles.find();
            if (roles_records) {
                res.status(ResponseCode.OK).json(roles_records);
            } 
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addRole: async (req, res) => {
        const { roleName } = req.body;

        try {
            await Roles.findOrCreate(
                { roleName: roleName },
                {
                    roleName: roleName,
                }
            ).exec((error, role, wasCreated) => {
                if (error) throw error;
                if (wasCreated)
                    res
                        .status(ResponseCode.OK)
                        .json({ type: "success", message: "Role Created Successful..." });
                else
                    res
                        .status(ResponseCode.CONFLICT)
                        .json({ type: "error", message: "Role already exists" });
            });
        } catch (error) {
            console.log("Role Error => ", error.message);
            res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },

    updateRole: async (req, res) => {
        const { roleName } = req.body;

        try {
            let update_role = await Roles.updateOne({id: req.params.id}).set({
                roleName: roleName
            });

            if (update_role) {
                res.status(ResponseCode.OK).json({
                    "type": "success",
                    "message": "Role Updated Successfully"
                })
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    "type": "error",
                    "message": "Failed to update role"
                })
            }
        } catch (error) {
            console.log("Role Error => ", error.message);
            res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },

    deleteRole: async (req, res) => {
        console.log(req.params.id);
        try {
            const getRecord = await Roles.find({
                id: req.params.id,
            });
            if (Object.keys(getRecord).length > 0) {
                const deleteRecord = await Roles.destroyOne({
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
            console.log("Error => ", error.message)
            res.status(ResponseCode.SERVER_ERROR).json({
                "type": "error",
                "message": error.message
            })
        }
    },

};
