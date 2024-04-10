/**
 * AccessMappings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
  
      role: {
        model: "roles"
      },
      permission: {
        model: 'permissions'
      },
    },
  };