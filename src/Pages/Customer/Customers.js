import React, { useState, useEffect } from 'react'
import { Typography, Button, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Navbar from '../../Pages/Navbar/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Customers = (props) => {
    const uri = process.env.REACT_APP_API_KEY
    const [customers, setCustomers] = useState([])
    const navigate = useNavigate();
    const refreshData = () => {
        axios.get(uri + "/Customer/ActiveCustomers", {
            withCredentials: true, crossOrigin: true
        })
            .then(response => setCustomers(response.data))
            .catch((e) => {
                setCustomers([customers])

            })
    }
    console.log(props.id)
    useEffect(() => {
        refreshData()

    }, [])

    return (
        <>
            <Navbar />
            <div className='container'>
                <p className='display-4 mt-2'>Retail Clients</p>

                <div className="row" >
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="card-body">
                                <table className='table table-hover table-sm'>
                                    <thead className='text-center'>
                                        <tr>
                                            <td>Customer ID</td>
                                            <td>Customer Name</td>
                                            <td>Customer Number</td>
                                            <td>Customer Address</td>
                                            <td>Customer Area</td>
                                            <td>Customer Tag</td>
                                            <td>Customer Active?</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {customers.map((customer, i) =>
                                            <>
                                                <tr id={customer.CustomerID}>

                                                    <td>
                                                        {customer.CustomerID}
                                                    </td>
                                                    <td>
                                                        {customer.CustomerName}
                                                    </td>
                                                    <td>
                                                        {customer.Phone}
                                                    </td>
                                                    <td>
                                                        {customer.Address}
                                                    </td><td>
                                                        {customer.LocalArea}
                                                    </td>
                                                    <td>
                                                        {customer.CustomerTypeName}
                                                    </td>
                                                    <td>
                                                        {customer.Flag ? '' : 'Active'}
                                                    </td>
                                                    <td>
                                                        <Button key={customer.CustomerID} id={customer.CustomerID} onClick={() => {
                                                            navigate('/Customers/CustomerDetails/' + customer.CustomerID)

                                                        }

                                                        }>
                                                            <EditIcon />

                                                        </Button>
                                                        <IconButton aria-label="delete" color="primary" onClick={() => {
                                                            let confirmDelete = window.confirm("Are you sure you want to delete the record?")
                                                            if (confirmDelete) {
                                                                axios.delete(uri + '/Customer/' + customer.CustomerID, {
                                                                    withCredentials: true,
                                                                    crossOrigin: true
                                                                }).then(refreshData())
                                                            }
                                                            refreshData()

                                                        }}>
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Customers
