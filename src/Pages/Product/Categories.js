import React, { useState, useEffect } from "react";
import { Button, IconButton, Paper, TableContainer, Modal, Fade, Backdrop, Typography, Box, TextField, Grid, FormControl, Autocomplete, Switch, FormGroup, FormControlLabel, Alert } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import Navbar from '../Navbar/Navbar'
const uri = process.env.REACT_APP_API_KEY
const Categories = () => {


    const [categories, setCategories] = useState([])
    const [newCat, setNewCat] = useState('')
    const GetProducts = () => {
        axios.get(uri + "/Product/ProductCatagory", {
            crossOrigin: true,
            withCredentials: true
        })
            .then((data) => setCategories(data.data))
    }

    const newCategory = (e) => {
        axios.post(uri + "/Product/ProductCatagory",
            {
                "description": newCat,
            }, {

            crossOrigin: true,
            withCredentials: true
        })
            .then(res => console.log(res.data))
        GetProducts()
        setNewCat('')
        handleClose()
    }



    //console.log(inwards)
    useEffect(() => {
        GetProducts()

    }, [categories]);

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
        <div>
                <Navbar />
            <div className="container">
                <Typography variant="h2" color='MenuText' >Product Category</Typography>
                <div className="mb-3">

                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant='contained' color='info' title='Add' onClick={handleOpen}>
                                + Add New Product Group
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
                                Category •
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item sm={12} >
                                    <TextField label='Category Name' value={newCat} variant='standard' fullWidth margin="normal" onChange={(e) => {
                                        setNewCat((e.target.value).toUpperCase())
                                    }} />

                                </Grid>

                            </Grid>
                            <Button fullWidth variant='contained' color='inherit' margin="normal" onClick={newCategory}>Add</Button>

                        </Box>
                    </Fade>
                </Modal>
                <div className="mt-3">

                </div>


                <Paper>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>Product Group ID</td>
                                <td>Product Group Name</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((item, i) =>
                                <tr key={item.CateID}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        {item.Description}
                                    </td>
                                    <td>
                                        <Button id={item.CateID} onClick={(e) => {
                                            e.preventDefault()
                                            Alert('Action Clicked!')

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

        </div>
    );
};

export default Categories;
