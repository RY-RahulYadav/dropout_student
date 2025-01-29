import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample data
const attendanceData = [
  { month: 'Jan', attendance: 90 },
  { month: 'Feb', attendance: 85 },
  { month: 'Mar', attendance: 92 },
  { month: 'Apr', attendance: 88 },
  { month: 'May', attendance: 95 },
];

const marksData = [
  { semester: '1st', marks: 85 },
  { semester: '2nd', marks: 88 },
  { semester: '3rd', marks: 82 },
  { semester: '4th', marks: 90 },
  { semester: '5th', marks: 87 },
];


export default function EnhancedStudentDashboard(props) {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('current');
  const [modal, setmodal] = useState(false)
  const [astudent, setastudent] = useState({
    parentEmail: props?.data?.parentEmail,
    parentPhoneNumber: props?.data?.parentPhoneNumber,
    backlogs: props?.data?.backlogs,
    classX: props?.data?.classX,
    classXII: props?.data?.classXII,
    gratution: props?.data?.gratution,
    familyincome: props?.data?.familyincome,
  }
  )
  const navigate = useNavigate()

  const handleupdate = async() => {
    // console.log(student)
    const response = await fetch(`${import.meta.env.VITE_URL}/api/student/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('uid')}`
      },
      body: JSON.stringify(astudent)
    });
    const data = await response.json();
    if(data.message=="success"){
      setmodal(false)
      alert("Data Updated Successfully")
      window.location.reload()
    }
    else{
      alert("Error in Updating Data")
    }
  }

  useEffect(()=>{
    // console.log(props.type);
    console.log(localStorage.getItem('type'))
    
    if(localStorage.getItem('type')!="student"){
       navigate("/")
    }
  },[astudent])

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="bg-white shadow-lg rounded-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-800">Student Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 flex items-center">🔔 Notifications</button>
              <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center">💬 Messages</button>
              <img src="/placeholder.svg?height=40&width=40" alt="Student" className="w-10 h-10 rounded-full border-2 border-purple-500" />
            </div>
          </div>
        </header>

        {/* Personal Details Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl rounded-lg mb-8 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl">Personal Details</h2>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center" onClick={() => setmodal(true)}>✏️ Edit Details</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold">Student Information</h3>
              <p>Name: {props?.data?.name}</p>
              <p>Enrollment Number: {props?.data?.studentId}</p>
              <p>College: {props?.data?.collegeOrSchoolName} </p>
              <p>Gender: {props?.data?.gender}</p>
              <p>Course: {props?.data?.coursePursuing}</p>
            </div>
            <div>
              <h3 className="font-semibold">Contact Information</h3>
              <p>Student Email: {props?.data?.email} </p>
              <p>Student Phone: {props?.data?.studentPhoneNumber}</p>
              <p>Parent's Email: {props?.data?.parentEmail }</p>
              <p>Parent's Phone: {props?.data?.parentPhoneNumber}</p>
            </div>
            <div>
              <h3 className="font-semibold">Academic History</h3>
              <p>10th Marks: {props?.data?.classX}%</p>
              <p>12th Marks: {props?.data?.classXII}%</p>
              <p>Graduation Marks: {props?.data?.gratution} GPA</p>
              <p>Backlogs: {props?.data?.backlogs}</p>
              <p>Previous Fees Paid: {props?.data?.previousFee ? 'Yes' : 'No'}</p>
            </div>
            </div>
            <div className="mt-4">
            <h3 className="font-semibold">Health Issues</h3>
            <p>{props?.data?.healthIssues}</p>
            </div>
            <div className="mt-4">
            <h3 className="font-semibold">Behavior Rating</h3>
            <div className="flex items-center">
              <span className="mr-2">Teacher's Rating:</span>
              <div className="w-1/4 bg-gray-200 h-4 rounded-full relative">
              <div className="bg-green-500 h-full rounded-full" style={{ width: `${props?.data?.behaviorRating * 10}%` }}></div>
              </div>
              <span className="ml-2">{props?.data?.behaviorRating >= 8 ? 'Excellent' : 'Good'}</span>
            </div>
            </div>
          </div>

        {/* Edit Modal */}
        {modal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setmodal(false)}>
            <div className="bg-white p-8 rounded-lg shadow-lg items-center text-center" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4 text-black">Edit Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700">Parent's Email</label>
                  <input type="email" id="parentEmail" name="parentEmail" value={astudent.parentEmail} onChange={(e) => setastudent({ ...astudent, parentEmail: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="parentPhoneNumber" className="block text-sm font-medium text-gray-700">Parent's Phone Number</label>
                  <input type="tel" id="parentPhoneNumber" name="parentPhoneNumber" value={astudent.parentPhoneNumber} onChange={(e) => setastudent({ ...astudent, parentPhoneNumber: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="backlogs" className="block text-sm font-medium text-gray-700">Backlogs</label>
                  <input type="number" id="backlogs" name="backlogs" value={astudent.backlogs} onChange={(e) => setastudent({ ...astudent, backlogs: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="classX" className="block text-sm font-medium text-gray-700">Class X Marks</label>
                  <input type="number" id="classX" name="classX" value={astudent.classX} onChange={(e) => setastudent({ ...astudent, classX: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="classXII" className="block text-sm font-medium text-gray-700">Class XII Marks</label>
                  <input type="number" id="classXII" name="classXII" value={astudent.classXII} onChange={(e) => setastudent({ ...astudent, classXII: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="gratution" className="block text-sm font-medium text-gray-700">Graduation Marks</label>
                  <input type="number" id="gratution" name="gratution" value={astudent.gratution} onChange={(e) => setastudent({ ...astudent, gratution: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="familyincome" className="block text-sm font-medium text-gray-700">Family Income</label>
                  <input type="number" id="familyincome" name="familyincome" value={astudent.familyincome} onChange={(e) => setastudent({ ...astudent, familyincome: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
              <div className='space-x-12'>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleupdate}>Update</button>
              <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md" onClick={() => setmodal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}


          {/* Attendance and Academic Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Attendance</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Academic Performance</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={marksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="marks" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-white shadow-lg rounded-lg mb-8 p-4">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setCurrentSection('current')}
              className={`px-4 py-2 rounded-l-md ${currentSection === 'current' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Current Courses
            </button>
            <button
              onClick={() => setCurrentSection('available')}
              className={`px-4 py-2 rounded-r-md ${currentSection === 'available' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Available Courses
            </button>
          </div>
          {currentSection === 'current' && (
            <div>
              <h3 className="text-xl font-semibold mb-4  text-black">Current Courses</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                  <span className="font-medium">Advanced Algorithms</span>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-4 py-1 rounded-md">Pursuing</button>
                  </div>
                </li>
                <li className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                  <span className="font-medium">Database Management</span>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-4 py-1 rounded-md">Pursuing</button>
                  </div>
                </li>
                {/* Add more courses as needed */}
              </ul>
            </div>
          )}
          {currentSection === 'available' && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-black">Available Courses</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                  <span>Artificial Intelligence</span>
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md">Enroll</button>
                  </div>
                </li>
                <li className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                  <span>Cloud Computing</span>
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md">Enroll</button>
                  </div>
                </li>
                {/* Add more available courses as needed */}
              </ul>
            </div>
          )}
        </div>

        {/* Scholarships Availed Section */}
        <div className="bg-white shadow-lg rounded-lg mb-8 p-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Scholarships Availed</h2>
          <div className="bg-gray-100 p-4 h-[200px] overflow-y-auto">
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="font-medium">Merit Scholarship</span>
                <span className="bg-green-500 text-white px-2 py-1 rounded">$5,000</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">STEM Excellence Award</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded">$3,000</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Need-based Grant</span>
                <span className="bg-purple-500 text-white px-2 py-1 rounded">$2,500</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Leadership Scholarship</span>
                <span className="bg-yellow-500 text-white px-2 py-1 rounded">$1,500</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-green-500 text-white p-4 rounded-md flex items-center justify-center cursor-pointer" onClick={() => setIsQuizModalOpen(true)}>
            Play Some Quizzes
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-md flex items-center justify-center cursor-pointer" onClick={() => setIsCommunityModalOpen(true)}>
            Go to Community Hub
          </div>

          <button className="bg-purple-500 text-white px-4 py-2 rounded-md">Apply for Scholarships</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">Report an Issue</button>
        </div>

        {/* Modals */}
        {isQuizModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsQuizModalOpen(false)}>
            <div className="bg-white p-8 rounded-lg shadow-lg items-center text-center" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4 text-black">Play Some Quizzes</h2>
              <img src="/Untitled1.png" className='h-48 w-48' alt="" />
              <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded" onClick={() => setIsQuizModalOpen(false)}>Close</button>
            </div>
          </div>
        )}

        {isCommunityModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsCommunityModalOpen(false)}>
            <div className="bg-white p-8 rounded-lg shadow-lg  items-center text-center" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4 text-black" >Go to Community Hub</h2>
              <img src="/Untitled1.png" className='h-48 w-48' alt="" />
              <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded" onClick={() => setIsCommunityModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
