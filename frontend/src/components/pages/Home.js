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
          TotalQtySo: item.TotalQtySo !== null ?
            parseFloat(item.TotalQtySo).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) : "",
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
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            onRowClick={handleOpenDetailPage}
            slotProps={{
              row: {
                onMouseEnter: handleRowOver,
                onMouseLeave: handleRowLeaver
              }
            }}
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "30px",
              padding: "34px 28px 22px 28px",
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
          />
        </Box>
      </Stack>
    </>
  );
};

export default HomeScreen;
