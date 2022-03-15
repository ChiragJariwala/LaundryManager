import React, { useEffect, useState } from 'react'
import { Button, Paper, Typography, Grid } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
// import 'react-toastify/dist/ReactToastify.css';
const notify = () => toast(`Wow so easy!`);
const result = localStorage.getItem('_User')
const Inwards = () => {

  let history = useNavigate();
  const [inwards, setInwards] = useState([]);
  const uri = process.env.REACT_APP_API_KEY

  const JobFactoryInward = () => {
    axios.get(uri + "/Jobs/GetJobsFromFactory", {
      crossOrigin: true,
      withCredentials: true
    })
      .then((data) => setInwards(data.data))
       .catch((error)=>{
        var statusCode = error.response.status
        if(statusCode ==401){
          history('/login')
        }
      })
  }
  //console.log(inwards)
  useEffect(() => {
    JobFactoryInward()
  }, []);



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 3,
  };

  //Model state manager
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemList, setItemList] = useState([])

  // const customerTableHead = [
  //   "SR",
  //   "Job Number",
  //   "Job Date",
  //   "Customer Details",
  //   "No of Products",
  //   "Job Amount",
  //   "Job Priority",
  //   "Action"
  // ];

  const columns = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'JobNumber', headerName: 'Job No', width: 130 },
    {
      field: 'CustomerName',
      headerName: 'Customer Name',
      headerAlign: 'center',
      width: 400,
      rowAlign: 'center'
    },
    { field: 'JobDate', headerName: 'Job Date', type: 'date', width: 130 },
    { field: 'JobDate', headerName: 'Job Date', type: 'date', width: 130 },
    {
      field: 'ttlProducts',
      headerName: 'Total Products',
      width: 200,
      headerAlign: 'center',
      rowAlign: 'center'
    }, {
      field: 'ttlAmount',
      headerName: 'Total Job Amount',
      width: 200,
      headerAlign: 'center',
      rowAlign: 'center'
    }, {
      field: 'Status',
      headerName: 'Status',
      width: 200,
      headerAlign: 'center',
      rowAlign: 'center'
    },
  ];

  return (

    <div>
      <Navbar/>
      <Typography variant='h2'>Factory Inward </Typography>
      <ToastContainer />
      <Grid container spacing={50}>
        <Grid item>
          <Button onClick={(e) => {
            itemList.map((x) => {
              axios.post(uri + "/JobStatus",
                {
                  "Status": "Complete",
                  "JobNumber": x,
                  "JobLocation": "select"
                }, {
                crossOrigin: true,
                withCredentials: true
              }).then((res) => toast(res.data))
                JobFactoryInward()
            })

          }} >
            Send to Delivery
          </Button>
        </Grid>
      </Grid>
      <Grid container  mt={3}>
        <Grid item sm={12} md={6} lg={12}>
          <Paper>
            <div style={{ fontSize: '20px', height: 500, width: '100%', margin: '2px' }}>
              <DataGrid
                rows={inwards}
                components={{ Toolbar: GridToolbar }}
                columns={columns}
                filterMode={'client'}
                pageSize={15}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={item => {
                  setItemList(item)
                  console.log(item)
                }}
                onRowDoubleClick={item => history("/jobs/jobdetails/" + item.row.JobNumber)}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>

    </div >
  )
}

export default Inwards