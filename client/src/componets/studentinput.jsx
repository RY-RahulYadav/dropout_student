import * as React from "react";

export default function StudentForm() {
  const genders = ["Male", "Female", "Other"];
  const courses = [
    "B.Tech in Computer Science",
    "B.Tech in Electrical Engineering",
    "B.Tech in Mechanical Engineering",
    "B.Sc in Physics",
    "B.Sc in Chemistry",
    "B.A. in English Literature",
    "B.A. in History",
    "B.Com in Accounting",
    "BBA in Marketing",
    "B.Arch in Architecture",
  ];
  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+86", country: "China" },
    { code: "+81", country: "Japan" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+61", country: "Australia" },
    { code: "+7", country: "Russia" },
    { code: "+55", country: "Brazil" },
  ];

  const universities = [
    "University of Delhi",
    "IIT Delhi",
    "IIT Bombay",
    "Anna University",
    "JNU",
    "BITS Pilani",
  ];

  const colleges = [
    "Miranda House",
    "St. Stephen's College",
    "IIT Delhi College of Engineering",
    "IIT Bombay College of Engineering",
    "Sri Venkateswara College",
    "Hansraj College",
  ];

  const healthOptions = ["Yes", "No"];

  return (
    <div className="flex h-screen bg-gray-100">
    
      <div className="flex-1 flex flex-col  overflow-x-hidden overflow-y-auto mb-4">
        <div className="p-6 space-y-8 bg-gray-400 rounded-lg shadow-xl w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
              Student Details Form
            </h1>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg shadow">
              Edit Details
            </button>
          </div>

          <form className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-white">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    placeholder="Enter full name"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="enrollmentNumber" className="text-white">
                    Enrollment Number
                  </label>
                  <input
                    id="enrollmentNumber"
                    placeholder="Enter enrollment number"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="gender" className="text-white">
                    Gender
                  </label>
                  <select
                    id="gender"
                    required
                    className="w-full p-2 border rounded bg-white"
                  >
                    <option value="">Select gender</option>
                    {genders.map((gender, index) => (
                      <option key={index} value={gender.toLowerCase()}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="course" className="text-white">
                    Course
                  </label>
                  <select
                    id="course"
                    required
                    className="w-full p-2 border rounded bg-white"
                  >
                    <option value="">Select course</option>
                    {courses.map((course, index) => (
                      <option
                        key={index}
                        value={course.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="studentEmail" className="text-white">
                    Student Email
                  </label>
                  <input
                    id="studentEmail"
                    type="email"
                    placeholder="student@example.com"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="studentPhone" className="text-white">
                    Student Phone
                  </label>
                  <div className="flex">
                    <select
                      required
                      className="w-[110px] p-2 border rounded bg-white"
                    >
                      <option value="">Code</option>
                      {countryCodes.map((item, index) => (
                        <option key={index} value={item.code}>
                          {item.code} ({item.country})
                        </option>
                      ))}
                    </select>
                    <input
                      id="studentPhone"
                      type="tel"
                      placeholder="Enter phone number"
                      className="flex-1 ml-2 p-2 border rounded"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="parentEmail" className="text-white">
                    Parent's Email
                  </label>
                  <input
                    id="parentEmail"
                    type="email"
                    placeholder="parent@example.com"
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="parentPhone" className="text-white">
                    Parent's Phone
                  </label>
                  <div className="flex">
                    <select
                      required
                      className="w-[110px] p-2 border rounded bg-white"
                    >
                      <option value="">Code</option>
                      {countryCodes.map((item, index) => (
                        <option key={index} value={item.code}>
                          {item.code} ({item.country})
                        </option>
                      ))}
                    </select>
                    <input
                      id="parentPhone"
                      type="tel"
                      placeholder="Enter parent's phone number"
                      className="flex-1 ml-2 p-2 border rounded"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Health Information
              </h2>
              <div className="space-y-2">
                <label htmlFor="healthIssues" className="text-white">
                  Any Health Issues?
                </label>
                <select
                  id="healthIssues"
                  className="w-full p-2 border rounded bg-white"
                >
                  {healthOptions.map((option, index) => (
                    <option key={index} value={option.toLowerCase()}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="healthUpload" className="text-white">
                  Upload Health Documents (if any)
                </label>
                <input
                  id="healthUpload"
                  type="file"
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
            </div>

            {/* University and College Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Educational Information
              </h2>
              <div className="space-y-2">
                <label htmlFor="university" className="text-white">
                  University
                </label>
                <select
                  id="university"
                  required
                  className="w-full p-2 border rounded bg-white"
                >
                  <option value="">Select University</option>
                  {universities.map((university, index) => (
                    <option
                      key={index}
                      value={university.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {university}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="college" className="text-white">
                  College
                </label>
                <select
                  id="college"
                  required
                  className="w-full p-2 border rounded bg-white"
                >
                  <option value="">Select College</option>
                  {colleges.map((college, index) => (
                    <option
                      key={index}
                      value={college.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {college}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-white text-purple-600 rounded-lg shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
