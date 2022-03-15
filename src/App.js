import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './Pages/Routes';
import Login from './Pages/Login';
import { useSelector } from 'react-redux';
import { useState } from 'react';



function App({ authorized }) {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  let [valid,setValid] = useState(true)
  return (
    <>
      {authorized != isAuth &&
        setValid(false)
      }
      {valid && <Login />}
      {isAuth &&
        <>

          <AppRoutes />
          <Footer />
        </>}
    </>
  );
}


function Footer() {
  return (
    <>
      <div className="fixed-bottom">
        <div className="text-center opacity-50 ">
          <p>@copyright - Clickrabbit.in | 2022</p>
        </div>
      </div>
    </>
  )
}

export default App;


