/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    // User - Complete
    'POST /signup' : 'UserController.signup',
    'POST /login' : 'UserController.login',
    'POST /get-profile': 'UserController.getProfile',
    'PATCH /update-profile': 'UserController.updateProfile',

    // Role - Complete
    'GET /role': 'RoleController.getRoles',
    'PUT /role/add': 'RoleController.addRole',
    'PATCH /role/:id/update': 'RoleController.updateRole',
    'DELETE /role/:id/delete': 'RoleController.deleteRole',

    // Permission - Complete
    'GET /permission': 'PermissionController.getPermissions',
    'PUT /permission/add': 'PermissionController.addPermission',
    'PATCH /permission/:id/update': 'PermissionController.updatePermission',
    'DELETE /permission/:id/delete': 'PermissionController.deletePermission',

    // Access mapping - Complete
    'GET /role/:id/permission': 'AccessMappingController.getAccessMappings',
    'PUT /role/:id/permission/:permissionId/add': 'AccessMappingController.addAccessMapping',
    'DELETE /role/:id/permission/:permissionId/delete': 'AccessMappingController.deleteAccessMapping',


    // Event Roles - Complete
    'GET /event-role': 'EventRoleController.getEventRoles',
    'PUT /event-role/add': 'EventRoleController.addEventRole',
    'PATCH /event-role/:id/update': 'EventRoleController.updateEventRole',
    'DELETE /event-role/:id/delete': 'EventRoleController.deleteEventRole',


    // Venues
    'GET /venue': 'VenueController.getVenues',
    'PUT /venue/add': 'VenueController.addVenue',
    'PATCH /venue/:id/update': 'VenueController.updateVenue',
    'DELETE /venue/:id/delete': 'VenueController.deleteVenue',


    // Event 
    'GET /events': 'EventController.getEvents',
    'GET /event/:id': 'EventController.getEvent',
    'GET /my-events': 'EventController.getMyEvents',
    'GET /my-event/:id': 'EventController.getMyEvent',
    'PUT /event/initiate': 'EventController.addEvent',
    'PATCH /my-event/:id/upload-banner': 'EventController.uploadBanner',
    'PATCH /my-event/:id/update-eventname': 'EventController.updateEventName',
    'PATCH /my-event/:id/update-eventinfo': 'EventController.updateEventInfo',
    'PATCH /my-event/:id/update-schedule': 'EventController.updateSchedule',
    'PATCH /event/:eventId/update': 'EventController.updateEvent',
    'PATCH /event/:eventId/approve': 'EventController.approveEvent',
    'DELETE /event/:eventId/delete': 'EventController.deleteEvent',

    // Event Members
    'GET /event/:eventId/member': 'EventMemberController.getEventMembers',
    'PUT /event/:eventId/member/:userId/add': 'EventMemberController.addEventMember',
    'DELETE /event/:eventId/member/:userId/delete': 'EventMemberController.deleteEventMember',

    // Speaker 
    // 'GET /event/:eventId/speaker': 'SpeakerController.getSpeakers',
    'GET /event/:eventId/speaker': 'SpeakerController.getSpeakers',
    'PUT /event/:eventId/speaker/add': 'SpeakerController.addSpeaker',
    'PATCH /event/:eventId/speaker/:speakerId/update': 'SpeakerController.updateSpeaker',
    'DELETE /event/:eventId/speaker/:speakerId/delete': 'SpeakerController.deleteSpeaker',

    // Resources
    'GET /resource': 'ResourceController.getResources',
    'PUT /resource/add': 'ResourceController.addResource',
    'PATCH /resource/:id/update': 'ResourceController.updateResource',
    'DELETE /resource/:id/delete': 'ResourceController.deleteResource',

    // Event Resources
    'GET /event/:eventId/resource': 'EventResourceController.getEventResources',
    'PUT /event/:eventId/resource/:resourceId/add': 'EventResourceController.addEventResource',
    'DELETE /event/:eventId/resource/:resourceId/delete': 'EventResourceController.deleteEventResource',

    // Suggestions
    'GET /event/:eventId/suggest': 'SuggestionController.getSuggestions',
    'PUT /event/:eventId/suggest/add': 'SuggestionController.addSuggestion',

    // Registrations
    'GET /event/:eventId/registration': 'RegistrationController.getRegistrations',
    'PUT /event/:eventId/registration/enroll': 'RegistrationController.enroll',
    'PATCH /event/:eventId/registration/add-attendance': 'RegistrationController.addAttendance',
    'DELETE /event/:eventId/registration/unenroll': 'RegistrationController.unenroll',
};
