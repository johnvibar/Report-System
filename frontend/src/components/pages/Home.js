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

  const handleOpenDetailPage = (params) => {
    history.push(`/detail/${params.id}`);
  };

  const [isLoading, setIsLoading] = useState(false);

  const CustomNoRowsOverlay = () => {
    return <GridOverlay />;
  }

  useEffect(() => {
    async function fetchData() {
      const token = AuthToken.get();
      if (!token) {
        history.push('/login');
      } else {
        try {
          setIsLoading(true);
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Total Price column customize
          console.log(response.data);
          let data = []
          for (let i = 0; i < response.data.length; i++) {
            const totalQtySo = response.data[i].TotalQtySo !== null ? "$" + response.data[i].TotalQtySo : "";
            data.push({
              ...response.data[i],
              "TotalQtySo": totalQtySo
            })
          }

          setTableData(data);

        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <DataGrid
            columns={orderColumns}
            rows={tableData}
            pageSize={25}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            onRowClick={handleOpenDetailPage}
            {...tableData}
            sx={{ backgroundColor: "#ffffff", borderRadius: "30px", paddingTop: "34px", paddingBottom: "22px", paddingRight: "28px", paddingLeft: "28px" }}
          />
        </Box>
      </Stack>
    </>
  );
};

export default HomeScreen;
