const { nodemailer, path, ejs } =
    sails.config.constants.Dependencies;

module.exports = {
    friendlyName: "Send Email",

    description: "Send an email using nodemailer and EJS templates.",

    inputs: {
        to: {
            type: "string",
            required: true,
            description: "Email recipient address",
        },
        subject: {
            type: "string",
            required: true,
            description: "Email subject",
        },
        template: {
            type: "string",
            required: true,
            description: "EJS template name",
        },
        mail_data: {
            type: "ref",
            description: "Data to pass to the EJS template",
            defaultsTo: {},
        },
    },

    exits: {
        success: {
            description: "Email sent successfully.",
        },
        error: {
            description: "An error occurred while sending the email.",
        },
    },

    fn: async function ({ to, subject, template, mail_data }, exits) {

        console.log("email helper");
        console.log(to, subject, template, mail_data);

        const transporter = nodemailer.createTransport(
            sails.config.custom.nodemailer.transporter
        );

        const templatePath = path.resolve(
            __dirname,
            `./../emailTemplates/${template}.ejs`
        );
        const emailHtml = await ejs.renderFile(templatePath, mail_data);

        const mailOptions = {
            from: sails.config.custom.nodemailer.defaults.from,
            to: to,
            subject: subject,
            html: emailHtml,
        };

        // Handle the result accordingly
        try {
          const result = await transporter.sendMail(mailOptions);
          console.log("Result => ", result);
          if (result) {
              console.log("Email sent to " + to);
              return exits.success("Email Sent Successfully.");
          } else {
              console.log("Email sent failed");
              return exits.success("Failed to send Email");
          }
        } catch (error) {
          return exits.error(error);
        }

    },
};
