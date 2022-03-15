import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'

const UserInfo = () => {
  const uri = process.env.REACT_APP_API_KEY

  const [userList, setUserList] = useState(null)



  useEffect(() => {
    axios.get(uri + '/User/GetAllUsers', {
      withCredentials: true,
      crosOrigin: true
    }).then(data => data.data)
      .then(setUserList)
  }, [])


  if (userList)
    return (
      <>
        <Navbar />

        <div className='container'>
          <div className='Card'>
            <div className='card-header'>

              <div className='display-5'>List Of Employees</div>
            </div>
            <div className='card-body'>
              <table className='table table-responsive'>
                <caption>List of users</caption>
                <thead className='thead table-dark'>
                  <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>UserName</td>
                    <td>Address</td>
                    <td>Area</td>
                    <td>City</td>
                    <td>ContactNumber</td>
                    <td>PhysicalRole</td>
                    <td>UserType</td>
                    <td>BranchID</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>

                  {userList.map((user, i) =>
                    <tr key={i}>
                      <td>{user.UserID}</td>
                      <td>{user.Name}</td>
                      <td>{user.UserName}</td>
                      <td>{user.Address}</td>
                      <td>{user.Area}</td>
                      <td>{user.City}</td>
                      <td>{user.ContactNumber}</td>
                      <td>{user.PhysicalRole}</td>
                      <td>{user.UserType}</td>
                      <td>{user.BranchID}</td>
                      <td><Button onClick={(e) => {
                        window.alert('Not Implemented')
                      }} >Edit</Button></td>
                    </tr>
                  )}


                </tbody>
              </table>
            </div>

          </div>
        </div>
      </>
    )

  return <div> No Data..</div>
}

export default UserInfo
