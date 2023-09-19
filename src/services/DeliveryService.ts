import DeliveryTable from '../airtable/Delivery';
import Error400 from '../errors/Error400';

class DeliverService {
  static async find() {
    const records = await DeliveryTable.find();

    if (!records || !records.length) {
      new Error400('Not Found');
    }

    return records;
  }
}

export default DeliverService;
