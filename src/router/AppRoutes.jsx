// AppRoutes.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import ShopsPage from '../pages/ShopsPage'
import PetPage from '../pages/PetPage'
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
import SignupPage from '../pages/SignupPage'
import MyPage from '../pages/MyPage'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const AppRoutes = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/pet" element={<PetPage />} />
                        <Route path="/shops" element={<ShopsPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/my/:id" element={<MyPage />} />
                    </Routes>
                </Layout>
            </Router>
        </QueryClientProvider>
    )
}

export default AppRoutes
