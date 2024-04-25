const { jwt, dotenv } = sails.config.constants.Dependencies;
const ResponseCode = sails.config.constants.ResponseCode;
const publicRoutes = sails.config.constants.PublicRoutes;

dotenv.config();

module.exports = async (req, res, proceed) => {
    console.log("🔄 Middleware is running");

    console.log(`Requested URL: ${req.url}`);
    console.log(req.route);
    console.log(sails.config.routes);
    console.log(`Matched Route Method: ${req.method}`)
    console.log(`Matched Route Pattern: ${req.route.path}`);
    console.log(`Associated Controller: ${req.route.controller}`);

    // Extract controller name from the route mapping
    const foundController = `${req.method} ${req.route.path}`;
  const associatedController = sails.config.routes[foundController];
  console.log(associatedController)
  const reqHandler = associatedController.split('.'); // Assuming controller names are before the method
  const category = reqHandler[0].replace("Controller", "");
  const priviledgeType = reqHandler[1];
  console.log(`Route: ${req.method} ${req.route.path}\nCategory: ${category}\nPreviledgeType: ${priviledgeType}`)
//   console.log(`Associated Controller: ${controllerName}`);

    // console.log(`'${req.method} ${req.route.path}': ${sails.config.routes.foundController}`)


    // Check if the user is authenticated.
    const token = req.cookies.Authorization;

    // If there is no token, then redirect to login page.
    if (!token) {
        return res
            .status(ResponseCode.UNAUTHORIZED)
            .json({ type: "error", message: "Unauthorized..." });
    }
    console.log("Token is : ", token);
    // Verify the token.
    try {
        // Check if there is any user with this token.
        const tokenfound = await Users.findOne({ accessToken: token });
        console.log("TokenFound:", tokenfound);
        if (tokenfound) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;

            // Forward the request to the destined endpoint.
            console.log("⏩ Requested Forwarded to Controller...");
            proceed();
        } else {
            // Remove the Invalid token from the cookies.
            console.log("redirected");
            res.clearCookie("Authorization");

            return res
                .status(ResponseCode.UNAUTHORIZED)
                .json({ type: "error", message: "Invalid Token" });
        }
    } catch (error) {
        console.log("Error is :", error);
        return res.redirect("/");
    }
    console.log("✅ Middleware is done running.");
};
