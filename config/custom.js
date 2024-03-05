/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …

  nodemailer: {
    transporter: {
      service: 'Gmail', // or your email service provider
      auth: {
        user: '20bt04004@gsfcuniversity.ac.in',
        pass: 'czsnsqnihezxgxma',
      },
    },
    defaults: {
      from: '20bt04004@gsfcuniversity.ac.in',
    },
  },

};
