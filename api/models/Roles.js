/**
 * Roles.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    roleName: {
      type: 'string',
      required: true,
    },
    users: {
      collection: 'users',
      via: "role"
    },
    accessMapping: {
      collection: 'accessmappings',
      via: "role"
    }
  },
};

