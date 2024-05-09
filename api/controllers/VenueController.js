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
    getVenues: async (req, res) => {
        try {
            let venues = await Venues.find();
            if (venues) {
                res.status(ResponseCode.OK).json(venues);
            }
        } catch (error) {
            console.log("Error => ", error.message);
        }
    },

    addVenue: async (req, res) => {
        const { name, location, seats } = req.body;
        console.log(req.body)
        try {
            await Venues.findOrCreate(
                { name: name },
                {
                    name: name,
                    location: location,
                    seats: seats,
                }
            ).exec((error, venue, wasCreated) => {
                if (error) throw error;
                if (wasCreated)
                    res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "Venue added Successful...",
                    });
                else
                    res.status(ResponseCode.CONFLICT).json({
                        type: "error",
                        message: "Venue already exists",
                    });
            });
        } catch (error) {
            console.log("Venue Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    updateVenue: async (req, res) => {
        const { name, location, seats } = req.body;
        console.log(req.params.id)
        try {
            let update = await Venues.updateOne({
                id: req.params.id,
            }).set({
                name: name,
                location: location,
                seats: seats,
            });
            console.log(update)
            if (update) {
                res.status(ResponseCode.OK).json({
                    type: "success",
                    message: "Venue Updated Successfully",
                });
            } else {
                res.status(ResponseCode.SERVER_ERROR).json({
                    type: "error",
                    message: "Failed to update Venue",
                });
            }
        } catch (error) {
            console.log("Venue Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    deleteVenue: async (req, res) => {
        console.log(req.params.id);
        try {
            const getRecord = await Venues.find({
                id: req.params.id,
            });
            if (Object.keys(getRecord).length > 0) {
                const deleteRecord = await Venues.destroyOne({
                    id: req.params.id,
                });
                if (deleteRecord) {
                    res.status(ResponseCode.OK).json({
                        type: "success",
                        message: "Venue Deleted Successfully",
                    });
                } else {
                    res.status(ResponseCode.SERVER_ERROR).json({
                        type: "error",
                        message: "Failed to Delete Venue",
                    });
                }
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Venue not found",
                });
            }
        } catch (error) {
            console.log("Venue Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },
};
