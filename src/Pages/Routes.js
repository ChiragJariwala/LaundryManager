import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { FcFile, FcPlus } from 'react-icons/fc'
import { DeliveryDiningTwoTone } from '@mui/icons-material';

import Dashboard from './Dashboard'
import Customers from './Customer/Customers'
import CustomerDetails from "./Customer/CustomerDetails";
import Branches from './Branchs/Branches'
import Settings from './Employee/Settings'
import UserInfo from './Employee/UserInfo'
import DeliveryDetails from './Jobs/DeliveryDetails'
import Inwards from './Jobs/Inwards'
import Jobs from './Jobs/Jobs'
import DeletedJobs from './Jobs/DeletedJobs'
import JobDetails from './Jobs/JobDetails'
import MakeDelivery from './Jobs/MakeDelivery'
import Memberships from './Membership/Memberships'
import Categories from './Product/Categories'
import Products from './Product/Products'
import Finance from './Reports/Finance'
import Reports from './Reports/Reports'
import NewUser from './Employee/NewUser'
import UserTypes from './Employee/UserTypes'
import Biils from './Jobs/Biils'
import Navbar from "./Navbar/Navbar";
import DeletedCustomer from "./Customer/DeletedCustomer";
import BillDetails from "./Jobs/BillDetails";
import { useSelector } from "react-redux";

function AppRoutes() {
  const isAdmin = useSelector(state=>state.auth.isAdmin);
  return (
    <Router>
    <Routes>
      
      <Route>
      
        <Route path='/' element={<Home />} />
        <Route path='/Dashboard' exact element={<Dashboard />} />
        <Route exact path='/Customers/CustomerDetails' element={<CustomerDetails />} />
        <Route exact path='/Customers/CustomerDetails/:id' element={<CustomerDetails />} />
        <Route exact path='/Customers' element={<Customers id="Customers" />} />
        <Route exact path='/abc' element={<Customers id="Jobs" />} />

        <Route path='/Products' element={<Products />} />
        <Route path='/Inwards' element={<Inwards />} />
        <Route exact path='/Jobs' element={<Jobs />} />
        <Route exact path='/DeletedJobs' element={<DeletedJobs />} />
        <Route exact path='/Jobs/Jobdetails' element={<JobDetails />} />
        <Route path='/Jobs/Jobdetails/:id' element={<JobDetails />} />
        <Route exact path='/Delivery' element={<MakeDelivery />} />
        <Route exact path='/Delivery/Details/:id' element={<DeliveryDetails />} />
        <Route path='/membership' element={<Memberships />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/ledger' element={<Finance />} />
        {isAdmin && <Route path='/branchs' element={<Branches />} />}
        
        <Route path='/settings' element={<Settings />} />
        <Route path='/Categories' element={<Categories />} />
        <Route path='/Bills' element={<Biils />} />
        <Route path='/Bills/BillDetails' element={<BillDetails />} />
        <Route path='/Bills/BillDetails/:id' element={<BillDetails />} />
        <Route exact path='/users/NewUser' element={<NewUser />} />
        <Route exact path='/users/type' element={<UserTypes />} />
        <Route exact path='/users' element={<UserInfo />} />
        <Route exact path='/deletedCustomers' element={<DeletedCustomer />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
    </Router>
  );

}

export default AppRoutes


function PageNotFound() {
  return <>
    <div className="container py-4">

      <div className="row align-items-md-stretch">
        <div className="col-md-12">
          <div className="h-100 p-5 text-white bg-dark rounded-3">
            <div className="display-3">
              404 Page Not Found
            </div>
            <div className="text-white">
              <h2>Either you do not have access to this page or this pade does not exist.</h2>
              <h3>Contact Administrator for support.</h3>
              <br />
              <hr />
              <h3>If you're system admin, contact <a href="clickrabbit.in" className='text-white'>
                ClickRabbit.in
              </a> for support.
              </h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
}

function Home() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <div className="p-5 mb-4 bg-light rounded-3 shadow">
          <div className="container-fluid py-5 text-center">
            <h1 className="display-5 fw-bold text-center">Green Clean Dry Cleaners</h1>
            <p className="col- fs-4 text-center">Software by Clickrabbit</p>
            {/* <Link target="_blank" className="btn btn-primary btn-lg" to={{ pathname: "https//clickrabbit.in"}} >Click for Support</Link> */}
          </div>
          <div className='d-flex justify-content-center'>
            <img src="http://www.greenclean.co.in/images/logo.png" alt="LOGO" />
          </div>
        </div>
        <div>
          <div className="card">
            <div className="card-header display-3 text-center">
              Retail Work
            </div>
            <div className="row text-center display-5">

              <div className="col-6">
                <Link className='text-decoration-none' to='/Jobs'> <FcPlus /> New Job </Link>
              </div>
              <div className="col-6">
                <Link className='text-decoration-none' to='/'> <FcPlus /> Branch Inward </Link>
              </div>
              <div className="col-6">
                <Link className='text-decoration-none' to='/'> <FcPlus /> Branch Outward </Link>
              </div>
              <div className="col-6">
                <Link className='text-decoration-none' to='/'> <FcFile /> Generate Bill </Link>
              </div>
              <div className="col-6">
                <Link className='text-decoration-none' to='/'> <DeliveryDiningTwoTone fontSize='25px' /> Delivery </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>)
}