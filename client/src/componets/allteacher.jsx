import { useEffect, useState } from "react";
import AddFaculty from "./child_component/Addfaculty";

  

function Allteacher(props){
  const teacherdata = props?.data.teacher
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
  useEffect(() => {console.log(props?.data)}, [teacherData ,teacherdata]);
    return(
        <div>
           <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <div className="container mx-auto px-6 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-amber-600 flex items-center p-2 rounded-xl ">
                    <span className="mr-2">👨‍🏫</span> Teacher Details
                  </h3>
                  {props.type=="college" && <AddFaculty/>}
                </div>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 text-left text-gray-500">
                          Name
                        </th>
                        <th className="py-2 px-4 text-left text-gray-500">
                          Email
                        </th>
                        <th className="py-2 px-4 text-left text-gray-500">
                          College Name
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
                      {teacherdata && teacherdata.map((teacher, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2 px-4">{teacher?.name}</td>
                          <td className="py-2 px-4">{teacher?.email}</td>
                          <td className="py-2 px-4">{teacher?.collegeOrSchoolName}</td>
                          <td className="py-2 px-4">{teacher?.qualification}</td>
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
               {/* modal for showing specific teacher details obtained after view more according to the above data and also make the modal box have bg-white*/}
        {modalOpen && teacherdata && (
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

        </div>
    )
}

export default Allteacher