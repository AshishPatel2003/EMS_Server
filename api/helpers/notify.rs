const { nodemailer, path, ejs } =
    sails.config.constants.Dependencies;

module.exports = {
    friendlyName: "Send Email",

    description: "Send an email using nodemailer and EJS templates.",

    inputs: {
        title: {
            type: "string",
            required: true,
            description: "Title of the Notification",
        },
        message: {
            type: "string",
            required: true,
            description: "Content of the Notification",
        },
        sender: {
            type: "string",
            required: true,
            description: "Sender of the Notification",
        },
        receiver: {
            type: "string",
            required: true,
            description: "Receiver of the Notification",
        },
    },

    exits: {
        success: {
            description: "Notified successfully.",
        },
        error: {
            description: "An error occurred while sending the notification.",
        },
    },

    fn: async function ({ title, message, sender, receiver }, exits) {

        console.log("Notification helper");
        console.log(title, message, sender, receiver);

        try {
            let notify = await Notifications.create(
                {
                    title: title,
                    message: message,
                    markAsRead: false,
                    sender: sender,
                    receiver: receiver
                }
            ).fetch();
            if (notify) {
                console.log("notification sent successfully")
                return exits.success("notification sent successfully");
            } else {
                console.log("Failes to send notification")
                res.error("Failes to send notification")
            }
        } catch (error) {
          return exits.error(error);
        }

    },
};
