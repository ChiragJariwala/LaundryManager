import React from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Navbar from '../../Pages/Navbar/Navbar';
import AppRoutes from '../../Pages/Routes'
const Layout = () => {
    return (
        
            
                <div className=''>

                    {/* <Sidebar {...props}/> */}
                    <div className="layout__contents">
                        <Navbar />
                        <div className="layout__content-main">
                            <AppRoutes />
                        </div>
                    </div>
                </div>
          
       
    )
}

export default Layout
