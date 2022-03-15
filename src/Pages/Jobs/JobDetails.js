import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Paper, Typography, Box, TextField, Grid, Autocomplete } from '@mui/material'
import { useSelector } from 'react-redux';
import axios from "axios";
import Navbar from '../Navbar/Navbar';
axios.defaults.withCredentials = true;

const uri = process.env.REACT_APP_API_KEY
const JobDetails = () => {
    const ActiveUser = useSelector(state => state.auth)

    // const [formData, setFormData] = useState([])

    let history = useNavigate();
    const { id } = useParams()
    //hooks
    const [jobid, setJobId] = useState('') //setting Job Number
    const [joblist, setJobList] = useState([]) //current job detail table
    const [customerList, setCustomerList] = useState([]) //customer list
    const [branchList, setBranchList] = useState([])
    const [users, setUsers] = useState([])
    const [ProductGroup, setProductGroup] = useState([])
    const [Products, setProdcts] = useState([])
    const [itemRate, setItemRate] = useState(0)
    const [itemQty, setItemQty] = useState(0)


    console.log(id)
    //get current date
    var curr = new Date()
    curr.setDate(curr.getDate())
    var date = curr.toISOString().substring(0, 10)

    //hooks for form data
    //For Current Job
    const [newCustomer, setCustomers] = useState('') //temp hook
    const [ClientID, setClientID] = useState(0)
    const [BranchID, setBranchID] = useState(0) //for insert
    const [BranchName, setBranchName] = useState('') //for display
    const [sid, setSid] = useState(0) //Employee ID
    const [currentUser, setCurrentUser] = useState('') //Employee name for display
    const [GroupCode, setGroupCode] = useState(0)
    const [ProductID, setProductID] = useState(0)

    const [sJobDate, setSJobDate] = useState(date) //Job Date 
    const [sRDate, setSRDate] = useState(date) //Recive Date
    const [remarks, setRemarks] = useState('') //Job Remarks




    const JobFactoryInward = async () => {
        // Customer API call
        await axios.get(uri + "/Customer/ActiveCustomers", {
            withCredentials: true, crossOrigin: true
        }).then((custList) => setCustomerList(custList.data))

        // Branch API call
        await axios.get(uri + "/Branch/GetAllBranch", {
            withCredentials: true, crossOrigin: true
        }).then((branch) => setBranchList(branch.data))
            .catch(error => {
                console.clear()
            })

        await axios.get(uri + "/Branch/GetBranchByID", {
            params: {
                brID: ActiveUser.BranchID
            }
        }, {
            withCredentials: true, crossOrigin: true
        }).then((branch) => setBranchName(branch.data[0].BranchName))
            .catch(error => {
                console.clear()
            })



        //Product Group API call
        await axios.get(uri + "/Product/ProductCatagory", {
            withCredentials: true, crossOrigin: true
        }).then((services) => setProductGroup(services.data))


        // JobDetail API call
        await axios.get(uri + "/Jobs/GetJobDetailsByID", {
            params: {
                "jobnumber": id
            },
            withCredentials: true, crossOrigin: true
        }).then((newData) => setJobList(newData.data))
            .then(console.log(joblist))

        // Employee API call
        await axios.get(uri + "/User/GetAllUsers", {
            withCredentials: true, crossOrigin: true
        }).then((newData) => setUsers(newData.data))

        if (GroupCode) {
            // Products API call
            await axios.get(uri + "/Product/GetProductByGroup", {
                params: {
                    GroupID: GroupCode
                }
            }, {
                withCredentials: true, crossOrigin: true
            }).then((products) => setProdcts(products.data))

        }


    }
    function GetJobDetailsByID(jobid) {
        if (jobid) {
            axios.get(uri + "/Jobs/GetJobByID", {
                params: {
                    JobID: id
                }
            }, {
                withCredentials: true, crossOrigin: true
            }).then((job) => {
                let jobdata = job.data[0]
                console.log(job.data.BranchName)
                setCustomers(jobdata.CustomerName)
                setBranchName(jobdata.BranchName)
                setCurrentUser(jobdata.UserName)
                setSJobDate(new Date(jobdata.JobDate).toISOString().split('T')[0])
                console.log(sJobDate)
                setIsReadOnly(false)
            })
        }

    }
    const [isReadOnly, setIsReadOnly] = useState(true)
    useEffect(() => {

        console.log(ClientID)
    }, [ClientID])

    useEffect(() => {
        GetJobDetailsByID(id)
        JobFactoryInward()
        //  console.log(joblist)
    }, [])
    //console.log('ClientID Client ID : ', ClientID)
    // const [value, setValue] = React.useState(null);
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (<>
        <Navbar />
        <div className='container mt-2'>
            <Paper margin={1}>

                <Box margin={2}>

                    <Grid container spacing={2}>
                        <Grid item sm={12} >

                            <Typography id="transition-modal-title" variant="h4" mt={2} component="h2">
                                Job Code • {id}
                            </Typography>
                        </Grid>
                        <Grid item sm={6} >
                            {/* <DesktopDatePicker label="Date desktop"
                                inputFormat="MM/dd/yyyy"
                                value={value}
                                onChange={handleChange} renderInput={(params) => <TextField {...params} />} /> */}
                            <Autocomplete
                                fullWidth
                                includeInputInList
                                autoSelect={true}
                                id="combo-box-demo"
                                options={customerList}
                                onChange={(e, v) => {
                                    if (v) {
                                        setClientID(v.CustomerID)
                                        setCustomers(v.CustomerName)
                                    }
                                }}
                                value={newCustomer}
                                //inputValue={console.log(customerList.find(x=> x.CustomerID = ClientID).CustomerName)}
                                getOptionLabel={x => x.CustomerName || newCustomer}

                                renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Select Client" margin='normal' />}
                            />
                        </Grid>
                        <Grid item sm={6} >
                            <label htmlFor="somename">Branch</label>
                            <select name="somename" id="" className='form-select' onChange={(e, v) => {
                                        setBranchID(e.target.value)
                                }}>
                                <option disabled selected> </option>
                                {branchList.map(v => 
                                    <option value={v.BranchID}>{v.BranchName}</option>
                                )}
                            </select>
                            {/* <Autocomplete
                                fullWidth
                                disablePortal
                                includeInputInList
                                autoSelect
                                id="combo-box-demo"
                                options={branchList}
                                defaultValue={branchList.find(v => v.BranchID)}
                                getOptionLabel={(x) => x.BranchName || ActiveUser.Branch}
                                value={ActiveUser.Branch}
                                onChange={(e, v) => {
                                    if (v) {
                                        console.log(v.BranchID)
                                        setBranchID(v.BranchID)
                                        setBranchName(v.BranchName)
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Select Branch" margin='normal' />}
                            /> */}
                        </Grid>

                        <Grid item sm={6} >
                            <TextField fullWidth variant='standard' type='date' defaultValue={sJobDate} onChange={(e) => {
                                setSJobDate(e.target.value)
                            }} label='Job Date' margin="normal" />
                        </Grid>
                        <Grid item sm={6} >
                            <TextField fullWidth variant='standard' type='date' onChange={(e) => {
                                setSRDate(e.target.value)
                            }} defaultValue={sRDate} label='Recive Date' margin="normal" />
                        </Grid>
                        <Grid item sm={6} >

                            <Autocomplete
                                fullWidth
                                disablePortal
                                autoComplete
                                includeInputInList
                                id="UserID"
                                options={users}
                                defaultValue={users.find(v => v.UserID)}
                                getOptionLabel={(option) => option.UserName || ActiveUser.User}
                                value={ActiveUser.User}
                                onChange={(events, selectedVals) => {
                                    //console.log(selectedVals.UserID)
                                    if (selectedVals) {
                                        setCurrentUser(selectedVals.UserName)
                                        setSid(selectedVals.UserID)

                                    }
                                }}
                                renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Select Employee" />}
                            />
                        </Grid>

                        <Grid item sm={6} >
                            <Autocomplete
                                fullWidth
                                disablePortal
                                id="combo-box-demo"
                                options={ProductGroup}
                                getOptionLabel={x => x.Description || ''}

                                onChange={(e, v) => {
                                    if (v) {
                                        setGroupCode(v.CateID)
                                        axios.get(uri + "/Product/GetProductByGroup", {
                                            params: {
                                                GroupID: v.CateID
                                            }
                                        }, {
                                            withCredentials: true, crossOrigin: true
                                        }).then((products) => setProdcts(products.data))
                                    }


                                }}
                                disableClearable={isReadOnly}
                                renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Product Group" />}
                            />
                        </Grid>


                    </Grid>
                    <Grid container spacing={2} >
                        <Grid item sm={6}>
                            <Autocomplete
                                fullWidth
                                disablePortal
                                id="combo-box-demo"
                                options={Products}
                                getOptionLabel={(x) => x.ProductName || ''}
                                onChange={(e, v) => {
                                    setProductID(v.ProductID)
                                    axios.get(uri + "/Product/GetProductByID", {
                                        params: {
                                            prodID: v.ProductID
                                        }
                                    }, {
                                        withCredentials: true, crossOrigin: true
                                    }).then((vs) => setItemRate(vs.data[0].ProductRate))
                                }}
                                renderInput={(params) => <TextField {...params} variant='standard' fullWidth label="Select Product" margin='normal' />}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField fullWidth value={itemRate} onChange={(e) => { setItemRate(e.target.value) }} type='number' label="Rate" margin='normal' variant='standard' />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField fullWidth value={itemQty} onChange={(e) => { setItemQty(e.target.value) }} type='number' label="Quantity" margin='normal' variant='standard' />
                        </Grid>

                    </Grid>
                    <Grid container>
                        <Grid item sm={10}>
                            <TextField fullWidth variant='standard' label='Remarks' value={remarks} onChange={(e) => { setRemarks(e.target.value) }} margin="normal" />
                        </Grid>
                        <Grid item m={3} sm={1}>
                            <Button fullWidth variant='contained' color='inherit' onClick={(e) => {
                                if (id) {

                                    // window.location.reload()
                                    console.log("Selected Product: ", ProductID, GroupCode, itemQty, itemRate, jobid)
                                    axios.post(uri + "/Jobs/JobDetails",
                                        {

                                            "JobNumber": id,
                                            "ProductID": ProductID,
                                            "ProductCategoryID": GroupCode,
                                            "Qty": itemQty,
                                            "Amonunt": itemRate

                                        },
                                        {
                                            crossOrigin: true, withCredentials: true
                                        }).then((res) => console.log(res))
                                        .then(() => {
                                            //setGroupCode(0)
                                            // setProductID(0)

                                            // setItemQty(0)
                                            // setItemRate(0)
                                            window.location.reload()
                                            JobFactoryInward()

                                        })
                                }
                                else {

                                    console.log("Blank Record")
                                    axios.post(uri + "/Jobs/CreateNewJob",
                                        {

                                            "CustomerID": ClientID,
                                            "JobDate": sRDate,
                                            "DeliveryType": remarks,
                                            "BranchID": BranchID,
                                            "UserID": sid,
                                            "Amonunt": itemRate

                                        },
                                        {
                                            crossOrigin: true, withCredentials: true
                                        }).then((res) => {
                                            history("/jobs/jobdetails/" + res.data)
                                            setJobId(res.data)
                                        })
                                }
                            }
                            }>Add</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Paper>


            <Paper>
                <table className='table table-bordered'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Sr No</th>
                            <th>Product Name</th>
                            <th>Product Group</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        {joblist.map((items, i) =>
                            <tr key={i}>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    {items.ProductName}
                                </td>
                                <td>
                                    {items.ProductGroup}
                                </td>
                                <td>
                                    {items.Qty}
                                </td>
                                <td>
                                    {items.Amonunt}
                                </td>
                                <td>
                                    {items.TotalAmont}
                                </td>
                                <td>
                                    <Button onClick={(e) => {
                                        window.alert('Not Implemented')
                                    }} >Edit</Button>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </Paper>
        </div>
    </>
    )
}

export default JobDetails
