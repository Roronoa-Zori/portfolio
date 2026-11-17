import { MotionConfig } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ScrollManager from './components/ScrollManager'
import Grain from './components/Grain'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Grain />
      <CustomCursor />
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </MotionConfig>
  )
}
