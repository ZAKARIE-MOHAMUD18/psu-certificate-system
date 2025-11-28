import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function CertificateVerify() {
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [qrCode, setQrCode] = useState(null)

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!verificationCode.trim()) return
    
    setLoading(true)
    setResult(null)
    setQrCode(null)
    
    try {
      const response = await fetch(`${API_URL}/certificates/${verificationCode}/verify`)
      const data = await response.json()
      
      setResult(data)
      
      if (data.valid) {
        // Get QR code
        const qrResponse = await fetch(`${API_URL}/certificates/${verificationCode}/qr`)
        const qrData = await qrResponse.json()
        if (qrResponse.ok) {
          setQrCode(qrData)
        }
      }
    } catch (error) {
      setResult({
        valid: false,
        message: 'Error verifying certificate: ' + error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Verify Certificate</h2>
      
      <form onSubmit={handleVerify} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
            placeholder="Enter verification code (e.g., ABC123DEF456)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength="12"
          />
          <button
            type="submit"
            disabled={loading || !verificationCode.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </form>

      {result && (
        <div className={`p-4 rounded-md border ${result.valid ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
          {result.valid ? (
            <div>
              <h3 className="text-lg font-bold text-green-800 mb-4">✓ Certificate Valid</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Student Name:</span>
                    <p className="text-gray-900">{result.certificate.student_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Student ID:</span>
                    <p className="text-gray-900">{result.certificate.student_id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Program:</span>
                    <p className="text-gray-900">{result.certificate.program}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Degree:</span>
                    <p className="text-gray-900">{result.certificate.degree_type}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Graduation Date:</span>
                    <p className="text-gray-900">{new Date(result.certificate.graduation_date).toLocaleDateString()}</p>
                  </div>
                  {result.certificate.gpa && (
                    <div>
                      <span className="font-medium text-gray-700">GPA:</span>
                      <p className="text-gray-900">{result.certificate.gpa}</p>
                    </div>
                  )}
                  {result.certificate.honors && (
                    <div>
                      <span className="font-medium text-gray-700">Honors:</span>
                      <p className="text-gray-900">{result.certificate.honors}</p>
                    </div>
                  )}
                </div>
                
                {qrCode && (
                  <div className="text-center">
                    <h4 className="font-medium text-gray-700 mb-2">QR Code</h4>
                    <img 
                      src={`data:image/png;base64,${qrCode.qr_code}`} 
                      alt="Certificate QR Code"
                      className="mx-auto border border-gray-300 rounded"
                    />
                    <p className="text-xs text-gray-500 mt-2">Scan to verify</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold text-red-800">✗ Certificate Invalid</h3>
              <p className="text-red-700">{result.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CertificateVerify