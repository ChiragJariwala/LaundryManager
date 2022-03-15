import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import {Link, useNavigate} from 'react-router-dom'
const Biils = () => {
  const history = useNavigate()
  const uri = process.env.REACT_APP_API_KEY
  const [bills, setBills] = useState([])
  const fetchBills = () => {
    axios.get(uri + '/Bill/GetAllBills', {
      withCredentials: true,
      crosssOrigin: true
    }).then(res => setBills(res.data))
      .catch(error => window.alert(error))
  }


  useEffect(() => {
    fetchBills();
  }, [])


  return (
    <div>

      <Navbar />
      <div className="container mt-5">
        <p className="display-6">Bills</p>
        <table className="table table-striped table-responsive-sm">
          <thead>
            <tr>
              <td>Bill Id</td>
              <td>Job Number</td>
              <td>BillAmount</td>
              <td>CustomerName</td>
              <td>Phone</td>
              <td>Address</td>
              <td>BranchID</td>
              <td>UserID</td>
              <td>Area</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
          
          {bills.map((x,i) =>
            <tr>
              <td id={i}>{x.Id}</td>
              <td>{x.JobNumber}</td>
              <td>{x.BillAmount}</td>
              <td>{x.CustomerName}</td>
              <td>{x.Phone}</td>
              <td>{x.Address}</td>
              <td>{x.BranchID}</td>
              <td>{x.UserID}</td>
              <td>{x.Area}</td>
              <td>
                <button 
                className='btn btn-primary'
                  value={x.id}
                  onClick={(e,v)=>{
                    history("/Bills/BillDetails/" +x.Id)
                    //window.alert(x.Id)
                  }}
                >
                  Edit
                </button>
                </td>
            </tr>
        
        )}

        </tbody>
        </table>
        


      </div>
    </div>
  )
}

export default Biils
