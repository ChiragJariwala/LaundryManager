import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button, } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';

const uri = process.env.REACT_APP_API_KEY
const Navbar = () => {
    const isAdmin = useSelector(state => state.auth.isAdmin)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAdmin &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" href='#' type='button' data-bs-toggle="dropdown" aria-expanded="false" >
                                    Masters
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/branchs">New Branch</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/users/type">New Employee Type</Link></li>
                                    <li><Link className="dropdown-item" to="/users/NewUser">New Employee</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/Categories">New Product Group</Link></li>
                                    <li><Link className="dropdown-item" to="/products">New Products </Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/Membership">New Membership Type</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/Customers">New Retail Client </Link></li>
                                </ul>
                            </li>
                        }
                        {isAdmin &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    View Data
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/branchs">Branch</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/users/type">Employee Type</Link></li>
                                    <li><Link className="dropdown-item" to="/users">Employee</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/Categories">Product Group</Link></li>
                                    <li><Link className="dropdown-item" to="/products">Products </Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/Membership">Membership Type</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/Customers">Retail Client </Link></li>
                                </ul>
                            </li>
                        }
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Retails
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/customers/CustomerDetails">New Client</Link></li>
                                <li><Link className="dropdown-item" to="/customers">Edit Client</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/jobs/jobdetails">New Job</Link></li>
                                <li><Link className="dropdown-item" to="/jobs">Edit/Delete Job</Link></li>
                                <li><Link className="dropdown-item" to="/jobs">Re-Print Barcode</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/jobs">Branch Inward</Link></li>
                                <li><Link className="dropdown-item" to="/Delivery">Branch Outward</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/inwards">Factory Inward</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/Delivery">Delivery </Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/payments">Mark Paid</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/customers">Retail Client </Link></li>
                            </ul>
                        </li>

                        {isAdmin &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Utilities
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <span className='mx-3 text-info'> Retials </span>
                                    <li><Link className="dropdown-item" to="/Bills">Billing</Link></li>
                                    <li><Link className="dropdown-item" to="/Recharge">Recharge</Link></li>
                                    <li><Link className="dropdown-item" to="/">Convert Cash To Member</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/Wish">Wish Birthday | Anniversary</Link></li>
                                    <li><Link className="dropdown-item" to="/YearMaster">Year Master</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/backup-wizard">Create Backup</Link></li>
                                </ul>
                            </li>
                        }
                        {isAdmin &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Ledger
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/ledger">Retail Client Ledger</Link></li>
                                </ul>
                            </li>
                        }
                        {isAdmin &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Reports
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <span className='mx-3 text-info'> Retials </span>
                                    <li><Link className="dropdown-item" to="/">Daily Client</Link></li>
                                    <li><Link className="dropdown-item" to="/">Daily Job</Link></li>
                                    <li><Link className="dropdown-item" to="/jobs">Daily Bill</Link></li>
                                    <li><Link className="dropdown-item" to="/jobs">Daily Recharge</Link></li>
                                    <li><Link className="dropdown-item" to="/jobs">Pending Job</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <span className='text-info mx-3'> Active / Non-Active &nbsp;&nbsp;&nbsp;Members</span>
                                    <li><Link className="dropdown-item" to="/jobs">Active Members</Link></li>
                                    <li><Link className="dropdown-item" to="/jobs">Non-Active Members</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/jobs">Cout of Graments</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/jobs">Daily Paid Bills</Link></li>
                                </ul>
                            </li>
                        }
                        {isAdmin &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Deleted Data
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <span className='mx-3 text-info'> Retials </span>
                                    <li><Link className="dropdown-item" to="/deletedCustomers">Clients</Link></li>
                                    <li><Link className="dropdown-item" to="/deletedjobs">Jobs</Link></li>
                                    <li><Link className="dropdown-item" to="/deletedBills">Bills</Link></li>
                                    <li><Link className="dropdown-item" to="/deletedRecharges">Recharges</Link></li>
                                </ul>
                            </li>
                        }

                    </ul>
                    <Button variant='outlined' startIcon={<LogoutIcon />} color='error' onClick={() => {
                        axios.post(uri + '/Auth/Logout', {
                            withCredentials: true,
                            crosOrigin: true
                        }).then((res) => toast(res.data))
                        localStorage.clear()
                        window.location.href = '/'
                    }}>Logout</Button>
                </div>
            </div>
        </nav>


    )
}

export default Navbar


