import React, { useEffect, useState } from 'react'
import { Button, IconButton, Paper, TableContainer, Modal, Fade, Backdrop, Typography, Box, TextField, Grid, FormControl, Switch, FormGroup, FormControlLabel } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Navbar/Navbar';

const Memberships = () => {
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
  const [membershipName, setMembershipName] = useState('')
  const [BasePrice, setBasePrice] = useState(0)
  const [DiscountOnProduct, setDiscountOnProduct] = useState(0)
  const [ExpressDeliveryCount, setExpressDeliveryCount] = useState(0)
  const [itemID, setItemID] = useState(0)


  //Model state manager
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMembershipName('')
    setBasePrice(0)
    setDiscountOnProduct(0)
    setExpressDeliveryCount(0)
    setItemID(0)
    JobFactoryInward()
  }

  //====

  const uri = process.env.REACT_APP_API_KEY
  const JobFactoryInward = () => {
    axios.get(uri + "/Membership/GetAllMembership", {
      crossOrigin: true,
      withCredentials: true
    })
      .then((data) => setInwards(data.data))
      .then(console.log(inwards))


  }
  //console.log(inwards)
  useEffect(() => {
    JobFactoryInward()
  }, []);

  const customerTableHead = [
    "SR",
    "Membership Name",
    "Rate",
    "Discount",
    "No of Express Delivery",
    "Action"
  ];



  return (
    <div>
      <Navbar />
      <div className="container">

        <h2 className='display-5'>Memberships</h2>
        <Button variant='contained' color='info' title='Add' onClick={handleOpen}>
          + Add New Membership
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
                Membership Form
              </Typography>
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Active" />
              </FormGroup>
              <TextField fullWidth variant='standard' value={membershipName} onChange={(e) => { setMembershipName(e.target.value) }} label='Membership Name' margin="normal" />

              <TextField fullWidth variant='standard' type='number' value={BasePrice} label='Rate' margin="normal" onChange={(e) => { setBasePrice(e.target.value) }} />
              <TextField fullWidth variant='standard' label='Discount' value={DiscountOnProduct} margin="normal" onChange={(e) => { setDiscountOnProduct(e.target.value) }} />
              <TextField fullWidth variant='standard' label='Express Deliveries' value={ExpressDeliveryCount} margin="normal" onChange={(e) => { setExpressDeliveryCount(e.target.value) }} />
              <Button fullWidth variant='contained' onClick={() => {
                if (itemID === 0) {
                  axios.post(uri + '/Membership/CrateNewMembership', {

                    "MembershipName": membershipName,
                    "BasePrice": BasePrice,
                    "DiscountOnProduct": DiscountOnProduct,
                    "ExpressDeliveryCount": ExpressDeliveryCount,
                    "Flag": true,
                  }, {
                    crossOrigin: true,
                    withCredentials: true
                  }).then((res) => { toast(res.data) })
                    .then(handleClose)
                    .then(toast("Insert Sucsess"))
                }
                else {
                  axios.put(uri + '/Membership/UpdateMembership', {
                    "MembershipID": itemID,
                    "MembershipName": membershipName,
                    "BasePrice": BasePrice,
                    "DiscountOnProduct": DiscountOnProduct,
                    "ExpressDeliveryCount": ExpressDeliveryCount,
                    "Flag": true,
                  }, {
                    crossOrigin: true,
                    withCredentials: true
                  }).then((res) => { toast(res.data) })
                    .then(handleClose)

                }

              }} color='inherit' margin="normal">
                Save</Button>

            </Box>
          </Fade>
        </Modal>
        <div className="row mt-5" >
          <ToastContainer />
          <div className="col-12">
            <TableContainer component={Paper}>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    {customerTableHead.map(x =>

                      <td>{x}</td>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {inwards.map((item, i) =>
                    <tr key={i}>
                      <td>
                        {i + 1}
                      </td>
                      <td>
                        {item.MembershipName}
                      </td>
                      <td>
                        {item.BasePrice}
                      </td>
                      <td>
                        {item.DiscountOnProduct}
                      </td>
                      <td>
                        {item.ExpressDeliveryCount}
                      </td>
                      {/* <td>
                      {item.Flag ? 'Active' : 'Blocked'}
                    </td> */}
                      <td>
                        <Button id={item.MembershipID} onClick={() => {


                        }

                        }>
                          <EditIcon onClick={(e) => {
                            setOpen(true)
                            setMembershipName(item.MembershipName)
                            setBasePrice(item.BasePrice)
                            setDiscountOnProduct(item.DiscountOnProduct)
                            setItemID(item.MembershipID)
                            setExpressDeliveryCount(item.ExpressDeliveryCount)

                          }} />

                        </Button>
                        <IconButton aria-label="delete" color="primary" onClick={() => {
                          //  console.log(customer.CustomerID + "'s icon clicked")
                          //setCustid(customer.CustomerID)
                          //DeleteData()

                        }}>

                        </IconButton>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </TableContainer>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Memberships