import OrderTable from '../airtable/Orders';
import Error400 from '../errors/Error400';

class OrderService {
  static async find() {
    const records = await OrderTable.find();

    if (!records || !records.length) {
      new Error400('Not Exist');
    }

    const ordersByGroup = this._groupBy(
      records,
      'CustomerPO',
    );
    const orders = Object.entries(ordersByGroup).map(
      ([key, value]: [any, any]) => {
        const sumOfQty = value.reduce((sum, row) => {
          return sum + row.QtySo;
        }, 0);

        return {
          id: key,
          customerPO: key,
          customerPODate: value[0]['CustomerPODate'],
          TotalQtySo: sumOfQty,
          PODetails: value,
        };
      },
    );

    return orders;
  }

  static async findById(id: string) {
    const record = await OrderTable.findById(id);

    if (!record) {
      new Error400('Not Exist');
    }

    return record;
  }

  static async update(id: string, data: Object) {
    const record = await OrderTable.update(id, data);

    return record;
  }

  static _groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      if (!result[currentValue[key]]) {
        result[currentValue[key]] = [];
      }
      result[currentValue[key]].push(currentValue);

      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };
}

export default OrderService;
