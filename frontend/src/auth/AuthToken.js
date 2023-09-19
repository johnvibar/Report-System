export class AuthToken {
  static get() {
    return (
      localStorage.getItem('jwt') || null
    );
  }

  static set(token) {
      localStorage.setItem('jwt', token || '');
  }

  static setCurrentUser(user) {
    localStorage.setItem('currentUser', user);
  }

  static getCurrentUser() {
    return ( localStorage.getItem('currentUser') || null);
  }
}
