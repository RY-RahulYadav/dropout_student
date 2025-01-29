'use client'

import { useState, useEffect } from 'react'

export default function ScholarshipPage() {
  const [scholarships, setScholarships] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newScholarship, setNewScholarship] = useState({
    name: "",
    amount: "",
    requirements: "",
    documents: "",
    category: "",
  })

  // Fetch scholarships from the API
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/scholarships/allscholarship')
        const data = await response.json()
        if (data.scholarship) {
          setScholarships(data.scholarship)
        }
      } catch (error) {
        console.error('Error fetching scholarships:', error)
      }
    }

    fetchScholarships()
  }, [])

  // Handle input changes for the new scholarship form
  const handleInputChange = (e) => {
    setNewScholarship({ ...newScholarship, [e.target.name]: e.target.value })
  }

  // Handle submitting the new scholarship form
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:3000/api/scholarships/addscholarship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newScholarship),
      })
      const data = await response.json()
      
      if (data.scholarship) {
        setScholarships((prev) => [...prev, data.scholarship])
        setNewScholarship({ name: "", amount: "", requirements: "", documents: "", category: "" })
        setIsModalOpen(false)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error adding scholarship:', error)
    }
  }

  // Handle scholarship application (this is a placeholder)
  const handleApply = (id) => {
    alert(`Applying for scholarship with ID: ${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Scholarships</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
              <div className="p-6">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">{scholarship.category}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{scholarship.name}</h2>
                <p className="text-3xl font-bold text-green-600 mb-4">{scholarship.amount}</p>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">Requirements:</span> {scholarship.requirements}
                </div>
                <div className="text-gray-700 mb-4">
                  <span className="font-semibold">Documents:</span> {scholarship.documents}
                </div>
                <button
                  onClick={() => handleApply(scholarship.id)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Scholarship
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input type="text" id="name" name="name" value={newScholarship.name} onChange={handleInputChange} required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                  <input type="text" id="amount" name="amount" value={newScholarship.amount} onChange={handleInputChange} required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="requirements" className="block text-gray-700 text-sm font-bold mb-2">Requirements</label>
                  <textarea id="requirements" name="requirements" value={newScholarship.requirements} onChange={handleInputChange} required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="documents" className="block text-gray-700 text-sm font-bold mb-2">Documents</label>
                  <textarea id="documents" name="documents" value={newScholarship.documents} onChange={handleInputChange} required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                  <input type="text" id="category" name="category" value={newScholarship.category} onChange={handleInputChange} required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-between mt-6">
                  <button type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    Add Scholarship
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
