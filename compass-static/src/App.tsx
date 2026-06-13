import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NavBar from './components/NavBar'
import LandingPage from './pages/LandingPage'
import AssessorPage from './pages/AssessorPage'
import ReportsPage from './pages/ReportsPage'
import ReportDetailPage from './pages/ReportDetailPage'
import MethodologyPage from './pages/MethodologyPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assess" element={<AssessorPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:reportSlug" element={<ReportDetailPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
