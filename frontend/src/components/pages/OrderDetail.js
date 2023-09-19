import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Stack, Button, Typography, Modal, CircularProgress } from "@mui/material";
import { poDetailColumns, deliveryColumns } from "../../constants/column.constants";
import axios from "axios";
import { AuthToken } from "../../auth/AuthToken";
import Header from "../layout/Header";
import logo from '../../assets/images/logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OrderDetailScreen = (props) => {
  const history = useHistory();
  const [id] = useState(props.match.params.id);
  const [tableData, setTableData] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen: GridEventListener<'rowClick'> = (params) => {
    // setPoDetails(params.row.PODetails)
    console.log(`Item "${params.row.CustomerPO}" clicked`)
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = AuthToken.get();
      if (!token) {
        history.push('/login');
      } else {
        try {
          setIsLoading(true);
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const deliveryData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/delivery`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setTableData(response.data);
          setDeliveryData(deliveryData.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, []);

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
            {/* <ArrowBackIcon /> */}
            <Button sx={{ position: "absolute", top: 20, left: 50, color: "#000000", fontSize: 18 }}>
              GO Back
            </Button>
          </Link>
          <DataGrid
            sx={{ backgroundColor: "#ffffff", borderRadius: "30px", paddingTop: "34px", paddingBottom: "22px", paddingRight: "28px", paddingLeft: "28px" }}
            rows={tableData}
            columns={poDetailColumns}
            pageSize={25}
            onRowClick={handleOpen}
            {...tableData}
          />
        </Box>
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
          width: '50%',
          height: 600,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: "10px"
        }} >
          <DataGrid
            rows={deliveryData}
            columns={deliveryColumns}
            pageSize={25}
            {...deliveryData}
          />
        </Box>
      </Modal>


    </>
  );
};

export default OrderDetailScreen;