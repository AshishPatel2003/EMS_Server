/**
 * Guests.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        guestName: {
            type: "string",
            required: false,
        },
        guestImg: {
            type: "string",
            required: false,
        },
        designation: {
            type: "string",
            required: true,
        },

        // Foreign Key
        event: {
            model: 'events'
        }
    },
};
