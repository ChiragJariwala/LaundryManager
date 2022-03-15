import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const BillDetails = () => {
    const { id } = useParams()
    return (
        <div>
            <Navbar />
            <div className="container container-fluid">
                <p className="display-4">Bill Details</p>
                <hr />
                <div className="row">
                    <div className="col-6">
                        <div className="row row-cols-2">
                            <div className='col'>
                                <b>Customer Name </b>
                                
                            </div>
                            <div className='col text-start'>
                                Customer Name
                            </div>
                            <div className='col'>
                              <b>Customer Address </b>
                            </div>
                            <div className='col text-start'>
                                demo address
                            </div>
                             <div className='col'>
                              <b>Customer Phone </b>
                            </div>
                            <div className='col text-start'>
                                xxxxx xxxxx
                            </div>
                             <div className='col'>
                              <b>Customer Area </b>
                            </div>
                            <div className='col text-start'>
                                xxxxx
                            </div>
                        </div>
                    </div>
                    {/* Secpond half of screen */}
                    <div className="col-6">
                        <div className="row row-cols-2">
                            <div className='col'>
                                <b>Bill Number </b>
                                
                            </div>
                            <div className='col'>
                                ___BillNumber___
                            </div>
                            <div className='col'>
                              <b>Job Number </b>
                            </div>
                            <div className='col'>
                                ___JobNumber___
                            </div>
                            <div className='col'>
                              <b>Job Date </b>
                            </div>
                            <div className='col'>
                                ___JobDate___
                            </div>
                            <div className='col'>
                              <b>Bill Date </b>
                            </div>
                            <div className='col'>
                                ___BillDate___
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <p className='display-6'>Product Details</p>
            </div>
        </div >
    )
}

export default BillDetails
