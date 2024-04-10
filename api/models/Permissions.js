/**
 * Permission.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
      permissionName: {
        type: 'string',
        required: true,
      },

      accessMapping: {
        collection: "accessmappings",
        via: "permission"
      }
      
    },
  };
  
  