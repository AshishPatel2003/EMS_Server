/**
 * Notifications.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
  
      title: {
        type: 'string',
        required: true,
      },
      message: {
        type: 'string',
        required: true,
      },
      markAsRead: {
        type: 'boolean',
        required: false,
      },
       
  
      // Foreign keys
      sender: {
        model: "users"
      },
      receiver: {
        model: "users"
      },
    },
  };
  
  