import assert from 'assert';
import Error403 from '../errors/Error403';

export default class PermissionChecker {
  currentUser;

  constructor({ currentUser }) {
    this.currentUser = currentUser;
  }

  /**
   * Validates if the user has a specific permission
   * and throws a Error403 if it doesn't.
   */
  validateHas(permission) {
    if (!this.has(permission)) {
      throw new Error403('Not Allowed');
    }
  }

  /**
   * Checks if the user has a specific permission.
   */
  has(permission) {
    assert(permission, 'permission is required');

    return this.hasRolePermission(permission);
  }

  /**
   * Checks if the current user roles allows the permission.
   */
  hasRolePermission(permission) {
    return permission.allowedRoles.some(
      (allowedRole) => this.currentUserRole === allowedRole,
    );
  }

  get currentUserRole() {
    if (!this.currentUser) {
      return null;
    }

    return this.currentUser.role;
  }
}
