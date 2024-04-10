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

    // User
    'POST /signup' : 'UserController.signup',
    'POST /login' : 'UserController.login',

    // Role
    'GET /role': 'RoleController.getRoles',
    'PUT /role/add': 'RoleController.addRole',
    'PATCH /role/:id/update': 'RoleController.updateRole',
    'DELETE /role/:id/delete': 'RoleController.deleteRole',

    // Permission
    'GET /permission': 'PermissionController.getPermissions',
    'PUT /permission/add': 'PermissionController.addPermission',
    'PATCH /permission/:id/update': 'PermissionController.updatePermission',
    'DELETE /permission/:id/delete': 'PermissionController.deletePermission',

    // Access mapping
    'GET /role/:id/permission': 'AccessMappingController.getAccessMappings',
    'PUT /role/:id/permission/:permissionId/add': 'AccessMappingController.addAccessMapping',
    'DELETE /role/:id/permission/:permissionId/delete': 'AccessMappingController.deleteAccessMapping',


    // Event Roles
    'GET /event-role': 'EventRoleController.getEventRoles',
    'PUT /event-role/add': 'EventRoleController.addEventRole',
    'PATCH /event-role/:id/update': 'EventRoleController.updateEventRole',
    'DELETE /event-role/:id/delete': 'EventRoleController.deleteEventRole',

    // Event
    'GET /event': 'EventController.getEvents',
    'PUT /event/add': 'EventController.addEvent',
    'PATCH /event/:eventId/update': 'EventController.updateEvent',
    'DELETE /event/:eventId/delete': 'EventController.deleteEvent',

    // Event Members
    'GET /event/:eventId/member': 'EventMemberController.getEventMembers',
    'PUT /event/:eventId/member/:memberId/add': 'EventMemberController.addEventMember',
    'DELETE /event/:eventId/member/:memberId/delete': 'EventMemberController.deleteEventMember',

    // Guest 
    'GET /event/:eventId/guest': 'GuestController.getGuests',
    'PUT /event/:eventId/guest/add': 'GuestController.addGuest',
    'PATCH /event/:eventId/guest/:guestId/update': 'GuestController.updateGuest',
    'DELETE /event/:eventId/guest/:guestId/delete': 'GuestController.deleteGuest',

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
    'PATCH /event/:eventId/registration/:registrationId/add-attendance': 'RegistrationController.addAttendance',
    'DELETE /event/:eventId/registration/:registrationId/unenroll': 'RegistrationController.unenroll',
};
