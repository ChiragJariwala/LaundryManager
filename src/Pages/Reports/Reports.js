import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from '../Navbar/Navbar'
const uri = process.env.REACT_APP_API_KEY

const Reports = () => {
  const [joblist, setJobList] = useState([]) //current job detail table
  const [customerList, setCustomerList] = useState([])
  const [datevalue, setDateValue] = React.useState(null);
  const [jobcode, setJobcode] = useState('')
  const [branchName, setBranchName] = useState([])
  const [users, setUsers] = useState([])
  const [itemRate, setItemRate] = useState(0)
  const [itemQty, setItemQty] = useState(0)
  const [customers, setCustomers] = useState([]) //temp hook
  var curr = new Date()
  curr.setDate(curr.getDate())
  var date = curr.toISOString().substring(0, 10)



  const JobFactoryInward = async () => {
    axios.get(uri + "/Jobs/GetJobs", {
      crossOrigin: true,
      withCredentials: true
    })
      .then((data) => setCustomerList(data.data))
    await axios.get(uri + "/Jobs/GetJobDetails", {
      params: {
        "jobnumber": 'J01'
      },
      withCredentials: true, crossOrigin: true
    }).then((newData) => setJobList(newData.data))
  }

  //setJobList((res)=> res.data)
  //console.log(customerList)
  useEffect(() => {
    JobFactoryInward()
    
  }, [])
  return (
    <div>
      <h2>Reports</h2>
        <Navbar/>
      <table>
        <thead>

        </thead>
        <tbody>
                {joblist.map((customer, i) =>
                  <tr key={customer.JobNumber}>
                    <td>
                      {i + 1}
                    </td>
                    <td>
                      {customer.JobNumber}
                    </td>
                    <td>
                      {customer.JobDate}
                    </td>
                    <td>
                      {customer.CustomerName}
                    </td>
                    <td>
                      {customer.ttlProducts}
                    </td>

                    <td>
                      {customer.ttlAmount}
                    </td>
                    <td>
                      {customer.DeliveryType}
                    </td>
                    
                  </tr>
                )}
              </tbody>
      </table>
    </div>
  )
}

export default Reports
