import React, { useEffect, useState } from 'react'
import { Button, IconButton, Paper, TableContainer, Modal, Fade, Backdrop, Typography, Box, TextField, Grid, FormControl, Autocomplete, Switch, FormGroup, FormControlLabel, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material'
import { DataGrid, GridToolbar, GridToolbarDensitySelector } from '@mui/x-data-grid';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/Navbar';
const notify = () => toast(`Wow so easy!`);

const MakeDelivery = () => {

  let history = useNavigate();
  const [MakeDelivery, setMakeDelivery] = useState([]);
  const uri = process.env.REACT_APP_API_KEY
  let localUser = ""
  const setUser = () => {
    const result = localStorage.getItem('_User')
    if (result === undefined || result === null || result.length === 0) {
      localUser = 'Default'
    }
    else {
      localUser = JSON.parse(result).UserName
    }
    toast(localUser)
  }
  const JobFactoryInward = () => {

    axios.get(uri + "/Jobs/GetJobsDelivery",
      {
        params: {

          "UserName": localUser,
        },

        crossOrigin: true,
        withCredentials: true
      })
      .then((data) => setMakeDelivery(data.data))
       .catch((error)=>{
        var statusCode = error.response.status
        if(statusCode === 401){
          history.push('/login')
        }
        if(statusCode === 403){
          toast.danger("You need Admin permition to view this content")
        }
      })



  }
  //console.log(MakeDelivery)
  useEffect(() => {
    setUser()
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
  const updateStatus = (id) => {

  }

  return (

    <div>
      <Navbar/>
      <Typography variant='h2'>Make Delivery</Typography>

      <Grid container spacing={50}>


        <ToastContainer />


        <Grid item>
          <Button onClick={(e) => {
            itemList.map((x) => {
              axios.post(uri + "/JobStatus",
                {
                  "Status": "Incomplete",
                  "JobNumber": x,
                  "JobLocation": "Factory"
                }, {
                crossOrigin: true,
                withCredentials: true
              }).then((res) => toast(res.data))
            })

          }} >
            Generate Bill
          </Button>
        </Grid>
      </Grid>
      <Grid  mt={3}>
        <Grid item>



          <Paper>
            <div style={{ fontSize: '20px', height: 500, width: '100%', margin: '2px' }}>
              <DataGrid
                rows={MakeDelivery}
                components={{ Toolbar: GridToolbar }}
                columns={columns}
                filterMode={'client'}
                pageSize={15}
                rowsPerPageOptions={[10]}
                //checkboxSelection
                onSelectionModelChange={item => {
                  setItemList(item)
                  console.log(item)
                }}
                 onRowDoubleClick={item => history("/Delivery/Details/" + item.row.JobNumber)}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>

    </div >
  )
}

export default MakeDelivery