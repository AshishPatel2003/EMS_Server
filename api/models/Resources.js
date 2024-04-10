/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    resourceName: {
      type: 'string',
      required: true,
    },
  
    // Access Permission
    eventresource: {
      collection: "eventresources",
      via: 'resource' 
    }
  },
};

