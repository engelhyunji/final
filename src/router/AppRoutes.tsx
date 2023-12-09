// AppRoutes.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import ShopsPage from '../pages/ShopsPage'
import PetPage from '../pages/PetPage'
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
import SignupPage from '../pages/SignupPage'
import PetDetailPage from '../pages/PetDetailPage'
import PetModifyPage from '../pages/PetModifyPage'
import ShopsDetailPage from '../pages/ShopsDetailPage'
import ShopsModifyPage from '../pages/PetModifyPage'
import PetListPage from '../pages/PetListPage'
import ShopsListPage from '../pages/ShopsListPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import MyPage from '../pages/MyPage'

const queryClient = new QueryClient()

const AppRoutes = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        {/* 생성 페이지 create */}
                        <Route path="/pet" element={<PetPage />} />
                        {/* 목록 페이지 list */}
                        <Route path="/petlist" element={<PetListPage />} />
                        {/* 상세 페이지 detail */}
                        <Route path="/pets/:id" element={<PetDetailPage />} />
                        {/* 수정 + 삭제 페이지 modify */}
                        <Route path="/pet/modify/:id" element={<PetModifyPage />} />
                        {/* 생성 페이지 create */}
                        <Route path="/shops" element={<ShopsPage />} />
                        {/* 목록 페이지 list */}
                        <Route path="/shopslist" element={<ShopsListPage />} />
                        {/* 상세 + 댓글 페이지 detail */}
                        <Route path="/shops/:shopId" element={<ShopsDetailPage />} />
                        {/* 수정 + 삭제 페이지 modify */}
                        <Route path="/shops/modify/:id" element={<ShopsModifyPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/my/:userId" element={<MyPage />} />
                    </Routes>
                </Layout>
            </Router>
        </QueryClientProvider>
    )
}

export default AppRoutes
