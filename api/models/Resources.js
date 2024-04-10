/**
 * Resources.js
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
  
    // Access
    eventresource: {
      collection: "eventresources",
      via: 'resource' 
    }
  },
};

