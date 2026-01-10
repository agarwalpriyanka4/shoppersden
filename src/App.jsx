import { useState } from 'react'
import Login from './components/molecules/Login/Login.jsx'
import Registration from './components/molecules/Registration/Registration.jsx'
import './App.css'
import ShopperHeader from './components/molecules/ShopperHeader/ShopperHeader.jsx';
import Dashboard from './components/organisms/Dashboard/Dashboard.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import Accounts from './components/molecules/Accounts/Accounts.jsx';
import Admin from './components/molecules/Admin/Admin.jsx';
import Books from './components/molecules/Books/Books.jsx';
import Clothing from './components/molecules/Clothing/Clothing.jsx';
import Gifts from './components/molecules/Gifts/Gifts.jsx';
import Electronics from './components/molecules/Electronics/Electronics.jsx';
import FAQ from './components/molecules/FAQ/FAQ.jsx';
import Help from './components/molecules/Help/Help.jsx';
import Home from './components/molecules/Home/Home.jsx';
import Sports from './components/molecules/Sports/Sports.jsx';
import Footer from './components/molecules/Footer/Footer.jsx';
import { Box } from '@mui/material';
import Page404 from './components/molecules/Page404/Page404.jsx';
import ProtectedRoute from './components/molecules/ProtectedRoute/ProtectedRoute.jsx';
import ProductListView from './components/molecules/ProductListView/ProductListView.jsx';


function App() {
   const [newUser, setNewUser] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   

  /* function handleNewUser(value){
    setNewUser(value);
  }
  function handleIsLoggedIn(value){
    setIsLoggedIn(value);
  }
  let content;
  if(newUser){
    content = <Registration newUserState={handleNewUser}/>;
  } 
  if(!newUser && !isLoggedIn){
    content = <Login newUserState={handleNewUser} isLoggedInState={handleIsLoggedIn} />;
  }   */
  return (
    <div className="app-layout">
      <ShopperHeader />
      
     
          <Routes>
            <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard/home" : "/login"} />} />
            <Route path="/login" element={newUser?<Registration newUserState={setNewUser} />:<Login newUserState={setNewUser} isLoggedInState={setIsLoggedIn}/>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
             <Route path="accounts" element={<Accounts />} />
             <Route path="admin" element={<Admin />} />
             <Route path="productlistview" element={<ProductListView />} />
             <Route path="books" element={<Books />} />
             {/* <Route path="books/:bookId/:name" element={<Books />} /> */}
             <Route path="books/:bookId" element={<Books />} />
             <Route path="clothing" element={<Clothing />} />
             <Route path="gifts" element={<Gifts />} />
             <Route path="faqs" element={<FAQ />} />
             <Route path="help" element={<Help />} />
             <Route path="home" element={<Home />} />
             <Route path="sports" element={<Sports />} />
             <Route path="electronics" element={<Electronics />} />
            </Route>
           {/*  <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Registration newUserState={setNewUser} /></ProtectedRoute>} /> */}
            <Route path="*" element={<Page404 />} />
          </Routes>
         <Box
  sx={{
    minHeight: "5vh",
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.paper",
    pb: "20px", // ✅ reserves space for fixed footer
  }}
>
        <Footer />
      </Box> 
     
        </div>
      
    
  )
}

export default App
