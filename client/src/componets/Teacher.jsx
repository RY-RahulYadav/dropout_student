import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  FaEdit,
  FaUserGraduate,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdOutlineLink } from "react-icons/md";

import AddStudent from "./child_component/Addstudent";

// Mock data
const teacherData = {
  id: "T123",
  name: "Dr. Jane Smith",
  college: "Springfield University",
  email: "jane.smith@springfield.edu",
  phone: "+1 (555) 123-4567",
  address: "123 Education St, Springfield, IL",
  courseName: "Advanced Mathematics",
  qualification: "Ph.D. in Mathematics",
  experience: "10 years",
  avatar: "/placeholder.svg?height=128&width=128",
};

const studentsData = [
  {
    id: 1,
    name: "Tushar Jindal",
    performance: 85,
    gender: "Male",
    dropoutRisk: false,
    attendance: 95,
    backlog: 0,
    behaviour: 4,
  },
  {
    id: 2,
    name: "Priyanshu Tanwar",
    performance: 72,
    gender: "Male",
    dropoutRisk: true,
    attendance: 80,
    backlog: 2,
    behaviour: 3,
  },
  {
    id: 3,
    name: "Arjun Verma",
    performance: 90,
    gender: "Male",
    dropoutRisk: false,
    attendance: 98,
    backlog: 0,
    behaviour: 5,
  },
  {
    id: 4,
    name: "Neha Singh",
    performance: 68,
    gender: "Female",
    dropoutRisk: true,
    attendance: 75,
    backlog: 3,
    behaviour: 2,
  },
  {
    id: 5,
    name: "Vikram Iyer",
    performance: 78,
    gender: "Male",
    dropoutRisk: false,
    attendance: 88,
    backlog: 1,
    behaviour: 4,
  },
  {
    id: 6,
    name: "Priya Nair",
    performance: 82,
    gender: "Female",
    dropoutRisk: false,
    attendance: 92,
    backlog: 0,
    behaviour: 4,
  },
  {
    id: 7,
    name: "Ankit Patel",
    performance: 70,
    gender: "Male",
    dropoutRisk: true,
    attendance: 78,
    backlog: 2,
    behaviour: 3,
  },
  {
    id: 8,
    name: "Sneha Rao",
    performance: 88,
    gender: "Female",
    dropoutRisk: false,
    attendance: 96,
    backlog: 0,
    behaviour: 5,
  },
];


const genderData = [
  { name: "Male", value: 4 },
  { name: "Female", value: 4 },
];

const dropoutData = [
  { name: "Dropout", male: 3, female: 2 },
  { name: "Not Dropout", male: 5, female: 6 },
];

const performanceData = studentsData.map((student) => ({
  name: student.name,
  performance: student.performance,
}));

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function EnhancedTeacherDashboard(props) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [meetModel , setmeetModel ] = useState(false);
  const [sstudent , setsstudent] = useState(null)
  const [date , setdate] = useState("")

  useEffect(()=>{},[props])


  const handlePredictDropout = async() => {
    const response = await fetch(`${import.meta.env.VITE_URL}/api/teacher/predict`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('uid')}`
      }
  });
  console.log(response)
  if (response.ok) {
      alert('Success: Dropout risk predicted successfully.');
      window.location.reload();
  } else {
      alert('Error: Unable to predict dropout risk.');
  };

  };


  const handleMeetLink = async (studentemail , teacheremail , datetime) => {
    console.log(studentemail , teacheremail , datetime)
    try {
      // Send the POST request to the API
      const response = await fetch(`${import.meta.env.VITE_URL}/api/teacher/email-parent`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('uid')}`
          },
          body: JSON.stringify({
              teacheremail: teacheremail,
              studentemail: studentemail,
              meetingDateTime: "20/09/2024 07:30",
          }),
      });

      // Parse the response
      const data = await response.json();
      if (response.ok) {
          // Show success alert with Google Meet link\
          setmeetModel(false)
          alert(`Success: Email sent to parent.`);
          
      } else {
          // Show error alert
          alert(`Error: ${data.msg}`);
      }
  } catch (error) {
      // Show alert for server errors
      alert('Server Error: Unable to send email.');
      console.error('Error:', error);
  }
  };

  const onchange = (event) => {
    const { name, value } = event.target;
    setSelectedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const submitUpdate = async(student) => {
    const response = await fetch(`${import.meta.env.VITE_URL}/api/teacher/update-student/`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('uid')}`
      },
      body: JSON.stringify({
          studentemail: student.email,
          attendance: student.attendance,
          backlogs: student.backlog,
          behaviorRating: student.behaviour,
      }),
  });
  // show alert updated close the modal and reload the page
  if (response.ok) {
      setSelectedStudent(null);
      alert('Student details updated successfully.');
      window.location.reload();
  } else {
      alert('Error: Unable to update student details.');
  };
  }


  const handledate=(event)=>{
    const value = event.target.value
     setdate((prev=>setdate(value)))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-100 to-blue-200  overflow-x-hidden overflow-y-auto pb-24">
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-8 w-full ">
          {/* Teacher Card */}
          <div className="bg-white shadow-lg p-6 mb-8 rounded-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <img
                className="h-32 w-32 rounded-full"
                src={"https://cdn-icons-png.flaticon.com/512/9187/9187604.png"}
                alt={"error"}
              />
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-purple-700 mb-2">
                  {props?.data?.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FaUserGraduate className="inline mr-2" />
                    {props?.data?.collegeOrSchoolName}
                  </div>
                  <div>
                    <FaEnvelope className="inline mr-2" />
                    {props?.data?.email}
                  </div>
                  <div>
                    <FaPhone className="inline mr-2" />
                    {teacherData.phone}
                  </div>
                  <div>
                    <FaMapMarkerAlt className="inline mr-2" />
                    {teacherData.address}
                  </div>
                  <div>📖 {props?.data?.coursename}</div>
                  <div>🎓 {props?.data?.qualification}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Gender Ratio Pie Chart */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Gender Ratio
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Dropout Analysis Bar Chart */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-4">
                Dropout Analysis
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dropoutData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" fill="#8884d8" name="Male" />
                  <Bar dataKey="female" fill="#82ca9d" name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Line Chart */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                Student Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="performance"
                    stroke="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-indigo-600">
                Students List
              </h3>
              <div className="flex">
                <AddStudent />
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                  onClick={handlePredictDropout}
                >
                  ⚠️ Predict Dropout Risk
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Performance</th>
                    <th className="p-2 text-left">Gender</th>
                    <th className="p-2 text-left">Attendance</th>
                    <th className="p-2 text-left">Backlog</th>
                    <th className="p-2 text-left">Behaviour</th>
                    <th className="p-2 text-left">Update Details</th>
                    <th className="p-2 text-left">Meet</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.student && props?.data?.student.map((student) => (
                    <tr key={student.id} className="border-b">
                      <td className="p-2">
                        {student.name}{" "}
                        {student.chancedropout==1 && (
                          <span className="text-white ml-2 text-xs bg-red-600 p-1 rounded-2xl">
                            ⚠️ High Risk
                          </span>
                        )}
                      </td>
                      <td className="p-2">{student.gratution}%</td>
                      <td className="p-2">{student.gender}</td>
                      <td className="p-2">{student.attendance}%</td>
                      <td className="p-2">{student.backlogs}</td>
                      <td className="p-2">{student.behaviorRating}/5</td>
                      <td className="p-2">
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <FaEdit className="inline mr-2" /> Update
                        </button>
                      </td>
                      <td className="p-2">
                        <button
                          className="bg-purple-500 text-white py-1 px-3 rounded-lg hover:bg-purple-600"
                          onClick={() => {setmeetModel(true) ; setsstudent(student)}}
                        >
                          <MdOutlineLink className="inline mr-2" /> Meet
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for updating details */}
          {selectedStudent && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4 text-black">
                  Update Student Details
                </h2>
                {/* Form for updating details */}
                <div>
                  <label className="block text-gray-700">Attendance:</label>
                  <input
                    type="number"
                    name="attendance"
                    value={selectedStudent.attendance}
                    onChange={onchange}
                    className="w-full p-2 border rounded mb-4"
                  />
                  <label className="block text-gray-700">Backlog:</label>
                  <input
                    type="number"
                    name="backlog"
                    value={selectedStudent.backlog}
                    onChange={onchange}
                    className="w-full p-2 border rounded mb-4"
                  />
                  <label className="block text-gray-700">Behaviour Rating:</label>
                  <input
                    type="number"
                    name="behaviour"
                    value={selectedStudent.behaviour}
                    onChange={onchange}
                    className="w-full p-2 border rounded mb-4"
                  />
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mr-2"
                    onClick={() => submitUpdate(selectedStudent)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                    onClick={() => setSelectedStudent(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}


          
          {/* Modal for updating details */}
          {meetModel && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4 text-black">
                  Enter Meeting day , date and Meet
                </h2>
                {/* Form for updating details */}
                <div>
                  <label className="block text-gray-700">Enter Data and Time:</label>
                  <input onChange={(e)=>{handledate(e)}}
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="DD/MM/YYYY HH:MM"
                  />


                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mr-2" onClick={()=>{handleMeetLink(sstudent.email, props.data.email, date)}}>
                    Send Meet Link
                  </button>
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                    onClick={() => setmeetModel(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
