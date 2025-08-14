import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePages'
import AboutPage from './pages/AboutPage'
import ProjectPage from './pages/ProjectPage' 
import DashboardPage from './pages/DashboardPage' 
import SigInPage from './pages/SigInPage'
import SignUpPage from './pages/SignUpPage'


export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/project' element={<ProjectPage />} />
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='*' element={<h1>404</h1>} />'
        <Route path='/sign-in' element={<SigInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} /> 
      </Routes>
    </div>
  )
}
