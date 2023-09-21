export const orderColumns = [
  { id: 1, field: "customerPO", headerName: "PO", width: 161 },
  { id: 2, field: "customerPODate", headerName: "PO Date", width: 188 },
  { id: 3, field: "TotalQtySo", headerName: "PO Value" },
];

export const poDetailColumns = [
  { id: 1, field: "ConverterPONumber", headerName: "PO Number", width: 143 },
  { id: 2, field: "CustomerPODate", headerName: "PO Date", width: 129 },
  { id: 3, field: "SOStatus", headerName: "SO Status", width: 129 },
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
  { id: 6, field: "QtySo", headerName: "QTY SO", width: 129 },
  { id: 7, field: "OCDate", headerName: "OC Delivery Date", width: 168 },
  { id: 8, field: "AmountDelivered", headerName: "Amount Delivered", width: 170 },
  { id: 9, field: "BalanceToDeliver", headerName: "Balance to Deliver", width: 165 },
  {
    id: 10, field: "UpdatedDeliveryDate",
    headerName: "Updated Delivery D.",
    width: 196,
  },
];

export const deliveryColumns = [
  { id: 1, field: "DeliveryDate", headerName: "Delivery Date", width: 200 },
  { id: 2, field: "AmountDelivered", headerName: "Amount Deliverd", width: 200 },
  { id: 3, field: "AccumulatedAmount", headerName: "Accumulated Total Delivered", width: 200 },
];