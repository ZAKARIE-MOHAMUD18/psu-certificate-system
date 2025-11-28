import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function CertificateList() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchCertificates = async (page = 1) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/certificates?page=${page}&per_page=10`)
      const data = await response.json()
      
      if (response.ok) {
        setCertificates(data.certificates)
        setTotalPages(data.pages)
        setCurrentPage(page)
      } else {
        console.error('Failed to fetch certificates:', data.error)
      }
    } catch (error) {
      console.error('Error fetching certificates:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  const handlePageChange = (page) => {
    fetchCertificates(page)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="text-center">Loading certificates...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Certificate List</h2>
      
      {certificates.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No certificates found. Create your first certificate!
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Student Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Student ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Program</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Degree</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Graduation Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Verification Code</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Created</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">{cert.student_name}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{cert.student_id}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{cert.program}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{cert.degree_type}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {new Date(cert.graduation_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono text-blue-600">{cert.verification_code}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {new Date(cert.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CertificateList