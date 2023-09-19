export const orderColumns = [
  { field: "customerPO", headerName: "PO", width: 161 },
  { field: "customerPODate", headerName: "PO Date", width: 188 },
  { field: "TotalQtySo", headerName: "Price" },
];

export const poDetailColumns = [
  { field: "ConverterPONumber", headerName: "PO Number", width: 143 },
  { field: "CustomerPODate", headerName: "PO Date", width: 129 },
  { field: "SOStatus", headerName: "SO Status", width: 129 },
  {
    field: "CustomerPartNumber",
    headerName: "Customer Part #",
    width: 153,
  },
  {
    field: "CustomerPNDescription",
    headerName: "P.N Description",
    width: 214,
  },
  { field: "QtySo", headerName: "QTY SO", width: 129 },
  { field: "OCDate", headerName: "OC Delivery Date", width: 168 },
  { field: "AmountDelivered", headerName: "Amount Delivered", width: 170 },
  { field: "BalanceToDeliver", headerName: "Balance to Deliver", width: 165 },
  {
    field: "UpdatedDeliveryDate",
    headerName: "Updated Delivery D.",
    width: 196,
  },
  // { field: "Price", headerName: "Price", width: 100 },
];

export const deliveryColumns = [
  // { field: "SONumber", headerName: "SO Nmuber", width: 200 },
  // { field: "CatalogNumber", headerName: "Catalog Nmuber", width: 200 },
  // { field: "ConverterPONumber", headerName: "Converter PO Nmuber", width: 200 },
  { field: "DeliveryDate", headerName: "Delivery Date", width: 200 },
  { field: "AmountDelivered", headerName: "Amount Deliverd", width: 200 },
  { field: "OrderItemID", headerName: "Accumulated Total Delivered", width: 200 },
];