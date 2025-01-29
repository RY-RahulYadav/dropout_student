import { useState, useEffect } from "react";

export default function CoursePage(props) {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    benefits: "",
    duration: "",
    startDate: "",
    image: "",
  });
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch courses from backend on load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/courses/allcourses");
        const data = await response.json();
        if (response.ok) {
          setCourses(data.courses);  // Populate courses from the backend
        } else {
          console.error(data.errors || "Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    const courseData = { ...newCourse };

    try {
      const response = await fetch("http://localhost:3000/api/courses/addcourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('uid')}`
        },
        body: JSON.stringify(courseData),
      });
      const data = await response.json();

      if (response.ok) {
        setCourses([...courses, data.course]);  // Add the new course to the list
        setNewCourse({
          title: "",
          description: "",
          benefits: "",
          duration: "",
          startDate: "",
          image: "",
        });
        setIsAddingCourse(false);
      } else {
        alert(data.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-100 to-blue-200 overflow-x-hidden overflow-y-auto pb-24">
        <div className="min-h-screen p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">Government-Sponsored Courses</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              >
                <img
                  src={course.image || "https://www.shutterstock.com/image-vector/3d-web-vector-illustrations-online-600nw-2152289507.jpg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-purple-700 mb-2">{course.title}</h2>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-2 text-black">{selectedCourse.title}</h2>
                <img src={selectedCourse.image} alt="" />
                <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Benefits:</span> {selectedCourse.benefits}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Duration:</span> {selectedCourse.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Start Date:</span> {selectedCourse.startDate}
                  </div>
                </div>
                <div className="flex space-x-4 items-center justify-center">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="mt-4 bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => alert(`Applied for ${selectedCourse.title}`)}
                    className="mt-4 bg-green-500 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {isAddingCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-black">Add New Course</h2>
                <div className="grid gap-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    placeholder="Description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Benefits"
                    value={newCourse.benefits}
                    onChange={(e) => setNewCourse({ ...newCourse, benefits: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="date"
                    value={newCourse.startDate}
                    onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newCourse.image}
                    onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingCourse(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCourse}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add Course
                  </button>
                </div>
              </div>
            </div>
          )}

          {(props.type === "govt" || props.type === "college") && (
            <div className="flex justify-center my-10">
              <button
                onClick={() => setIsAddingCourse(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors duration-300"
              >
                Add New Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
