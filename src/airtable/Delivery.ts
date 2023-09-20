import axios from 'axios';
import { getConfig } from '../config';
import { baseURL } from './User';
import Error400 from '../errors/Error400';

class DeliveryTable {
  static async find() {

    const allRecords : string[] = [];
    let offset = undefined;
    let sendRecords;

    try {
      do{
        const response = await axios.get(`${baseURL}/OrdersDeliveryStatus`, {
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
}

export default DeliveryTable;
