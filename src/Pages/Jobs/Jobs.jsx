import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify'
import Navbar from '../Navbar/Navbar'
// import 'react-toastify/dist/ReactToastify.css'

const uri = process.env.REACT_APP_API_KEY


const Jobs = () => {
  const currentUser = useSelector(store => store.auth.User)
  let history = useNavigate()
  const [inwards, setInwards] = useState([])
  const [itemList, setItemList] = useState([])



  const JobFactoryInward = () => {


    axios.get(uri + "/Jobs/GetJobsFromBranch", {
      params: {

        "UserName": currentUser,
      }

    }, {
      crossOrigin: true,
      withCredentials: true
    })
      .then((data) => setInwards(data.data))
      .catch((error) => {
        var statusCode = error.response.status
        if (statusCode === 401) {
          history('/login')
        }
      })


  }

  useEffect(() => {
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
    <>
      <Navbar />
      <div className='container mt-2'>
        <ToastContainer />
        <p className='display-4'>Branch Inward </p>
        <div className="container" >
          <div className="row d-flex flex-row">
            <div className="col">
              <button className='btn btn-primary' onClick={() => {
                history('/jobs/jobdetails')
              }}>

                + Add New Job
              </button>
            </div>
            <div className="col">
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
                Send to Factory
              </Button>
            </div>
          </div>
        </div>

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
                  onRowDoubleClick={item => history("/jobs/jobdetails/" + item.row.JobNumber)}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>

      </div >
    </>

  )
}

export default Jobs