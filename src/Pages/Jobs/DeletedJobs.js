import React, { useEffect, useState } from 'react'
import { Button, Paper, Typography, Grid } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import Navbar from '../Navbar/Navbar'
// import 'react-toastify/dist/ReactToastify.css'

const notify = () => toast(`Wow so easy!`)

const uri = process.env.REACT_APP_API_KEY


const DeletedJobs = () => {
  let history = useNavigate()
  const [inwards, setInwards] = useState([])
  let localUser = ""
  const [itemList, setItemList] = useState([])



  const JobFactoryInward = () => {


    axios.get(uri + "/Jobs/GetDeletedJobs", {
      params: {

        "UserName": localUser,
      }

    }, {
      crossOrigin: true,
      withCredentials: true
    })
      .then((data) => setInwards(data.data))
      .catch((error) => {
        var statusCode = error.response.status
        if (statusCode == 401) {
          history('/login')
        }
      })


  }
  const setUser = () => {
    const result = localStorage.getItem('_User')
    if (result === undefined || result === null || result.length === 0) {
      localUser = 'Default'
    }
    else {
      localUser = JSON.parse(result).UserName
    }
    // toast(localUser)
  }
  //console.log(inwards)
  useEffect(() => {

    setUser()
    JobFactoryInward()
  }, []);


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
      <Navbar />
      <ToastContainer />
      <div className="container mt-5">
        <Typography variant='h2' className='text-danger'>Deleted Jobs</Typography>
        <Grid mt={3}>
          <Grid item>
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
                  onRowDoubleClick={item => history.push("/jobs/jobdetails/" + item.row.JobNumber)}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div >
  )
}

export default DeletedJobs