
const { nodemailer, path, ejs } = sails.config.constants.Dependencies.nodemailer;

module.exports = {


  friendlyName: 'Send Email',


  description: 'Send an email using nodemailer and EJS templates.',


  inputs: {
    to: {
      type: 'string',
      required: true,
      description: 'Email recipient address',
    },
    subject: {
      type: 'string',
      required: true,
      description: 'Email subject',
    },
    template: {
      type: 'string',
      required: true,
      description: 'EJS template name',
    },
    data: {
      type: 'ref',
      description: 'Data to pass to the EJS template',
      defaultsTo: {},
    },
  },


  exits: {

    success: {
      description: 'Email sent successfully.',
    },
    error: {
      description: 'An error occurred while sending the email.',
    },

  },


  fn: async function ({ to, subject, template, data }) {

    const transporter = nodemailer.createTransport(sails.config.custom.nodemailer.transporter);

    const templatePath = path.resolve(__dirname, `../emailTemplates/${template}.ejs`);
    const emailHtml = await ejs.renderFile(templatePath, data);

    const mailOptions = {
      from: sails.config.custom.nodemailer.defaults.from,
      to,
      subject,
      html: emailHtml,
    };

    try {
      await transporter.sendMail(mailOptions);
      return this.success('Email sent successfully.');
    } catch (error) {
      console.log(error)
      return this.error('An error occurred while sending the email.');
    }
  }


};

