/**
 * EventResources.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    event: {
      model: 'events'
    },
    resource: {
      model: 'resources'
    }
  },
};

