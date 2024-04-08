/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
  
      roleId: {
        type: 'string',
        required: true,
      },
      permissionId: {
        type: 'string',
        required: false,
      },
    },
  };