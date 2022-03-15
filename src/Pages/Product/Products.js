import React, { useState, useEffect } from "react";
import { Button, IconButton, Paper, TableContainer, Modal, Fade, Backdrop, Typography, Box, TextField, Grid, FormControl, Autocomplete, Switch, FormGroup, FormControlLabel, InputLabel, Select, MenuItem } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { setQuarter } from "date-fns/esm";
import Navbar from "../Navbar/Navbar";
const uri = process.env.REACT_APP_API_KEY


const Products = () => {
    const [products, setProducts] = useState([])
    const [productCategory, setProductCategory] = useState([])
    const [itemCate, SetItemCate] = useState(0)
    const [Err,setErr]=useState(false)
    const [txterr,setTxterr]=useState(false)
    const GetProducts = () => {
        axios.get(uri + "/Product/ProductCatagory", {
            withCredentials: true,
            crossOrigin: true
        })
            .then((neData) => setProductCategory(neData.data))
        axios.get(uri + "/Product/GetAllProduct", {
            withCredentials: true,
            crossOrigin: true
        })
            .then((data) => setProducts(data.data))

    }

    const [newProduct, setProductName] = useState('')
    const [newCateg, setProductCatg] = useState('')
    const [newRate, setProductRate] = useState(0)
    //console.log(inwards)
    useEffect(() => {
        GetProducts()
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

    return (
        <>
            <Navbar/>
            <div className="container">

            <Typography variant="h2" color='MenuText' >Products</Typography>
            <div className="mb-3">

                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant='contained' color='info' title='Add' onClick={handleOpen}>
                            + Add New Product
                        </Button>


                    </Grid>
                </Grid>
            </div>
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
                            New Product
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item sm={12} >
                                <TextField label='Product Name' error={txterr} onBlur={(e)=>{
                                    if(e.target.value.length ===0){
                                        setTxterr(true)

                                    }
                                    else{
                                        setTxterr(false)
                                    }
                                }} value={newProduct} onChange={(e) => { setProductName((e.target.value).toUpperCase()) }} variant='standard' fullWidth margin="normal" />

                            </Grid>
                            <Grid item sm={12} >
                                <Autocomplete

                                    disablePortal
                                    id="combo-box-demo"
                                    onChange={(e, v) => {
                                        console.log(v)
                                        setProductCatg(v.CateID)
                                    }}
                                    onBlur={
                                        (e)=>{
                                            if(e.target.value ===''){
                                                setErr(true)
                                            }
                                            else{
                                                setErr(false)
                                            }
                                        }
                                    }
                                    options={productCategory}
                                    getOptionLabel={x => x.Description || newCateg}
                                    renderInput={(params) => <TextField error={Err} {...params} variant='standard' label="Product Category" margin='normal' />}

                                />
                            </Grid>
                            <Grid item sm={12} >
                                <TextField type='number' value={newRate} onChange={(e) => {
                                    const re = /^[0-9\b]+$/;
                                    if ((e.target.value === '' || re.test(e.target.value)) && e.target.value >= 0) {
                                        setProductRate(e.target.value)
                                    }
                                }} label='Rate' variant='standard' fullWidth margin="normal" />
                            </Grid>
                        </Grid>
                        <Button fullWidth variant='contained' color='inherit' margin="normal"
                            onClick={() => {
                                axios.post(uri + "/Product/CrateNewProduct",
                                    {
                                        "ProductName": newProduct,
                                        "ProductCategoryID": newCateg,
                                        "ProductRate": newRate,

                                    }, {
                                    crossOrigin: true, withCredentials: true
                                }).then((res) => {
                                    window.alert(res.data)
                                    handleClose(true)
                                    GetProducts()

                                })

                            }}

                        >Add</Button>

                    </Box>
                </Fade>
            </Modal>
            <div className="mt-3">

            </div>
            <Paper>
                <table className="table table-light">
                    <thead>
                        <tr>
                            <td>Product ID</td>
                            <td>Product Name</td>
                            <td>Product Catagoory</td>
                            <td>Product Price</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, i) =>
                            <tr key={i}>

                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    {item.ProductName}
                                </td>
                                <td>
                                    {item.Description}
                                </td>
                                <td>
                                    {item.ProductRate}
                                </td>
                                <td>
                                    <Button id={item.itemID} onClick={() => {
                                    }

                                    }>
                                        <EditIcon />

                                    </Button>
                                    <IconButton aria-label="delete" color="primary" onClick={() => {
                                        console.log(item.itemID + "'s icon clicked")
                                        //setCustid(item.itemID)
                                        //DeleteData()
                                    }}>

                                    </IconButton>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Paper>
            </div>

        </>
    );
};

export default Products;
