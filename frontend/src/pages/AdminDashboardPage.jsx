import { useState } from 'react'
import Sidebar from '../components/admin/Sidebar.jsx'
import DashboardOverview from '../components/admin/DashboardOverview.jsx'
import PlaceholderPanel from '../components/admin/PlaceholderPanel.jsx'
import UsersPanel from '../components/admin/users/UsersPanel.jsx'
import { ADMIN_MODULES } from '../components/admin/modules.js'
import '../styles/admin.css'

function AdminDashboardPage() {
  const [activeKey, setActiveKey] = useState('dashboard')

  const activeModule = ADMIN_MODULES.find((module) => module.key === activeKey)

  function renderContent() {
    if (activeKey === 'dashboard') {
      return <DashboardOverview />
    }
    if (activeKey === 'users') {
      return <UsersPanel />
    }
    return <PlaceholderPanel label={activeModule?.label ?? ''} />
  }

  return (
    <div className="admin-shell">
      <Sidebar items={ADMIN_MODULES} activeKey={activeKey} onSelect={setActiveKey} />

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar-eyebrow">Admin Panel</p>
            <h1 className="admin-topbar-title">{activeModule?.label}</h1>
          </div>
        </header>

        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage