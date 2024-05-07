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
    // "getRoles": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    // "addRole": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    // "updateRole": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    // "deleteRole": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
  },
  "PermissionController": {
    // "getPermissions": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    // "addPermission": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    // "updatePermission": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    // "deletePermission": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
  },
  "AccessMappingController": {
    // "getAccessMappings": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    // "addAccessMapping": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    // "deleteAccessMapping": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
  },
  "EventRoleController": {
    "getEventRoles": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    "addEventRole": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    "updateEventRole": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    "deleteEventRole": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
  },
  "EventController": {
    "getEvents": ["isLoggedIn", "isValidRole", "isRoleAdminOrStudent"],
    "addEvent": ["isLoggedIn", "isValidRole", "isRoleStudent"],
    "updateEvent": ["isLoggedIn", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer", "isValidEvent"],
    "approveEvent": ["isLoggedIn", "isValidRole", "isRoleAdmin", "isValidEvent"],
    "deleteEvent": ["isLoggedIn", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer", "isValidEvent"],
  },
  "SpeakerController": {
    "getSpeakers": ["isLoggedIn", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer"],
    "addSpeaker": ["isLoggedIn", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer"],
    "updateSpeaker": ["isLoggedIn", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer", "isValidSpeaker"],
    "deleteSpeaker": ["isLoggedIn", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer", "isValidSpeaker"],
  },
  "EventMemberController": {
    "getEventMembers": ["isLoggedIn", "isValidRole", "isValidEvent", "isRoleAdminOrStudent"],
    "addEventMember": ["isLoggedIn", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer", "isValidUser"],
    "deleteEventMember": ["isLoggedIn", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer",  "isValidUser"]
  },
  "ResourceController": {
    "getResources": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    "addResource": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    "updateResource": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
    "deleteResource": ["isLoggedIn", "isValidRole", "isRoleAdmin"],
  },
  "EventResourceController" : {
    "getEventResources": ["isLoggedIn", "isValidRole", "isRoleAdminOrStudent", "isValidEvent"],
    "addEventResource": ["isLoggedIn", "isValidRole", "isRoleStudent", "isEREventOrganizer", "isValidEvent", "isValidResource"],
    "deleteEventResource": ["isLoggedIn", "isValidRole", "isRoleStudent", "isEREventOrganizer", "isValidEvent", "isValidResource"]
  },
  "SuggestionController": {
    "getSuggestions": ["isLoggedIn", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer"],
    "addSuggestion": ["isLoggedIn", "isValidRole", "isRoleAdminOrStudent", "isValidEvent", "isEREventOrganizer"]
  },
  "RegistrationController": {
    "getRegistrations": ["isLoggedIn", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer"],
    "enroll": ["isLoggedIn", "isValidRole","isRoleStudent", "isValidEvent"],
    "addAttendance": ["isLoggedIn", "isValidRole", "isRoleStudent", "isValidEvent", "isEREventOrganizer"],
    "unenroll": ["isLoggedIn", "isValidRole", "isRoleStudent", "isValidEvent"]
  }
};
