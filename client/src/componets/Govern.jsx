import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart as RechartsePieChart, Pie, Cell } from "recharts";


export default function Dashboard(props) {
  const [showCauses, setShowCauses] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("");

  function count_college(data){
    const uniqueColleges = new Set(data?.map((teacher) => teacher.collegeOrSchoolName));

// Count of unique colleges
    const uniqueCollegeCount = uniqueColleges?.size;

    return uniqueCollegeCount?uniqueCollegeCount:0
  }

  // Mock data
  const stats = {
    colleges: count_college(props?.data.teacher),
    teachers: props?.data?.teacher?.length?props?.data?.teacher?.length:0,
    students: props?.data?.student?.length?props?.data?.student?.length:0,
    dropouts: props?.data?.dropout?.length?props?.data?.dropout?.length:0,
  };

  const dropoutStudents=[]

  const dropoutCauses = [
    { cause: "Financial Issues", value: 35 },
    { cause: "Academic Difficulties", value: 25 },
    { cause: "Personal Reasons", value: 20 },
    { cause: "Career Change", value: 15 },
    { cause: "Other", value: 5 },
  ];

  const dropoutTrends = [
    { year: 2018, dropouts: 1200 },
    { year: 2019, dropouts: 1350 },
    { year: 2020, dropouts: 1500 },
    { year: 2021, dropouts: 1400 },
    { year: 2022, dropouts: 1500 },
  ];

  const completionRates = [
    { course: "Computer Science", rate: 85 },
    { course: "Engineering", rate: 80 },
    { course: "Mathematics", rate: 75 },
    { course: "Physics", rate: 78 },
  ];

  const quickFacts = [
    { title: "Avg. Dropout Age", value: "20 years" },
    { title: "Most Affected Course", value: "Engineering" },
    { title: "Govt. Support Programs", value: "15" },
    { title: "Retention Improvement", value: "+5% YoY" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const states = Array.from(
    new Set(dropoutStudents.map((student) => student.state))
  );
  const courses = Array.from(
    new Set(dropoutStudents.map((student) => student.course))
  );
  const colleges = Array.from(
    new Set(dropoutStudents.map((student) => student.college))
  );

  const filteredDropouts = dropoutStudents.filter((student) => {
    if (filterType === "state" && filter) {
      return student.state.toLowerCase().includes(filter.toLowerCase());
    }
    if (filterType === "course" && filter) {
      return student.course.toLowerCase().includes(filter.toLowerCase());
    }
    if (filterType === "college" && filter) {
      return student.college.toLowerCase().includes(filter.toLowerCase());
    }
    return true;
  });

  const handleTrainModel = () => {
    // Placeholder for AI model training logic
    console.log("Training AI model...");
  };

  const handlePredictDropout = () => {
    // Placeholder for dropout prediction logic
    console.log("Predicting dropout causes...");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="flex-1 flex flex-col  overflow-x-hidden overflow-y-auto mb-4">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 w-full">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-indigo-900">
            Government Education Dashboard
          </h1>
          <p className="text-lg text-indigo-700">
            Empowering Education through Data and AI
          </p>
        </header>

        {/* AI Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={handleTrainModel}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            🧠 Train AI Model
          </button>
          <button
            onClick={handlePredictDropout}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            🎯 Predict Dropouts
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(stats).map(([key, value], index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-${
                key === "colleges"
                  ? "blue"
                  : key === "teachers"
                  ? "green"
                  : key === "students"
                  ? "yellow"
                  : "red"
              }-400 to-${
                key === "colleges"
                  ? "blue"
                  : key === "teachers"
                  ? "green"
                  : key === "students"
                  ? "yellow"
                  : "red"
              }-600 text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                </span>
                {key === "colleges" && <span className="text-xl">🏫</span>}
                {key === "teachers" && <span className="text-xl">👩‍🏫</span>}
                {key === "students" && <span className="text-xl">🎓</span>}
                {key === "dropouts" && <span className="text-xl">🚶‍♂️</span>}
              </div>
              <div className="text-2xl font-bold">{value}</div>
            </div>
          ))}
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4">
              <h2 className="flex items-center">
                <span className="mr-2">📈</span> Dropout Trends
              </h2>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dropoutTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="dropouts"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4">
              <h2 className="flex items-center">
                <span className="mr-2">📊</span> Dropout Causes
              </h2>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsePieChart>
                  <Pie
                    data={dropoutCauses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {dropoutCauses.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </RechartsePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Facts Carousel */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mt-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
            <h2 className="flex items-center">
              <span className="mr-2">🔍</span> Quick Facts
            </h2>
          </div>
          <div className="p-4">
            <div className="flex overflow-x-auto space-x-4">
              {quickFacts.map((fact, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-lg w-48"
                >
                  <div className="text-sm font-medium text-gray-700">
                    {fact.title}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filterable Table */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mt-8">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-4">
            <h2 className="flex items-center">
              <span className="mr-2">📋</span> Dropout Students
            </h2>
          </div>
          <div className="p-4">
            <div className="flex mb-4 space-x-4">
              <select
                className="p-2 border border-gray-300 rounded-lg w-[15vw]"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Find By Category</option>
                <option value="state">State</option>
                <option value="course">Course</option>
                <option value="college">College</option>
              </select>
              <input
                type="text"
                placeholder={`Filter by ${filterType} names, colleges or courses`}
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">College</th>
                  <th className="p-2 text-left">Gender</th>
                  <th className="p-2 text-left">Course</th>
                </tr>
              </thead>
              <tbody>
                {props?.data?.dropout && props?.data.dropout.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.collegeOrSchoolName}</td>
                    <td className="p-2">{student.gender}</td>
                    <td className="p-2">{student.coursePursuing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
