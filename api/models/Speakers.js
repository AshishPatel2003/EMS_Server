/**
 * Guests.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        speakerName: {
            type: "string",
            required: false,
        },
        speakerImg: {
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
