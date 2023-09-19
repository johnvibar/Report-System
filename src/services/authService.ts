import Error400 from '../errors/Error400';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getConfig } from '../config';
import UserTable from '../airtable/User';
import Error401 from '../errors/Error401';

const BCRYPT_SALT_ROUNDS = 12;

class AuthService {
  static async signup(email, password, role) {
    try {
      email = email.toLowerCase();

      const existingUser = await UserTable.findByEmail(
        email,
      );

      // The user may already exist on the database in case it was invided.
      if (existingUser) {
        const passwordsMatch = await bcrypt.compare(
          password,
          existingUser.password,
        );

        if (passwordsMatch) {
          const token = jwt.sign(
            { id: existingUser.id },
            getConfig().AUTH_JWT_SECRET,
            { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
          );

          return token;
        }
      }

      // Generates a hashed password to hide the original one.
      const hashedPassword = await bcrypt.hash(
        password,
        BCRYPT_SALT_ROUNDS,
      );

      const newUser = await UserTable.register(
        email,
        hashedPassword,
        role,
      );

      const token = jwt.sign(
        { id: newUser.id },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
      );

      return token;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  static async signin(email, password) {
    try {
      email = email.toLowerCase();
      const user = await UserTable.findByEmail(email);

      if (!user) {
        throw new Error400('User Not Exist');
      }

      if (!user.password) {
        throw new Error400('Password Not Exist');
      }

      const passwordsMatch = await bcrypt.compare(
        password,
        user.password,
      );

      if (!passwordsMatch) {
        throw new Error400('Wrong Password');
      }

      const token = jwt.sign(
        { id: user.id },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
      );

      return token;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  static async findByToken(token, options) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getConfig().AUTH_JWT_SECRET,
        (err, decoded) => {
          if (err) {
            reject(err);
            return;
          }

          const id = decoded.id;

          UserTable.findById(id)
            .then((user) => {
              if (!user) {
                reject(new Error401('Unauthorized!'));
                return;
              }

              resolve(user);
            })
            .catch((error) => reject(error));
        },
      );
    });
  }
}

export default AuthService;
