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
  "RoleController": {
    "getRoles": ["isLoggedIn", "isValidAdminRole"],
    "addRole": ["isLoggedIn", "isValidAdminRole"],
    "updateRole": ["isLoggedIn", "isValidAdminRole"],
    "deleteRole": ["isLoggedIn", "isValidAdminRole"],
  },
  "PermissionController": {
    "getPermissions": ["isLoggedIn", "isValidAdminRole"],
    "addPermission": ["isLoggedIn", "isValidAdminRole"],
    "updatePermission": ["isLoggedIn", "isValidAdminRole"],
    "deletePermission": ["isLoggedIn", "isValidAdminRole"],
  },
  "AccessMappingController": {
    "getAccessMappings": ["isLoggedIn", "isValidAdminRole"],
    "addAccessMapping": ["isLoggedIn", "isValidAdminRole"],
    "deleteAccessMapping": ["isLoggedIn", "isValidAdminRole"],
  },
  "EventRoleController": {
    "getEventRoles": ["isLoggedIn", "isValidAdminRole"],
    "addEventRole": ["isLoggedIn", "isValidAdminRole"],
    "updateEventRole": ["isLoggedIn", "isValidAdminRole"],
    "deleteEventRole": ["isLoggedIn", "isValidAdminRole"],
  },

};
