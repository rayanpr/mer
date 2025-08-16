import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePages'
import AboutPage from './pages/AboutPage'
import ProjectPage from './pages/ProjectPage' 
import DashboardPage from './pages/DashboardPage' 
import SigInPage from './pages/SigInPage'
import SignUpPage from './pages/SignUpPage'
import Header from './components/Header'
import Footers from './components/Footers'
import PrivateRoute from './components/PrivateRoute'
import PrivateRouteAdmin from './components/PrivateRouteAdmin'
import CreatePost from './pages/CreatePost'

export default function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/project' element={<ProjectPage />} />
        <Route  element={<PrivateRoute />}>
          <Route path='dashboard' element={<DashboardPage />} />
        </Route>
        <Route path='*' element={<h1>404</h1>} />'
        <Route path='/sign-in' element={<SigInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} /> 
        <Route element={<PrivateRouteAdmin />}>
          <Route path='/create-post' element={<CreatePost/>} />
        </Route>
      </Routes>
      <Footers/>
    </div>
  )
}
