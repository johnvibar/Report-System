export const orderColumns = [
  {
    id: 1,
    field: "customerPO",
    headerName: "Customer PO",
    width: 161,
    renderCell: (params) => {
      return (
        <div className="not-hover">
          {params.value}
        </div>
      );
    },
  },
  {
    id: 2,
    field: 'customerPODate',
    headerName: 'PO Date',
    width: 188,
    renderCell: (params) => {
      if (params.value === null || params.value === undefined) {
        return '';
      }
      const date = new Date(params.value);
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    },
  },
  { id: 3, field: "customerName", headerName: "Customer Name", width: 200 },
  { id: 4, field: "TotalQtySo", headerName: "PO Value", width: 200, align: 'right' },
];

export const poDetailColumns = [
  { id: 1, field: "CustomerPO", headerName: "Customer PO", width: 143 },
  {
    id: 2, field: "CustomerPODate",
    headerName: "PO Date",
    width: 129,
    renderCell: (params) => {
      if (params.value === null || params.value === undefined) {
        return '';
      }
      const date = new Date(params.value);
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    },
  },
  { id: 3, field: "SOStatus", headerName: "Status", width: 129 },
  {
    id: 4, field: "CustomerPartNumber",
    headerName: "Customer Part #",
    width: 153,
  },
  {
    id: 5, field: "CustomerPNDescription",
    headerName: "P.N Description",
    width: 214,
  },
  {
    id: 6, field: "QtySo", headerName: "Order QT", width: 129, align: 'right', valueFormatter: (params) => {
      const formattedQuantity = Number(params.value).toLocaleString();
      return formattedQuantity;
    },
  },
  { id: 7, field: "Units", headerName: "Units", width: 50 },
  {
    id: 8,
    field: "AmountDelivered",
    headerName: "Amount Delivered",
    width: 170,
    renderCell: (params) => {
      const formattedValue = Number(params.value).toLocaleString();
      return (
        <div className="not-hover">
          {formattedValue}
        </div>
      );
    },
    align: 'right',

  },
  {
    id: 9, field: "BalanceToDeliver", headerName: "Balance to Deliver", width: 165, align: 'right', valueFormatter: (params) => {
      const formattedQuantity = Number(params.value).toLocaleString();
      return formattedQuantity;
    },
  },
  {
    id: 10,
    field: "OCDate",
    headerName: "OC Delivery Date",
    width: 168,
    renderCell: (params) => {
      if (params.value === null || params.value === undefined) {
        return '';
      }
      const date = new Date(params.value);
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    },
  },
  {
    id: 11, field: "UpdatedDeliveryDate",
    headerName: "Updated Delivery D.",
    width: 196,
    renderCell: (params) => {
      if (params.value === null || params.value === undefined) {
        return '';
      }
      const date = new Date(params.value);
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    },
  },
];

export const deliveryColumns = [
  { id: 1, field: "DeliveryDate", headerName: "Delivery Date", width: 200 },
  { id: 2, field: "AmountDelivered", headerName: "Amount Deliverd", width: 200 },
  { id: 3, field: "AccumulatedAmount", headerName: "Accumulated Delivered", width: 200 },
];