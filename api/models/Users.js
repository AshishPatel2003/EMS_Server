/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    firstName: {
      type: 'string',
      required: true,
    },
    middleName: {
      type: 'string',
      required: false,
    },
    lastName: {
      type: 'string',
      required: false,
    },
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    accessToken: {
      type: 'string',
      required: false
    },



    // Foreign keys
    role: {
      model: "roles"
    },


    // Access
    eventmember: {
      collection: "eventmembers",
      via: 'user' 
    },
    registration: {
      collection: "registrations",
      via: 'user' 
    },
    sender: {
      collection: "notifications",
      via: 'sender'
    }, 
    receiver: {
      collection: "notifications",
      via: 'receiver'
    }
  },
};

