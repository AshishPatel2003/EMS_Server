/**
 * Events.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    eventName: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: false,
    },
    bannerImg: {
      type: 'string',
      required: false,
    },
    cardImg: {
      type: 'string',
      required: false,
    },
    date: {
      type: 'string',
      required: false,
    },
    startTime: {
      type: 'string',
      required: false,
    },
    endTime: {
      type: 'string',
      required: false,
    },
    venue: {
      type: 'string',
      required: false
    },
    showSeats: {
      type: 'boolean',
      required: false
    },
    maxSeats: {
      type: 'string',
      required: false
    },
    paid: {
      type: 'boolean',
      required: false
    },
    ticketPricing: {
      type: 'string',
      required: false
    },
    status: {
      type: 'string',
      required: false
    },
    budget: {
      type: 'number',
      required: false
    },




    // Access
   
    eventmember: {
      collection: "eventmembers",
      via: 'event' 
    },
    eventresources: {
      collection: "eventresources",
      via: 'event'
    },
    suggestion: {
      collection: "suggestions",
      via: 'event'
    },
    registration: {
      collection: "registrations",
      via: 'event'
    },
    guest: {
      collection: "guests",
      via: 'event' 
    },
  },
};

