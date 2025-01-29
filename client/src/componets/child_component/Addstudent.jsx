import React, { useState } from "react";

const AddStudent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState({
    studentId: "",
    name: "",
    collegeOrSchoolName: "",
    courseDuration: "",
    coursePursuing: "",
    email: "",
    attendance: "",
    behaviorRating: "",
    healthissue: "",
    previousFee: false,
    gender: "",
    studentPhoneNumber: "",
  });

  const handleStudentChange = (field, value) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_URL}/api/teacher/add-student`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('uid')}`
      },
      body: JSON.stringify(student)
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      setStudent({
        studentId: "",
        name: "",
        collegeOrSchoolName: "",
        courseDuration: "",
        coursePursuing: "",
        email: "",
        attendance: "",
        behaviorRating: "",
        healthissue: "",
        previousFee: false,
        gender: "",
        studentPhoneNumber: "",
      });
      alert("success");
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-5">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-2 w-fit"
        >
         ➕ Add Student
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 overflow-auto h-[40rem]">
            <h2 className="text-2xl mb-4 text-black">Add Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 border-t pt-4">
                <h3 className="text-xl mb-2 text-black">Student Details</h3>
                <div className="mb-2">
                  <label className="block text-gray-700">Student Name</label>
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => handleStudentChange("name", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Student ID</label>
                  <input
                    type="text"
                    value={student.studentId}
                    onChange={(e) => handleStudentChange("studentId", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">College/School Name</label>
                  <input
                    type="text"
                    value={student.collegeOrSchoolName}
                    onChange={(e) => handleStudentChange("collegeOrSchoolName", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Course Duration</label>
                  <input
                    type="number"
                    value={student.courseDuration}
                    onChange={(e) => handleStudentChange("courseDuration", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Course Pursuing</label>
                  <input
                    type="text"
                    value={student.coursePursuing}
                    onChange={(e) => handleStudentChange("coursePursuing", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={student.email}
                    onChange={(e) => handleStudentChange("email", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Attendance</label>
                  <input
                    type="number"
                    value={student.attendance}
                    onChange={(e) => handleStudentChange("attendance", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Behavior Rating</label>
                  <input
                    type="number"
                    value={student.behaviorRating}
                    onChange={(e) => handleStudentChange("behaviorRating", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Health Issue</label>
                  <input
                    type="text"
                    value={student.healthissue}
                    onChange={(e) => handleStudentChange("healthissue", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Previous Fee</label>
                  <input
                    type="checkbox"
                    checked={student.previousFee}
                    onChange={(e) => handleStudentChange("previousFee", e.target.checked)}
                    className="mt-2"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Gender</label>
                  <input
                    type="text"
                    value={student.gender}
                    onChange={(e) => handleStudentChange("gender", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Student Phone Number</label>
                  <input
                    type="text"
                    value={student.studentPhoneNumber}
                    onChange={(e) => handleStudentChange("studentPhoneNumber", e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end items-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                >
                  Save and Add Another
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
