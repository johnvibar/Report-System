import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { Box, Stack, Button, Typography, Modal, CircularProgress } from "@mui/material";
import axios from "axios";
import { AuthToken } from "../../auth/AuthToken";
import Header from "../layout/Header";
import logo from '../../assets/images/logo.png';
import { poDetailColumns, deliveryColumns } from "../../constants/column.constants";

const OrderDetailScreen = (props) => {
  const history = useHistory();
  const id = props.match.params.id;

  const [tableData, setTableData] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);
  const [matchedResult, setMatchedResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOrder, setModalOrder] = useState([]);

  const handleRowOver = (e) => {
    const row = e.currentTarget;
    const poColumn = row.querySelector(".not-hover");

    if (poColumn) {
      poColumn.classList.toggle("hovered");
    }
  };

  const handleRowLeaver = (e) => {
    const row = e.currentTarget;
    const poColumn = row.querySelector(".hovered");

    if (poColumn) {
      poColumn.classList.remove("hovered");
    }
  }

  const [filterModel, setFilterModel] = React.useState({
    items: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = AuthToken.get();
      if (!token) {
        history.push('/login');
        return;
      }

      try {
        const [orderResponse, deliveryResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/delivery`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const deliveryData = deliveryResponse.data;
        const orderData = orderResponse.data.map(order => {
          let amountDelivered = 0;
          let maxDeliveryDate = null;

          for (const delivery of deliveryData) {
            if (
              order.CatalogNumber === delivery.CatalogNumber &&
              order.ConverterPONmuber === delivery.ConverterPONmuber
            ) {
              amountDelivered += delivery.AmountDelivered;

              const currentDeliveryDate = delivery.DeliveryDate;
              if (maxDeliveryDate === null || currentDeliveryDate > maxDeliveryDate) {
                maxDeliveryDate = currentDeliveryDate;
              }
            }
          }
          const balanceDeliver = order.QtySo - amountDelivered;
          return {
            ...order,
            AmountDelivered: amountDelivered,
            BalanceToDeliver: balanceDeliver,
            UpdatedDeliveryDate: maxDeliveryDate,
          };
        });

        setTableData(orderData);
        setDeliveryData(deliveryData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [history, id]);

  const handleOpen = (params) => {
    setModalOrder(params.row)
    setOpen(true);
    const matchedDeliveryData = deliveryData.filter(
      d => d.CatalogNumber === params.row.CatalogNumber &&
        d.ConverterPONmuber === params.row.ConverterPONmuber
    );

    // Calculate the Accumlated Amount for each entry in matchedDeliveryData
    const resultWithTotalAmount = matchedDeliveryData.map(row => {
      const filteredDeliveries = matchedDeliveryData.filter(delivery => {
        const deliveryDate = new Date(delivery['DeliveryDate']);
        const currentRowDeliveryDate = new Date(row['DeliveryDate']);
        return deliveryDate <= currentRowDeliveryDate;
      });

      // Calculate the sum of 'amount' in filteredDeliveries
      const accumulatedAmount = filteredDeliveries.reduce((sum, delivery) => {
        return sum + delivery.AmountDelivered; // Assuming the property name is 'amount'
      }, 0);

      // Add the new property 'AccumulatedAmount' to the current row
      return {
        ...row,
        AccumulatedAmount: accumulatedAmount
      };
    });
    setMatchedResult(resultWithTotalAmount);
  };

  const handleClose = () => setOpen(false);

  const CustomNoRowsOverlay = () => <GridOverlay />;

  return (
    <>
      {isLoading && (
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", zIndex: 100 }} />
      )}
      <Header />
      <Stack alignItems="center" justifyContent="center" direction="row" >
        <img src={logo} alt="Tipa" width={120} />
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', color: "#ffffff" }}>Orders table</Typography>
      </Stack>
      <Stack sx={{ width: "100%", paddingTop: "0px", paddingBottom: "20px", paddingRight: "20px", paddingLeft: "20px" }}>
        <Box sx={{ height: 820, width: "100%" }}>
          <Link to="/Home" >
            <Button sx={{ position: "absolute", top: 20, left: 50, color: "#000000", fontSize: 18 }}>
              GO Back
            </Button>
          </Link>
          <DataGrid
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "30px",
              padding: "34px 28px 22px 28px",
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            rows={tableData}
            columns={poDetailColumns}
            pageSize={25}
            onRowClick={handleOpen}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            slotProps={{
              row: {
                onMouseEnter: handleRowOver,
                onMouseLeave: handleRowLeaver
              }
            }}
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
          />
        </Box>
        <Button sx={{ fontSize: 12, color: "#000000", position: 'absolute', top: 90, right: 50 }} onClick={() => setFilterModel({ items: [] })}>
          Clear All Filters
        </Button>
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: 600,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: "10px"
        }} >
          <DataGrid
            autoHeight
            rows={[modalOrder]}
            columns={poDetailColumns}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            hideFooter={true}
          />
          <DataGrid
            autoHeight
            initialState={{
              sorting: {
                sortModel: [{ field: 'DeliveryDate', sort: 'asc' }],
              },
            }}
            rows={matchedResult}
            columns={deliveryColumns}
            pageSize={25}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            hideFooter={true}
          />
        </Box>
      </Modal>
    </>
  );
};

export default OrderDetailScreen;
