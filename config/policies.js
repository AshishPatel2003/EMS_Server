/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  "UserController": {
    "signup": ["validations/UserValidation/signup"],
    "login": ["validations/UserValidation/login"],
    "getProfile": ['authenticateUser'],
    "updateProfile": ['authenticateUser']
  },
  "RoleController": {
    // "getRoles": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    // "addRole": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    // "updateRole": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    // "deleteRole": ["authenticateUser", "isValidRole", "isRoleAdmin"],
  },
  "PermissionController": {
    // "getPermissions": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    // "addPermission": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    // "updatePermission": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    // "deletePermission": ["authenticateUser", "isValidRole", "isRoleAdmin"],
  },
  "AccessMappingController": {
    "getAccessMappings": ["authenticateUser", "isValidRole", "isRoleAdminOrStudent"],
    // "addAccessMapping": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    // "deleteAccessMapping": ["authenticateUser", "isValidRole", "isRoleAdmin"],
  },
  "EventRoleController": {
    "getEventRoles": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    "addEventRole": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    "updateEventRole": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    "deleteEventRole": ["authenticateUser", "isValidRole", "isRoleAdmin"],
  },

  "VenueController": {
    "getVenues": ["authenticateUser", "isValidRole", "isRoleAdminOrStudent"],
    "addVenue": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    "updateVenue": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    "deleteVenue": ["authenticateUser", "isValidRole", "isRoleAdmin"],
  },

  "EventController": {
    "getEvents": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    "getEvent": ["authenticateUser", "isValidRole"],
    "getMyEvents": ["authenticateUser", "isValidRole", "isRoleAdminOrStudent"],
    "getMyEvent": ["authenticateUser", "isValidRole", "isRoleStudent"],
    "uploadBanner": ["authenticateUser", "isValidRole", "isRoleStudent"],
    "updateEventName": ["authenticateUser", "isValidRole", "isRoleStudent"],
    "updateEventInfo": ["authenticateUser", "isValidRole", "isRoleStudent"],
    "updateSchedule": ["authenticateUser", "isValidRole", "isRoleStudent"],
    "addEvent": ["authenticateUser", "isValidRole", "isRoleStudent"],
    "updateEvent": ["authenticateUser", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer", "isValidEvent"],
    "approveEvent": ["authenticateUser", "isValidRole", "isRoleAdmin", "isValidEvent"],
    "deleteEvent": ["authenticateUser", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer", "isValidEvent"],
  },
  "SpeakerController": {
    "getSpeakers": ["authenticateUser", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer"],
    "addSpeaker": ["authenticateUser", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer"],
    "updateSpeaker": ["authenticateUser", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer", "isValidSpeaker"],
    "deleteSpeaker": ["authenticateUser", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer", "isValidSpeaker"],
  },
  "EventMemberController": {
    "getEventMembers": ["authenticateUser", "isValidRole", "isValidEvent", "isRoleAdminOrStudent"],
    "addEventMember": ["authenticateUser", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer", "isValidUser"],
    "deleteEventMember": ["authenticateUser", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer",  "isValidUser"]
  },
  "ResourceController": {
    "getResources": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    "addResource": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    "updateResource": ["authenticateUser", "isValidRole", "isRoleAdmin"],
    "deleteResource": ["authenticateUser", "isValidRole", "isRoleAdmin"],
  },
  "EventResourceController" : {
    "getEventResources": ["authenticateUser", "isValidRole", "isRoleAdminOrStudent", "isValidEvent"],
    "addEventResource": ["authenticateUser", "isValidRole", "isRoleStudent", "isEREventOrganizer", "isValidEvent", "isValidResource"],
    "deleteEventResource": ["authenticateUser", "isValidRole", "isRoleStudent", "isEREventOrganizer", "isValidEvent", "isValidResource"]
  },
  "SuggestionController": {
    "getSuggestions": ["authenticateUser", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer"],
    "addSuggestion": ["authenticateUser", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer"]
  },
  "RegistrationController": {
    "getRegistrations": ["authenticateUser", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer"],
    "enroll": ["authenticateUser", "isValidRole","isRoleStudent", "isValidEvent"],
    "addAttendance": ["authenticateUser", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer"],
    "unenroll": ["authenticateUser", "isValidRole", "isRoleStudent", "isValidEvent"]
  }
};
