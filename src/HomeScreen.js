import React, { useState, useEffect } from 'react'
import { DataGrid, GridEventListener } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { field: 'CustomerPO', headerName: 'PO', width: 300 },
    { field: 'CustomerPODate', headerName: 'Customer PO Date', width: 200 },
    { field: 'TotalQtySo', headerName: 'Total QtySo', width: 200 }
]

const poDetailColumns = [
    { field: 'ConverterPONumber', headerName: 'PO Number', width: 100 },
    { field: 'CustomerPODate', headerName: 'Customer PO Date', width: 100 },
    { field: 'SOStatus', headerName: 'SO Status', width: 200 },
    { field: 'QtySo', headerName: 'QTY SO', width: 200 },
    { field: 'Price', headerName: 'Price', width: 200 },
    { field: 'CustomerPartNumber', headerName: 'Customer Part Number', width: 200 },
    { field: 'CustomerPNDescription', headerName: 'Customer P.N Desc', width: 200 },
    { field: 'OCDate', headerName: 'OC Delivery Date', width: 200 },
    { field: 'AmountDelivered', headerName: 'Amount Delivered', width: 200 },
    { field: 'BalanceToDeliver', headerName: 'Balance to Deliver', width: 200 },
    { field: 'UpdatedDeliveryDate', headerName: 'Updated Delivery Date', width: 200 }
]

const HomeScreen = () => {

    const [tableData, setTableData] = useState([])
    const [poDetails, setPoDetails] = useState([])

    const airtable_api_key = 'patsRqdsRWiw3Uwee.8e2ab165376c5a06db88f02ed66b08e7d2ff20c1ce6080495c5f1ef958fd65f4';

    const [open, setOpen] = React.useState(false);
    const handleOpen: GridEventListener<'rowClick'> = (params) => {
        setPoDetails(params.row.PODetails)
        console.log(`Item "${params.row.CustomerPO}" clicked`)
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    // Accepts the array and key
    const groupBy = (array, key) => {
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

    useEffect(() => {
        fetch("https://api.airtable.com/v0/appdvY1q8ohEI0O9k/tblb2Xa0c5KA839Vj",
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${airtable_api_key}`
                },
            })
            .then((data) => data.json())
            .then((jsonData) => jsonData.records)
            .then((records) => {
                const items = records.map(record => {
                    const row = record.fields;
                    return {...row, id: record.id, RowCreatedTime: record.createdTime}
                })

                // Group by color as key to the person array
                const itemsGrouped = groupBy(items, 'CustomerPO')
                const itemsDetailed = Object.entries(itemsGrouped).map(([key, value]) => {
                    const sumOfQtySo = value.reduce((sum, row) => {
                        return sum + row.QtySo;
                    }, 0);

                    return {id: key, CustomerPO: key, CustomerPODate: value[0]['CustomerPODate'], TotalQtySo: sumOfQtySo, PODetails: value}
                })

                console.log(itemsDetailed)
                setTableData(itemsDetailed)
            })

    }, [])

    console.log(tableData)

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Box sx={{ height: 800, width: '100%' }}>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    pageSize={25}
                    onRowClick={handleOpen} {...tableData}
                />
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DataGrid
                        rows={poDetails}
                        columns={poDetailColumns}
                        pageSize={25}
                    />
                </Box>
            </Modal>
        </Stack>
    )
}

export default HomeScreen