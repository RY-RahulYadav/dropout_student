import { useState } from "react";

function AllStudent(props){
    const [filterType, setFilterType] = useState("");
    const [filter, setFilter] = useState("");
    let dropoutStudents = props.Func?props?.data.dropout:props?.data.student;
    
    const updateAndTrain = async () => {
      try {
        // Make a GET request to the Flask API endpoint
        const res = await fetch('http://localhost:5000/update_and_train', {
          method: 'GET',
        });
        
        // Parse the response JSON
        const data = await res.json();
  
        // Handle success response
        if (res.ok) {
          alert(data.message);
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        // Handle error (e.g., network issues)
        alert('Error: ' + error.message);
      }
    };
    
      
    
    return(
        <div className="">
 <div className="bg-white shadow-xl rounded-lg overflow-hidden mt-0 ">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-4">
            <h2 className="flex items-center">
              <span className="mr-2">📋</span> {props.Func=="retrain"?"Dropout Students": "All Student"}
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
            <div className="" style={{overflowY:'scroll' , height:"50vh"}}>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">College</th>
                  <th className="p-2 text-left">Course</th>
                  <th className="p-2 text-left">Gender</th>
                </tr>
              </thead>
              <tbody >
                {dropoutStudents && dropoutStudents.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.collegeOrSchoolName}</td>
                    <td className="p-2">{student.coursePursuing}</td>
                    <td className="p-2">{student.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table></div>
          </div>
        </div>
      {props.Func=="retrain"  &&<div className="flex justify-center space-x-4 mb-8 mt-10">
          <button
            onClick={updateAndTrain}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            🧠 Train AI Model
          </button>
        
        </div>}
      </div>
      
        
    )
}
export default AllStudent