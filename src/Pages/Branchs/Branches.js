import React, { useEffect, useState } from 'react'
import { Button, IconButton, Paper, TableContainer, Modal, Fade, Backdrop, Typography, Box, TextField, Switch, FormGroup, FormControlLabel, Autocomplete } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

import axios from "axios";
import { toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';

axios.defaults.withCredentials = true;

const uri = process.env.REACT_APP_API_KEY
const Branches = () => {
  const history = useNavigate()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 3,
  };
  const [inwards, setInwards] = useState([]);

  const [branchName, setBranchName] = useState([])
  const [branchType, setBranchType] = useState([])
  const [branchAddress, setBranchAddress] = useState([])

  //Model state manager
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //====

  axios.defaults.withCredentials = true;

  const JobFactoryInward = async () => {
    let response = null
    try {
      response = await axios.get(process.env.REACT_APP_API_KEY + "/Branch/GetAllBranch", {
        withCredentials: true, crossDomain: true
      })
        .then((res) => {
          res.data != null && setInwards(res.data)
        })
        .catch(err => {
          if (err.response.status === 401) {
            localStorage.clear()
            history('/')
          }
        });

      setInwards(response.data)
    }
    catch (error) {
      console.log('error', error)
    }



  }

  useEffect(() => {
    JobFactoryInward()
  }, []);

  const customerTableHead = [
    "SR",
    "Branch Name",
    "Branch Type",
    "Branch Address",
    "Action"
  ];

  const BranchType = ['Factory', 'Sub Branch']


  return (
    <div>
      <Navbar />
      <div className="container">


        <Typography variant='h2'>Branch Managment</Typography>
        <Button variant='contained' color='info' title='Add' onClick={handleOpen}>
          + Add New Branch
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                New Branch Form
              </Typography>
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Active" />
              </FormGroup>
              <TextField fullWidth variant='standard' onChange={(e, v) => {
                setBranchName(e.target.value)
              }} label='Branch Name' margin="normal" />
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={BranchType}
                onChange={(e, v) => {
                  setBranchType(v)

                }}
                renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Branch Type" margin='normal' />}
              />
              <TextField fullWidth variant='standard' onChange={(e, v) => { setBranchAddress(e.target.value) }} label='Address' margin="normal" />
              <Button fullWidth variant='contained' color='inherit' onClick={(e) => {
                axios.post(uri + "/Branch/CrateNewBranch",
                  {

                    "BranchName": branchName,
                    "BranchType": branchType,
                    "BranchAddress": branchAddress,

                  }, {
                  crossOrigin: true, withCredentials: true
                }).then((res) => {
                  window.alert(res.data)
                  handleClose(true)
                  JobFactoryInward()
                })
              }} margin="normal">Add</Button>

            </Box>
          </Fade>
        </Modal>
        <div className="row mt-5" >
          <div className="col-12">

            <table className='table table-bordered table-light shadow'>
              <thead>
                <tr>
                  {customerTableHead.map(x =>

                    <td>{x}</td>
                  )}
                </tr>
              </thead>
              <tbody>
                {inwards.map((customer, i) =>
                  <tr key={i}>
                    <td>
                      {i + 1}
                    </td>
                    <td>
                      {customer.BranchName}
                    </td>
                    <td>
                      {customer.BranchType}
                    </td>
                    <td>
                      {customer.BranchAddress}
                    </td>
                    {/* <td>
                      {customer.ActivationDate}
                    </td> */}

                    <td>
                      <Button id={customer.CustomerID} onClick={() => {


                      }

                      }>
                        <EditIcon />

                      </Button>
                      <IconButton aria-label="delete" color="primary" onClick={() => {
                        console.log(customer.BranchID + "'s icon clicked")
                        axios.delete(uri + '/Branch/DeleteBranch', {
                          params: {
                            "id": customer.BranchID
                          },
                          withCredentials: true,
                          crossOrigin: true
                        }).then(res => res.data)
                          .then(res => toast(res.data))
                          .then(JobFactoryInward())
                          .catch(error => {
                            window.alert(error.data)
                          })
                        //DeleteData()
                      }}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Branches