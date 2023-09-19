import axios from 'axios';
import { getConfig } from '../config';
import { baseURL } from './User';
import Error400 from '../errors/Error400';

class DeliveryTable {
  static async find() {
    const response = await axios.get(
      `${baseURL}/OrdersDeliveryStatus`,
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
      new Error400('Not Exist');
    }

    const records = response.data.records.map((record) => {
      const row = record.fields;
      return {
        ...row,
        id: record.id,
        createdAt: record.createdTime,
      };
    });

    return records;
  }
}

export default DeliveryTable;
