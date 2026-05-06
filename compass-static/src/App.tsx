import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import LandingPage from './pages/LandingPage'
import AssessorPage from './pages/AssessorPage'
import ReportsPage from './pages/ReportsPage'
import ReportDetailPage from './pages/ReportDetailPage'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assess" element={<AssessorPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:reportSlug" element={<ReportDetailPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
