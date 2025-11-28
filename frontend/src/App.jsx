import { useState } from 'react'
import CertificateForm from './components/CertificateForm'
import CertificateVerify from './components/CertificateVerify'
import CertificateList from './components/CertificateList'

function App() {
  const [activeTab, setActiveTab] = useState('create')

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">PSU Certificate System</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded ${activeTab === 'create' ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
              Create Certificate
            </button>
            <button
              onClick={() => setActiveTab('verify')}
              className={`px-4 py-2 rounded ${activeTab === 'verify' ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
              Verify Certificate
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded ${activeTab === 'list' ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
              View Certificates
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {activeTab === 'create' && <CertificateForm />}
        {activeTab === 'verify' && <CertificateVerify />}
        {activeTab === 'list' && <CertificateList />}
      </main>
    </div>
  )
}

export default App