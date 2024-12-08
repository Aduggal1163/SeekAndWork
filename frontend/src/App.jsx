import React, {useState, useEffect, useContext} from 'react';
import './App.css'
import {Context} from './main'

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import PostJob from './components/Job/PostJob'
import MyJob from './components/Job/MyJobs'
import Application from './components/Application/Application'
import MyApplication from './components/Application/MyApplications'
import NotFound from './components/NotFound/NotFound'
import Terms from './components/Layout/Terms'
import Privacy from './components/Layout/Privacy';
// import terms from './components/Layout/Termsandconditions'
// import terms from './components/Layout/Termsandconditions'
import Landing from './components/LandingPage/Landing';
import GraphicsAndDesign from './components/LearningContent/GraphicsAndDesign'
import ArtificialIntelligence from './components/LearningContent/Ai'
import AccountAndFinance from './components/LearningContent/AccAndFinance'
import DataEntry from './components/LearningContent/DataEntryOperator'
import MeanSatck from './components/LearningContent/Mean'
import MernSatck from './components/LearningContent/Mern'
import MobileAppDev from './components/LearningContent/MobileAppDev'
import VideoAnimation from './components/LearningContent/VideoAnimation'
import FrontendWebDev from './components/LearningContent/Frontend_Web_Development'
// import Navbarr from './components/LandingPage/Navbar'


import { Toaster } from 'react-hot-toast'
import axios from 'axios'


import Admin from './components/Admin/Admin';
import Dashboard from './components/Admin/Dashboard';

function ProtectedRoute({ children, isAuthorized, redirectTo }) {
  return isAuthorized ? <Navigate to={redirectTo} /> : children;
}

function App() {
  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context)
  const [hasVisitedAdmin, setHasVisitedAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);
  const hideNavbarFooterRoutes = ["/admin",'/admin/dashboard','/landing'];
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);





  return (
    <>
      <Router>
      {!shouldHideNavbarFooter && <Navbar />}
        <Routes>
        <Route
            path='/admin'
            element={
              <ProtectedRoute isAuthorized={isAuthorized} redirectTo="/login">
                <Admin setHasVisitedAdmin={setHasVisitedAdmin} />
              </ProtectedRoute>
            }
          />
       
            <Route 
                path='/admin/dashboard' 
                element={hasVisitedAdmin ? <Dashboard /> : <Navigate to='/admin' />} 
            />
        
          <Route path="/login" element={<Login />} />
          <Route
            path="/landing"
            element={
              <ProtectedRoute
                isAuthorized={isAuthorized}
                redirectTo="/"
              >
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path='/job/me' element={<MyJob/>}/>
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplication />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/learning-content/graphics-and-design" element={<GraphicsAndDesign/>} />
          <Route path="/learning-content/artificial-intelligence" element={<ArtificialIntelligence/>} />
          <Route path="/learning-content/account-and-finance" element={<AccountAndFinance/>} />
          <Route path="/learning-content/data-entry" element={<DataEntry/>} />
          <Route path="/learning-content/mean-stack" element={<MeanSatck/>} />
          <Route path="/learning-content/mern-stack-development" element={<MernSatck/>} />
          <Route path="/learning-content/mobile-app-development" element={<MobileAppDev/>} />
          <Route path="/learning-content/video-animation" element={<VideoAnimation/>} />
          <Route path="/learning-content/frontend-web-development" element={<FrontendWebDev/>} />
          {/* <Route path="/landing/navbar" element={<Navbarr/>} /> */}

          {/* <Route path="/termsandconditions" element={<terms/>} /> */}
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        {!shouldHideNavbarFooter && <Footer />}
        <Toaster/>
      </Router>
    </>
  )
}

export default App
