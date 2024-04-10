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

    'POST /signup' : 'UserController.signup',
    'POST /login' : 'UserController.login',

    'GET /role': 'RoleController.getRoles',
    'PUT /role/add': 'RoleController.addRole',
    'PATCH /role/:id/update': 'RoleController.updateRole',
    'DELETE /role/:id/delete': 'RoleController.deleteRole',

    'GET /permission': 'PermissionController.getPermissions',
    'PUT /permission/add': 'PermissionController.addPermission',
    'PATCH /permission/:id/update': 'PermissionController.updatePermission',
    'DELETE /permission/:id/delete': 'PermissionController.deletePermission',

    'GET /role/:id/permission': 'AccessMappingController.getAccessMappings',
    'PUT /role/:id/permission/:permissionId/add': 'AccessMappingController.addAccessMapping',
    'DELETE /role/:id/permission/:permissionId/delete': 'AccessMappingController.deleteAccessMapping',

};
