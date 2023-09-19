import axios from 'axios';
import { getConfig } from '../config';
import Error400 from '../errors/Error400';

export const baseURL =
  'https://api.airtable.com/v0/appdvY1q8ohEI0O9k';

class UserTable {
  static async findByEmail(email: string) {
    const response = await axios.get(`${baseURL}/Users`, {
      headers: {
        Authorization: `Bearer ${
          getConfig().AIRTABLE_API_KEY
        }`,
      },
    });

    if (
      !response?.data?.records ||
      !response?.data?.records?.length
    ) {
      new Error400('Not Exist');
    }

    let user;

    response.data.records.map((record) => {
      if (record.fields?.email === email) {
        user = {
          ...record.fields,
          id: record.id,
          createdAt: record.createdTime,
        };

        return record;
      }
    });

    return user;
  }

  static async findById(id: string) {
    const response = await axios.get(
      `${baseURL}/Users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${
            getConfig().AIRTABLE_API_KEY
          }`,
        },
      },
    );

    if (!response?.data) {
      new Error400('Not Exist');
    }

    const record = {
      ...response.data.fields,
      id: response.data.id,
      createdAt: response.data.createdTime,
    };

    return record;
  }

  static async register(
    email: string,
    password: string,
    role: string,
  ) {
    const response = await axios.post(
      `${baseURL}/Users`,
      {
        fields: {
          email,
          password,
          role,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${
            getConfig().AIRTABLE_API_KEY
          }`,
        },
      },
    );

    if (
      !response?.data?.records ||
      !response?.data?.records?.length
    ) {
      new Error400('Not Created');
    }

    const record = {
      ...response.data.fields,
      id: response.data.id,
      createdAt: response.data.createdTime,
    };

    return record;
  }
}

export default UserTable;
