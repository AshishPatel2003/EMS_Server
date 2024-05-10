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
      model: 'venues',
    },
    showSeats: {
      type: 'boolean',
      required: false
    },
    maxSeats: {
      type: 'number',
      required: false
    },
    paid: {
      type: 'boolean',
      required: false
    },
    ticketPricing: {
      type: 'number',
      required: false
    },
    // Initiated: when created
    // Created: when infor updated first time.
    // Pending: when event proposal submitted.
    // Approved: when event proposal accepted - volunter add, participation start
    // Concluded: when event finished. block delete volunteer, block participant addition.
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
    eventresource: {
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
    speaker: {
      collection: "speakers",
      via: 'event' 
    },
  },
};

