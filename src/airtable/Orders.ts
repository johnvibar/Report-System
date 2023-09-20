import axios from 'axios';
import { getConfig } from '../config';
import { baseURL } from './User';
import Error400 from '../errors/Error400';

class OrderTable {
  static async find() {

    const allRecords : string[] = [];
    let offset = undefined;
    let sendRecords;

    try {
      do{
        const response = await axios.get(`${baseURL}/Orders`, {
          headers: {
            Authorization: `Bearer ${
              getConfig().AIRTABLE_API_KEY
            }`,
          },
          params: {
            pageSize: 100,
            offset,
          }
        });

        if (
          !response?.data?.records ||
          !response?.data?.records?.length
        ) {
          new Error400('Not Exist');
        }

        const records = response.data.records;
        allRecords.push(...records);
        offset = response.data.offset;

        sendRecords = allRecords.map((record) => {
          const row = record.fields;
          return {
            ...row,
            id: record.id,
            createdAt: record.createdTime,
          };
        });
      } while (offset);
      return sendRecords;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  static async findById(id: string) {
    const response = await axios.get(`${baseURL}/Orders`, {
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

    let orders: Array<any> = [];

    response.data.records.map((record) => {
      if (record.fields.CustomerPO === id) {
        orders.push({
          ...record.fields,
          id: record.id,
          createdAt: record.createdTime,
        });
      }
    });

    return orders;
  }

  static async update(id, data) {
    const response = await axios.put(
      `${baseURL}/Orders/${id}`,
      data,
      {
        headers: {
          authorization: `Bearer ${
            getConfig().AIRTABLE_API_KEY
          }`,
        },
      },
    );

    if (!response?.data?.records) {
      new Error400('Not Updated');
    }

    const record = {
      ...response.data.fields,
      id: response.data.id,
      createdAt: response.data.createdTime,
    };

    return record;
  }
}

export default OrderTable;
