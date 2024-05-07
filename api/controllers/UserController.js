/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const constants = sails.config.constants;
const { dotenv, jwt, bcrypt, nodemailer, path, ejs } = constants.Dependencies;

const ResponseCode = constants.ResponseCode;
dotenv.config();

module.exports = {
    // Signup Controller
    signup: async (req, res) => {
        console.log(req.body);
        const { firstName, lastName, email, photoURL, googleAuth } =
            req.body;

        try {
            let role_record = await Roles.findOne({ roleName: "Student" });
            console.log(role_record);
            if (role_record) {
                if (googleAuth == true) {
                    await Users.findOrCreate(
                        { email: email },
                        {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            photoURL: photoURL,
                            googleAuth: googleAuth,
                            role: role_record.id,
                        }
                    ).exec(async (error, user, wasCreated) => {
                        if (error) throw error;
                        if (wasCreated)
                            res.status(ResponseCode.OK).json({
                                type: "success",
                                message: "Signup Successful...",
                                redirect: true,
                            });
                        else {
                            let update = await Users.updateOne(
                                { email: email },
                                { googleAuth: googleAuth, photoURL: photoURL}
                            );
                            if (update) {
                                res.status(ResponseCode.OK).json({
                                    type: "success",
                                    message: "SignUp Success",
                                    redirect: true,
                                });
                            } else {
                                res.status(ResponseCode.SERVER_ERROR).json({
                                    type: "error",
                                    message: "Signup Failed",
                                });
                            }
                        }
                    });
                } else {
                    await Users.findOrCreate(
                        { email: email },
                        {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            photoURL: photoURL,
                            googleAuth: googleAuth,
                            role: role_record.id,
                        }
                    ).exec(async (error, user, wasCreated) => {
                        if (error) throw error;
                        if (wasCreated)
                            res.status(ResponseCode.OK).json({
                                type: "success",
                                message: "Signup Successful...",
                                redirect: true,
                            });
                        else {
                            res.status(ResponseCode.OK).json({
                                type: "error",
                                message: "User Already Exists",
                                redirect: true,
                            });
                        }
                    });
                }
                // let checkUser = await Users.findOne({email: email})
                // if (checkUser && checkUser.googleAuth == false && googleAuth != false) {
                //     // Update google auth.
                // } else if (checkUser )
            } else {
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "Role not found",
                });
            }
        } catch (error) {
            console.log("SignUp Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: error.message,
            });
        }
    },

    // Login Controller
    login: async (req, res) => {
        const { email, password, googleAuth, accessToken } = req.body;
        console.log(req.body);

        try {
            const user = await Users.findOne({ email: email });
            console.log("User => ", user);
            
            if (user) {
                if (googleAuth == true) {
                    const update = Users.updateOne({
                        email: email
                    }, {
                        accessToken: accessToken,
                        googleAuth: true
                    })
                }
                console.log(await bcrypt.compare(password, user.password));
                if (await bcrypt.compare(password, user.password)) {
                    const token = await jwt.sign(
                        {
                            userId: user.id,
                            email: email,
                            firstName: user.firstName,
                            role: user.role,
                        },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "24h" }
                    );

                    if (token) {
                        const updateToken = await Users.updateOne({
                            email: email,
                        }).set({
                            accessToken: token,
                        });
                        if (updateToken) {
                            res.cookie(`Authorization`, token, {
                                maxAge: 24 * 60 * 60 * 1000,
                                path: "/",
                                httpOnly: true,
                                secure: true,
                            });
                            console.log("Cookies Set.\n Sending email to");
                            return res.status(ResponseCode.OK).json({
                                type: "success",
                                message: "Login Successful",
                            });

                            // // Example usage in a controller or another service
                            // try {
                            //     const result = await sails.helpers.emailSender(
                            //         email,
                            //         'Welcome to the Application',
                            //         'email', // Assuming you have a 'welcome.ejs' template in 'views/emails'
                            //         { name: user.firstName }, // Data to pass to the EJS template
                            //     );
                            //         if (result) {
                            //             return res.status(ResponseCode.OK).json({"type": "success", "message":"Login Successful"})
                            //         } else {
                            //              return res.status(ResponseCode.SERVER_ERROR).json({"type": "error", "message":"Email sent failed"})
                            //         }
                            // } catch (e) {
                            //     return res.status(ResponseCode.SERVER_ERROR).json({"type": "error", "message": e.message})
                            // }
                        } else {
                            res.status(ResponseCode.SERVER_ERROR).json({
                                type: "error",
                                message: "Something Went Wrong",
                            });
                        }
                    } else {
                        res.status(ResponseCode.SERVER_ERROR).json({
                            type: "error",
                            message: "Something Went Wrong",
                        });
                    }
                } else {
                    res.status(ResponseCode.UNAUTHORIZED).json({
                        type: "error",
                        message: "Invalid Credentials",
                    });
                }
            } else {
                if (googleAuth == true) {
                    res.status(ResponseCode.NOT_FOUND).json({
                        type: "error",
                        message: "Try Login",
                    });
                }
                res.status(ResponseCode.NOT_FOUND).json({
                    type: "error",
                    message: "User not found",
                });
            }
        } catch (error) {
            console.log("Login Error => ", error.message);
            res.status(ResponseCode.SERVER_ERROR).json({
                type: "error",
                message: "Something Went Wrong",
            });
        }
    },
    getProfile: async (req, res) => {
        const {email} = req.body

        const userinfo = await Users.findOne({ email: email }).populate('role')
        if (userinfo) {
            res.status(ResponseCode.OK).json({type: "success", message: userinfo})
        } else {
            res.status(ResponseCode.SERVER_ERROR).json({type: "error", message: {}})
        }

    },
    updateProfile: async(req, res) => {
        const {firstName, lastName, email, uniqueNo, school } = req.body;

        try{
            const updateProfile = await Users.updateOne({email: email}, {firstName: firstName, lastName: lastName, uniqueNo: uniqueNo, school: school})
            if (updateProfile) {
                console.log(updateProfile)
                res.status(ResponseCode.OK).json({type: "success", message: updateProfile})
            } else {
                res.status(ResponseCode.CONFLICT).json({type: "error", message: "Update Failed"})
            }
        } catch (e) {
            res.status(200).json({type: "success", message: userinfo})

        }
    }
};
