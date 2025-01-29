import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import AddFaculty from "./child_component/Addfaculty";

const departmentData = [
  { name: "Computer Science", students: 500 },
  { name: "Electrical Engineering", students: 400 },
  { name: "Mechanical Engineering", students: 350 },
  { name: "Civil Engineering", students: 300 },
  { name: "Business Administration", students: 450 },
];

const dropoutData = [
  { year: "2018", rate: 2.5 },
  { year: "2019", rate: 2.3 },
  { year: "2020", rate: 2.1 },
  { year: "2021", rate: 1.9 },
  { year: "2022", rate: 1.7 },
];

const teacherDistributionData = [
  { name: "Male", value: 60 },
  { name: "Female", value: 35 },
  { name: "Other", value: 5 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];


export default function CollegeDashboard(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [teacherData, setTeacherData] = useState(null);

  const handleTeacherClick = async(teacherId) => {
    const response = await fetch(`http://localhost:3000/api/college/get-teacher/${teacherId}`, {
      method: 'GET', 
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('uid')}`
      }
    });

    const data = await response.json();
    // code to open teacher specific modal
    setModalOpen(true);
    setTeacherData(data);
  };


  return (
    <div className="flex h-screen bg-gray-100">
     
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-800">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 focus:outline-none md:hidden"
            >
              <span className="text-xl">&#9776;</span>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 ml-4">
              College Dashboard
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gray-200 p-2 rounded-full">
              <span className="text-gray-500">🔔</span>
            </button>
            <button className="bg-gray-200 p-2 rounded-full">Admin ▼</button>
          </div>
        </header>

        {/* modal for showing specific teacher details obtained after view more according to the above data and also make the modal box have bg-white*/}
        {modalOpen && teacherData && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white z p-6 rounded-lg shadow-lg w-1/2 ">
              <h2 className="text-2xl font-semibold mb-4">Teacher Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Name</h3>
                  <p>{teacherData.name}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">College or School Name</h3>
                  <p>{teacherData.collegeOrSchoolName}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Course</h3>
                  <p>{teacherData.coursename}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p>{teacherData.email}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Qualification</h3>
                  <p>{teacherData.qualification}</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}


        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm">College ID</h3>
                  <span>🏫</span>
                </div>
                <div className="text-2xl font-bold">{props.data.collegeId}</div>
                <p className="text-xs">Official Email: {props.data.email}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm">Department</h3>
                  <span>👨‍🏫</span>
                </div>
                <div className="text-2xl font-bold">5 Departments</div>
                <p className="text-xs">CS, EE, ME, CE, BA</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm">College Type</h3>
                  <span>📚</span>
                </div>
                <div className="text-2xl font-bold">{props?.data?.collegeType}</div>
                <p className="text-xs">Established in 1990</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 bg-purple-600 flex items-cente p-2 rounded-xl">
                  <span className="mr-2">📊</span> Department-wise Student
                  Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 bg-green-600 flex items-center p-2 rounded-xl">
                  <span className="mr-2">📉</span> Yearly Dropout Rate
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dropoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rate" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 bg-indigo-600 flex items-center p-2 rounded-xl">
                  <span className="mr-2">👩‍🏫</span> Teacher Gender Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={teacherDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {teacherDistributionData.map((entry, index) => (
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
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 bg-cyan-600 flex items-center p-2 rounded-xl">
                  <span className="mr-2">👨‍🏫</span> Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="text-blue-800 font-semibold">
                      Total Students
                    </h3>
                    <p className="text-lg font-bold  text-black">1500</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h3 className="text-green-800 font-semibold">
                      Courses Offered
                    </h3>
                    <p className="text-lg font-bold  text-black ">30+</p>
                  </div>
                  <div className="bg-orange-100 p-4 rounded-lg">
                    <h3 className="text-orange-800 font-semibold">Faculty</h3>
                    <p className="text-lg font-bold  text-black">100</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h3 className="text-purple-800 font-semibold">
                      Graduation Rate
                    </h3>
                    <p className="text-lg font-bold  text-black">95%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <div className="container mx-auto px-6 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-amber-600 flex items-center p-2 rounded-xl ">
                    <span className="mr-2">👨‍🏫</span> Teacher Details
                  </h3>
                  <AddFaculty/>
                </div>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 text-left text-gray-500">
                          Name
                        </th>
                        <th className="py-2 px-4 text-left text-gray-500">
                          Course
                        </th>
                        <th className="py-2 px-4 text-left text-gray-500">
                          Email
                        </th>
                        <th className="py-2 px-4 text-left text-gray-500">
                          Qualification
                        </th>
                        <th className="py-2 px-4 text-left text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.data.teacher && props?.data?.teacher.map((teacher, idx) => (
                        <tr key={idx} className="border-b"> 
                          <td className="py-2 px-4">{teacher.name}</td>
                          <td className="py-2 px-4">{teacher.coursename}</td>
                          <td className="py-2 px-4">{teacher.email}</td>
                          <td className="py-2 px-4">{teacher.qualification}</td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() => handleTeacherClick(teacher.teacherId)}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                              View Details      
                            </button> 
                          </td>
                        </tr>
                      ))}
                    </tbody> 
                  </table>
                </div>
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}
