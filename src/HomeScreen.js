import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
    { field: 'CustomerPO', headerName: 'PO', width: 300 },
    { field: 'CustomerPODate', headerName: 'Customer PO Date', width: 200 },
    { field: 'QtySo', headerName: 'Total Price', width: 200 }
]

const HomeScreen = () => {

    const [tableData, setTableData] = useState([])
    const airtable_api_key = 'patsRqdsRWiw3Uwee.8e2ab165376c5a06db88f02ed66b08e7d2ff20c1ce6080495c5f1ef958fd65f4';
    const oauth_client_id = '6195b9e4-3576-4a34-8268-ce2ee4cf9222';
    const oauth_client_secret = 'fd45e0554b5a9b726085d685f6944c02a38839a864d68bf4941bc61ae7781ed4';

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

                console.log(items)
                setTableData(items)
            })

    }, [])

    console.log(tableData)

    return (
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={10}
            />
        </div>
    )
}

export default HomeScreen