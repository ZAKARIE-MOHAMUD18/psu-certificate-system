import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function CertificateForm() {
  const [formData, setFormData] = useState({
    student_name: '',
    student_id: '',
    program: '',
    degree_type: '',
    graduation_date: '',
    gpa: '',
    honors: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch(`${API_URL}/certificates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
        setFormData({
          student_name: '',
          student_id: '',
          program: '',
          degree_type: '',
          graduation_date: '',
          gpa: '',
          honors: ''
        })
      } else {
        alert(data.error || 'Failed to create certificate')
      }
    } catch (error) {
      alert('Error creating certificate: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Certificate</h2>
      
      {result && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-bold text-green-800">Certificate Created Successfully!</h3>
          <p className="text-green-700">Verification Code: <span className="font-mono font-bold">{result.certificate.verification_code}</span></p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Name *
          </label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student ID *
          </label>
          <input
            type="text"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Program *
          </label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Degree Type *
          </label>
          <select
            name="degree_type"
            value={formData.degree_type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Degree Type</option>
            <option value="Bachelor">Bachelor's Degree</option>
            <option value="Master">Master's Degree</option>
            <option value="PhD">PhD</option>
            <option value="Diploma">Diploma</option>
            <option value="Certificate">Certificate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Graduation Date *
          </label>
          <input
            type="date"
            name="graduation_date"
            value={formData.graduation_date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GPA
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Honors
          </label>
          <select
            name="honors"
            value={formData.honors}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">No Honors</option>
            <option value="Summa Cum Laude">Summa Cum Laude</option>
            <option value="Magna Cum Laude">Magna Cum Laude</option>
            <option value="Cum Laude">Cum Laude</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Certificate'}
        </button>
      </form>
    </div>
  )
}

export default CertificateForm