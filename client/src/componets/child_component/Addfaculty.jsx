import React, { useState } from "react";

const AddFaculty = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [faculty, setFaculty] = useState({
    teacherId: "",
    name: "",
    coursename: "",
    collegeOrSchoolName: "",
    email: "",
    collegeId: "",
  });

  const handleFacultyChange = (field, value) => {
    setFaculty({
      ...faculty,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_URL}/api/college/add-teacher`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('uid')}`
      },
      body: JSON.stringify(faculty)
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      setFaculty({
        teacherId: "",
        name: "",
        coursename: "",
        collegeOrSchoolName: "",
        email: "",
        collegeId: "",
      });
      alert("success");
      window.location.reload();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col space-y-5">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-2 bg-green-400 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 w-fit"
        >
          ➕ Add Teacher
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 overflow-auto h-[40rem]">
            <h2 className="text-2xl mb-4 text-black">Add Faculty</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 border-t pt-4">
                <h3 className="text-xl mb-2 text-black">Faculty Details</h3>
                <div className="mb-2">
                  <label className="block text-gray-700">Teacher ID</label>
                  <input
                    type="text"
                    value={faculty.teacherId}
                    onChange={(e) =>
                      handleFacultyChange("teacherId", e.target.value)
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Teacher Name</label>
                  <input
                    type="text"
                    value={faculty.name}
                    onChange={(e) =>
                      handleFacultyChange("name", e.target.value)
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Course Name</label>
                  <input
                    type="text"
                    value={faculty.coursename}
                    onChange={(e) =>
                      handleFacultyChange("coursename", e.target.value)
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">
                    College/School Name
                  </label>
                  <input
                    type="text"
                    value={faculty.collegeOrSchoolName}
                    onChange={(e) =>
                      handleFacultyChange("collegeOrSchoolName", e.target.value)
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={faculty.email}
                    onChange={(e) =>
                      handleFacultyChange("email", e.target.value)
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">College ID</label>
                  <input
                    type="text"
                    value={faculty.collegeId}
                    onChange={(e) =>
                      handleFacultyChange("collegeId", e.target.value)
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    required
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

export default AddFaculty;
