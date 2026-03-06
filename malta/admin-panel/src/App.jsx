import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SEO from './pages/SEO'
import Forms from './pages/Forms'
import Verifications from './pages/Verifications'
import Sitemap from './pages/Sitemap'
import SchemaAudit from './pages/SchemaAudit'
import EmptyPages from './pages/EmptyPages'
import Content from './pages/Content'
import ContentEdit from './pages/ContentEdit'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="seo" element={<SEO />} />
            <Route path="verifications" element={<Verifications />} />
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="schema-audit" element={<SchemaAudit />} />
            <Route path="empty-pages" element={<EmptyPages />} />
            <Route path="content" element={<Content />} />
            <Route path="content/new" element={<ContentEdit />} />
            <Route path="content/edit/:id" element={<ContentEdit />} />
            <Route path="forms" element={<Forms />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
