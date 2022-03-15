import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { Button, Paper,  Typography, Box, TextField, Grid } from '@mui/material'
import axios from "axios";
import Navbar from '../Navbar/Navbar'


axios.defaults.withCredentials = true;

const uri = process.env.REACT_APP_API_KEY
const result = localStorage.getItem('_User')
const DeliveryDetails = () => {

    let history = useNavigate();
    const { id } = useParams()
    //  window.alert(id)
    //hooks
    const [jobid, setJobId] = useState('') //setting Job Number
    const [master, setMaster] = useState([]) //Currnet job table  
    const [jobdate, setJobDate] = useState('')//Job Date
    const [joblist, setJobList] = useState([]) //current job detail table
    const [customerList, setCustomerList] = useState([]) //customer list
    const [branchList, setBranchList] = useState([])
    const [users, setUsers] = useState([])
    const [ProductGroup, setProductGroup] = useState([])
    const [Products, setProdcts] = useState([])

    const [itemRate, setItemRate] = useState(0)
    const [itemQty, setItemQty] = useState(0)


    //console.log(id)
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
    const [currentUser, setCurrentUser] = useState([]) //Employee name for display
    const [GroupCode, setGroupCode] = useState(0)
    const [ProductID, setProductID] = useState(0)

    const [sJobDate, setSJobDate] = useState(date) //Job Date 
    const [sRDate, setSRDate] = useState(date) //Recive Date
    const [remarks, setRemarks] = useState('') //Job Remarks


    let databse = null

    const JobFactoryInward = async () => {
        // Customer API call
        await axios.get(uri + "/Customer/ActiveCustomers", {
            withCredentials: true, crossOrigin: true
        }).then((custList) => setCustomerList(custList.data))

        // Branch API call
        await axios.get(uri + "/Branch/GetAllBranch", {
            withCredentials: true, crossOrigin: true
        }).then((branch) => setBranchList(branch.data))

        //Product Group API call
        await axios.get(uri + "/Product/ProductCatagory", {
            withCredentials: true, crossOrigin: true
        }).then((services) => setProductGroup(services.data))

        // JobDetail API call
        await axios.get(uri + "/Jobs/GetJobDetails", {
            params: {
                "jobnumber": id
            },
            withCredentials: true, crossOrigin: true
        }).then((newData) => setJobList(newData.data))
            // .then(console.log(joblist))

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
                //console.log(job.data.BranchName)
                setCustomers(job.data[0].CustomerName)
                setBranchName(job.data[0].BranchName)
                setCurrentUser(job.data)
                console.log(currentUser)
                //console.log(job.data)
                setSJobDate(new Date(jobdata.JobDate).toISOString().split('T')[0])
                //console.log(sJobDate)
            })
        }

    }
    useEffect(() => {

        //console.log(ClientID)
    }, [ClientID])

    useEffect(() => {
        if (id != null) {
            setJobId(id)
            setSid(JSON.parse(result).UserID)
            setCurrentUser(JSON.parse(result).UserName)
        }
        GetJobDetailsByID(id)
        JobFactoryInward()
        //  console.log(joblist)
    }, [])
    //console.log('ClientID Client ID : ', ClientID)
    const [value, setValue] = React.useState(null);
    return (
        <div>
            <Navbar />
        {console.log(currentUser)}
        
            <Paper margin={1}>

                <Box margin={2}>

                    <Grid container spacing={2}>
                        <Grid item sm={12} >
                            {/* {currentUser.map((item) => {
                                console.log("item" , item)
                            })} */}
                            <Typography id="transition-modal-title" color={'blueviolet'} variant="h4" mt={2} component="h2">
                                Job Number • {id}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant='h6' color={'ButtonText'}>Customer :</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h6' color={'ButtonText'}>{newCustomer}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} >
                        <Grid item >
                            <Typography variant='h6' color={'ButtonText'}>Customer Address:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h6'  color={'ButtonText'}>{(curremtUser)=>curremtUser[0].BranchName}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sm={10}>
                            <TextField fullWidth variant='standard' label='Remarks' value={remarks} onChange={(e) => { setRemarks(e.target.value) }} margin="normal" />
                        </Grid>

                    </Grid>

                </Box>
            </Paper>


            <Paper margin={2}>
                <table>
                    <thead>
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
            <Paper>
                <table className='mt-3 text-danger'>
                    <thead>
                        <tr>
                            <td>
                                Total Products
                            </td>
                            <td>
                                0
                            </td>
                        </tr>
                    
                        <tr>

                            <td>
                                Total Amount
                            </td>
                            <td>
                                0
                            </td>
                        </tr>
                        </thead>

                </table>
            </Paper>
        </div>
    )
}

export default DeliveryDetails
