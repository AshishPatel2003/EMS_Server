const { jwt, dotenv } = sails.config.constants.Dependencies;
const ResponseCode = sails.config.constants.ResponseCode;
const publicRoutes = sails.config.constants.PublicRoutes;

dotenv.config();

module.exports = async (req, res, proceed) => {
    console.log("🔄 Middleware is running");

    // Check if the user is authenticated.
    const token = req.cookies.Authorization;

    // If there is no token, then redirect to login page.
    if (!token) {
        return res.status(ResponseCode.UNAUTHORIZED).json({"type": "error", "message": "Unauthorized..."});
    }
    // Verify the token.
    try {
        // Check if there is any user with this token.
        const tokenfound = await Users.findOne({ accessToken: token });
        if (tokenfound) {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;

            // Forward the request to the destined endpoint.
            console.log("⏩ Requested Forwarded to Controller...");
            proceed();
        } else {
            // Remove the Invalid token from the cookies.
            console.log("redirected")
            res.clearCookie("Authorization");

            return res.status(ResponseCode.UNAUTHORIZED).json({"type": "error", "message": "Invalid Token"});
        }
    } catch (error) {
        console.log("Error is :", error);
        return res.redirect("/");
    }
    console.log("✅ Middleware is done running.");
};
