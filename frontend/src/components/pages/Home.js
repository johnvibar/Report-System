import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { orderColumns } from "../../constants/column.constants";
import axios from "axios";
import { AuthToken } from "../../auth/AuthToken";
import Header from "../layout/Header";
import logo from '../../assets/images/logo.png';

const HomeScreen = () => {
  const history = useHistory();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDetailPage = (params) => {
    history.push(`/detail/${params.id}`);
  };

  const CustomNoRowsOverlay = () => {
    return <GridOverlay />;
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = AuthToken.get();
      if (!token) {
        history.push('/login');
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.data.map(item => ({
          ...item,
          TotalQtySo: item.TotalQtySo !== null ? `$${item.TotalQtySo}` : "",
        }));

        setTableData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [history]);

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
          <DataGrid
            columns={orderColumns}
            rows={tableData}
            pageSize={25}
            pagination={false}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            onRowClick={handleOpenDetailPage}
            sx={{ backgroundColor: "#ffffff", borderRadius: "30px", paddingTop: "34px", paddingBottom: "22px", paddingRight: "28px", paddingLeft: "28px" }}
          />
        </Box>
      </Stack>
    </>
  );
};

export default HomeScreen;
