import React, { useState, useEffect } from 'react'
import { Select, MenuItem, Paper, Grid, Typography, TextField, FormControl, InputLabel, Button, Autocomplete } from '@mui/material'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';


const CustomerDetails = () => {
    const [topTags, setToptags] = useState([]); //Tags for customers
    const [customers, setCustomers] = useState([])
    const [Areas, setAreas] = useState([]) //Customer Area
    const [Custid, setCustid] = useState("");
    const [custName, setcustName] = useState("");
    const [custAddress, setcustAddress] = useState("");
    const [CustPhone, setCustPhone] = useState("");
    const [CustCatg, setCustCatg] = useState(0);
    const [CustArea, setCustArea] = useState(0)
    const [CustAreaName, setCustAreaName] = useState('')
    topTags.sort();
    let { id } = useParams()
    const [custData, setcustData] = useState({
        name: "",
        ContactNumber: "",
        Address: "",
        CustomerFlag: "",
    });


    //input box change event listner
    const handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        console.log(value);
        setcustData({ ...custData, [name]: value });
    };

    const onCustNameChange = (e) => {
        setcustName(e.target.value);
    };
    const onCustAddChange = (e) => {
        setcustAddress(e.target.value);
    };
    const onCustPhoneChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            if (CustPhone.length < 10 || e.target.value === '') {
                setCustPhone(e.target.value);
            }
            else {
                window.alert('Invalid Number!')
            }

        }
    };
    const onCustCatgChange = (e) => {
        setCustCatg(e.target.value);
    };
    const uri = process.env.REACT_APP_API_KEY
    const fetchapi = () => {
        axios.get(uri + "/Customer/ActiveCustomers", {
            withCredentials: true, crossOrigin: true
        })
            .then(response => setCustomers(response.data))
            .catch((e) => {
                setCustomers([customers])
            });
        axios.get(uri + "/Customer/GetCustomerTypes", {
            withCredentials: true,
            crossOrigin: true
        })
            .then((data) => data)
            .then((data) => setToptags(data.data))
            // .then(response => console.log(customers))
            .catch((e) => {
                console.log(e);
                //return e;

            });

        axios.get(uri + '/Customer/area', {
            crossOrigin: true,
            withCredentials: true
        }).then((res) => {
            setAreas(res.data)
        })
        return '';
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchapi();
        };
        getUsers();

    }, []);


    const saveCustData = () => {
        axios.post(uri + "/Customer/CreateCustomers", {
            "CustomerName": custName,
            "Phone": CustPhone,
            "Address": custAddress,
            "Area": CustArea,
            ActiveFlag: true
        }, {
            crossOrigin: true,
            withCredentials: true

        })
            .then(res => window.alert(res.data))
            // .then(clearStrings())
            .then((result) => {
                alert(result.data);
                fetchapi();
            }, (error) => {
                alert('Failed');
            })
        clearStrings()
        fetchapi()
    }

    const editData = () => {
        // console.log('Update Clicked! ' + Custid)
        axios.put(uri + "/Customer/UpdateCustomers", {
            CustomerID: Custid,
            CustomerName: custName,
            Phone: CustPhone,
            Address: custAddress,
            CustomerTag: CustCatg,
            Area: CustArea,
            ActiveFlag: true
        }, {
            withCredentials: true,
            crossOrigin: true,
        })
            .then(res => window.alert(res.data))
            // .then(clearStrings())
            .then((result) => {
                fetchapi()

            }, (error) => {
                alert('Failed');
            })
        clearStrings()
    }

    const DeleteData = (id) => {
        const url = uri + "/Customer/" + id;
        // console.log('url : ' +url )
        // console.log('Update Clicked! ' + Custid)
        if (window.confirm('Are you sure?')) {
            axios.delete(url, {
                crossOrigin: true,
                withCredentials: true
            })
                .then(res => window.alert(res.data))
                .then()
                .then((result) => {
                    alert(result);
                    fetchapi();
                }, (error) => {
                    alert('Failed' + error);
                })
        }

    }
    const clearStrings = () => {
        setCustid('')
        setcustName('')
        setcustAddress('')
        setCustPhone('')
        setCustCatg(0)
        setCustArea(0)
        setCustAreaName('')
    }
    return (
        <>
            <Navbar />
            <div className="container mt-5">

                <p className="display-4">
                    Retail Client Registration
                </p>
                <Grid container xl={12}>
                    <Grid item xl={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 600 }}>
                            <TextField fullWidth id="standard-basic" size='medium' label="Customer Name*"
                                value={custName} variant="standard" onChange={onCustNameChange} />
                        </FormControl>

                    </Grid>
                    <Grid item xl={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 600 }}>
                            <TextField fullWidth id="standard-basic" size='medium' label="Customer Address*"
                                value={custAddress} variant="standard" onChange={onCustAddChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xl={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 600 }}>
                            <TextField fullWidth id="standard-basic" value={CustPhone} size='medium' label="Customer Phone Number*" variant="standard" onChange={onCustPhoneChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xl={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 600 }}>
                            <InputLabel id="demo-simple-select-standard-label">Customer Tag</InputLabel>
                            <Select
                                id={CustCatg}
                                value={CustCatg}
                                onChange={onCustCatgChange}
                                labelId="demo-simple-select-standard-label"
                                variant='standard'
                                label="Customer Tag"
                            >
                                {topTags.map((tag) =>


                                    <MenuItem fullwidth value={tag.CusttomerTypeID} >{tag.CustomerTypeName}</MenuItem>

                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 600 }}>
                            <Autocomplete
                                fullWidth
                                disablePortal
                                includeInputInList
                                autoSelect
                                id="combo-box-demo"
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
                    </Grid>
                    <Grid item xl={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 600 }}>


                            {Custid != '' ? <Button p={2} mt={2} variant="outlined" size="large" id="save" onClick={editData}>Update</Button> : <Button p={2} mt={2} variant="outlined" size="large" id="update" onClick={saveCustData}>Create</Button>}
                        </FormControl>
                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default CustomerDetails
