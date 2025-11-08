import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Brand from '../pages/Brand'
import BlindBox from '../pages/BlindBox'
import BlindBoxCategory from '../pages/BlindBoxCategory'
import ProtectedLayout from '../layouts/ProtectedLayout'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/brand" element={<Brand />} />
          <Route path="/blind-box" element={<BlindBox />} />
          <Route path="/blind-box/category" element={<BlindBoxCategory />} />
          <Route path="/" element={<Navigate to="/brand" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}