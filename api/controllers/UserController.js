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
        const { firstName, middleName, lastName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            let role_record = await Roles.findOne({ roleName: "Student" });
            console.log(role_record);
            if (role_record) {
                await Users.findOrCreate(
                    { email: email },
                    {
                        firstName: firstName,
                        middleName: middleName,
                        lastName: lastName,
                        email: email,
                        password: hashedPassword,
                        role: role_record.id
                }
                ).exec((error, user, wasCreated) => {
                    if (error) throw error;
                    if (wasCreated)
                        res
                            .status(ResponseCode.OK)
                            .json({ type: "success", message: "Signup Successful..." });
                    else
                        res
                            .status(ResponseCode.CONFLICT)
                            .json({ type: "error", message: "User already exists" });
                });
            } else {
                res.status(ResponseCode.NOT_FOUND).json({ type: "error", message: "Role not found" });
            }
        } catch (error) {
            console.log("SignUp Error => ", error.message);
            res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: error.message });
        }
    },


    // Login Controller
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await Users.findOne({ email: email });
            console.log(user);
            if (user) {
                console.log(await bcrypt.compare(password, user.password))
                if (await bcrypt.compare(password, user.password)) {
                    
                    const token = await jwt.sign(
                        {
                            userId: user.id,
                            email: email,
                            firstName: user.firstName,
                            role: user.role
                            
                        },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "24h" }
                    );

                    if (token) {
                        const updateToken = await Users.updateOne({ email: email }).set({
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
                            // Example usage in a controller or another service
                            // const result = await sails.helpers.email.send({
                            //     to: email,
                            //     subject: 'Welcome to the Application',
                            //     template: 'welcome', // Assuming you have a 'welcome.ejs' template in 'views/emails'
                            //     data: { name: 'John Doe' }, // Data to pass to the EJS template
                            // });

                            // const data = {
                            //     to: email,
                            //     subject: "Welcome to the Application",
                            //     template: "email", // Assuming you have a 'welcome.ejs' template in 'views/emails'
                            //     data: { name: user.firstName }, // Data to pass to the EJS template
                            // };

                            // const transporter = nodemailer.createTransport(
                            //     sails.config.custom.nodemailer.transporter
                            // );

                            // const templatePath = path.resolve(
                            //     __dirname,
                            //     `./../emailTemplates/${data.template}.ejs`
                            // );
                            // const emailHtml = await ejs.renderFile(templatePath, data.data);

                            // const mailOptions = {
                            //     from: sails.config.custom.nodemailer.defaults.from,
                            //     to: data.to,
                            //     subject: data.subject,
                            //     html: emailHtml,
                            // };

                            // try {
                            //     return this.success('Email sent successfully.');
                            // } catch (error) {
                            //     console.log(error)
                            //     return this.error('An error occurred while sending the email.');
                            // }

                            // Handle the result accordingly
                            // const result =  await transporter.sendMail(mailOptions);
                            // console.log("Result => ", result);
                            // if (result) {
                            if (true) {
                                console.log("Email sent to " + email);
                                // Email sent successfully
                                res
                                    .status(ResponseCode.OK)
                                    .json({ type: "success", message: "Login Successful..." });
                                // return res.ok(result.description);
                            } else {
                                console.log("Email sent failed");
                                // An error occurred while sending the email
                                // return res.serverError(result.description);
                                res
                                    .status(ResponseCode.SERVER_ERROR)
                                    .json({ type: "error", message: "Something Went Wrong" });
                            }
                        } else {
                            res
                                .status(ResponseCode.SERVER_ERROR)
                                .json({ type: "error", message: "Something Went Wrong" });
                        }
                    } else {
                        res
                            .status(ResponseCode.SERVER_ERROR)
                            .json({ type: "error", message: "Something Went Wrong" });
                    }
                } else {
                    res
                        .status(ResponseCode.UNAUTHORIZED)
                        .json({ type: "error", message: "User not found" });
                }
            } else {
                res
                    .status(ResponseCode.NOT_FOUND)
                    .json({ type: "error", message: "User not found" });
            }
        } catch (error) {
            console.log("Login Error => ", error.message);
            res
                .status(ResponseCode.SERVER_ERROR)
                .json({ type: "error", message: "Something Went Wrong" });
        }
    },
};
