import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'

const DeletedCustomer = () => {
    const uri = process.env.REACT_APP_API_KEY
    const [customers, setCustomers] = useState([])


    useEffect(() => {

        axios.get(uri + "/Customer/DeletedCustomers", {
            withCredentials: true, crossOrigin: true
        })
            .then(response => setCustomers(response.data))
            .catch((e) => {
                setCustomers([customers])
            })
    }, [])

    return (

        <>
            <Navbar />
            <div className="container mt-5">
                <div className="card">
                    <div className="card-title">
                        <p className='display-6'>Deleted Customers</p>
                    </div>
                    <div className="card-body">
                        <table className='table table-active'>
                            <thead className='thead table-danger'>
                                <tr>
                                    <td>Customer ID</td>
                                    <td>Customer Name</td>
                                    <td>Customer Number</td>
                                    <td>Customer Address</td>
                                    <td>Customer Area</td>
                                    <td>Customer Tag</td>
                                    <td>Customer Active?</td>

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

                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletedCustomer
