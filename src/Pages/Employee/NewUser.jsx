import { Card, CardHeader, Checkbox, CardContent, FormControlLabel, TextField, Typography, InputLabel, Select, MenuItem, CardActions, Button, FormControl, Autocomplete } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';

import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
const uri = process.env.REACT_APP_API_KEY

const NewUser = () => {

  const Physical_Role = [
    "BRANCH SUPERVISER", "MGMT", "PACKING", "PICK UP"
  ]
  const Applocation_Role = [
    "Admin", "Employee"
  ]
  const clearData = {
    UserName: '',
    Name: '',
    Address: '',
    Area: '',
    City: '',
    ContactNumber: '',
    PhysicalRole: '',
    UserPassword: '',
    UserType: '',
    BranchID: 0,
    Flag: true

  }
  const [formData, setFormData] = useState(clearData)
  const [loginAccess, setLoginAccess] = useState(true)
  const [Areas, setAreas] = useState([]) //Customer Area
  const [branchList, setBranchList] = useState([])
  const [CustArea, setCustArea] = useState(0)
  const [CustAreaName, setCustAreaName] = useState('')

  const fetchData = async () => {
    await axios.get(process.env.REACT_APP_API_KEY + "/Branch/GetAllBranch", {
      withCredentials: true, crossDomain: true
    })
      .then((res) => {
        res.data != null && setBranchList(res.data)
      })
      .catch(err => {
        if (err.response.status === 401) {
          localStorage.clear()
        }
      });

    axios.get(uri + '/Customer/area', {
      crossOrigin: true,
      withCredentials: true
    }).then((res) => {
      setAreas(res.data)
    })
  }


  const SaveUserInfo = () => {
    axios.post(uri + '/User/CreateNewUser',
      {
        UserName: formData.UserName,
        Name: formData.Name,
        Address: formData.Address,
        Area: formData.Address,
        City: formData.City,
        ContactNumber: formData.ContactNumber,
        PhysicalRole: formData.PhysicalRole,
        UserPassword: formData.UserPassword,
        UserType: formData.UserType,
        BranchID: formData.BranchID,
        Flag: true
      },
      {
        withCredentials: true,
        crosOrigin: true
      })
    console.log(formData)

  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <div className='container'>
        <Typography variant='h2' >Create New User </Typography>
        <div className='card'>
          <div className='card-header'>
            <h2> New Employee Registration Form</h2>
          </div>
          <div className='card-body row'>
            <div className='col-6'>

              <TextField variant='standard'
                onChange={(event) => setFormData({ ...formData, Name: event.target.value })}
                fullWidth placeholder='Employee Name' label='Employee Name' margin='dense' />

              <TextField variant='standard' fullWidth placeholder='Employee Address' label='Employee Address' margin='dense'
                onChange={(event) => setFormData({ ...formData, Address: event.target.value })}
              />

              <FormControl variant="standard" sx={{ minWidth: 600 }}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  includeInputInList
                  autoSelect
                  id="CustomerArea"
                  options={Areas}
                  defaultValue={Areas.find(v => v.CustArea)}
                  getOptionLabel={(x) => x.LocalArea || CustAreaName}

                  value={CustArea}
                  onChange={(e, v) => {
                    if (v) {
                      setCustArea(v.id)
                      setCustAreaName(v.LocalArea)

                    }
                  }}
                  renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Select Customer Area" margin='normal' />}
                />
              </FormControl>

              <TextField variant='standard' fullWidth placeholder='City' label='City' margin='dense'
                onChange={(event) => setFormData({ ...formData, City: event.target.value })}
              />

              <TextField variant='standard' type={'number'} fullWidth placeholder='Contact Number' label='Contact Number' margin='dense'
                onChange={(event) => setFormData({ ...formData, ContactNumber: event.target.value })} />

              <Autocomplete
                fullWidth
                disablePortal
                includeInputInList
                autoSelect
                id="BranchID"
                options={branchList}
                defaultValue={branchList.find(v => v.BranchID)}
                getOptionLabel={(x) => x.BranchName || formData.BranchID}
                value={''}

                onChange={(e, v) => {
                  if (v) {
                    setFormData({ ...formData, BranchID: v.BranchID })
                  }
                }}
                renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Select Branch" margin='normal' />}
              />

              <Autocomplete
                fullWidth
                disablePortal
                includeInputInList
                autoSelect
                id="PhycalRole"
                options={Physical_Role}
                //getOptionLabel={(x) => x.BranchName || formData.BranchID}
                value={formData.PhysicalRole}

                onChange={(e, v) => {
                  if (v) {
                    setFormData({ ...formData, PhysicalRole: v })
                  }
                }}
                renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Type" margin='normal' />}
              />

              {/* <TextField variant='standard' type={'number'} fullWidth placeholder='Phycicel Role'
                onChange={(event) => setFormData({ ...formData, PhysicalRole: event.target.value })}
                label='Phycicel Role' margin='dense' /> */}
            </div>
            <div className='col-6'>
              <div className='me-5'>
                <Card>
                  <CardHeader title="Login Details">


                  </CardHeader>
                  <CardContent>
                    <FormControlLabel
                      label="Give Access to Software"
                      control={
                        <Checkbox color='info' label="some levl" onChange={(e) => setLoginAccess(!e.target.checked)} />} />
                    <TextField variant='standard' fullWidth label={'Username'} margin='normal' disabled={loginAccess}
                      onChange={(e) => {
                        setFormData({ ...formData, UserName: e.target.value })
                      }}
                    />
                    <TextField variant='standard' type={'password'} fullWidth label={'Password'} disabled={loginAccess} margin='normal'
                      onChange={(e) => {
                        setFormData({ ...formData, UserPassword: e.target.value })
                      }}
                    />
                    <TextField variant='standard' type={'password'} fullWidth label={'Recovery Code'} disabled={loginAccess} margin='normal' onChange={(e) => {
                      if (e.target.value === formData.UserPassword) {
                        window.alert("password Match")
                        //setFormData({ ...formData, UserName: e.target.value })
                      }

                    }} />
                    <Autocomplete
                      fullWidth
                      disablePortal
                      includeInputInList
                      autoSelect
                      id="AppRole"
                      options={Applocation_Role}
                      //getOptionLabel={(x) => x.BranchName || formData.BranchID}
                      value={formData.UserType}

                      onChange={(e, v) => {
                        if (v) {
                          setFormData({ ...formData, UserType: v })
                        }
                      }}
                      renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Type" margin='normal' />}
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant='contained' startIcon={<SaveIcon />} onClick={SaveUserInfo} >Save</Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default NewUser
