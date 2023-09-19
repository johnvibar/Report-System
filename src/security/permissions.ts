import Roles from './roles';

const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      orderRead: {
        id: 'orderRead',
        allowedRoles: [roles.management, roles.client],
      },
      orderEdit: {
        id: 'orderEdit',
        allowedRoles: [roles.management],
      },
      deliveryRead: {
        id: 'deliveryRead',
        allowedRoles: [roles.management, roles.client],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
