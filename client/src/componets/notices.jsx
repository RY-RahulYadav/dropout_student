import React, { useState } from 'react';
import Header from './child_component/header';
import AboutSection from './child_component/about_section';
import Footer from './child_component/footer';

const initialNotices = [
  { 
    id: 1, 
    name: "Important Update", 
    description: "Please read this important update about our services.", 
    fileName: "update.pdf",
    pdfUrl: "/mock-pdf-1.pdf"
  },
  { 
    id: 2, 
    name: "Maintenance Schedule", 
    description: "Upcoming maintenance schedule for the next month.", 
    fileName: "maintenance.pdf",
    pdfUrl: "/mock-pdf-2.pdf"
  },
  { 
    id: 3, 
    name: "New Feature Announcement", 
    description: "We're excited to announce a new feature coming soon!", 
    fileName: "new-feature.pdf",
    pdfUrl: "/mock-pdf-3.pdf"
  },
];

export default function NoticesPage() {
  const [notices, setNotices] = useState(initialNotices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({ name: '', description: '', file: null });

  const handleAddNotice = (e) => {
    e.preventDefault();
    const notice = {
      id: Date.now(),
      name: newNotice.name,
      description: newNotice.description,
      fileName: newNotice.file ? newNotice.file.name : 'No file uploaded',
      pdfUrl: '/mock-pdf-new.pdf'  // In a real app, you'd generate a valid URL
    };
    setNotices([...notices, notice]);
    setNewNotice({ name: '', description: '', file: null });
    setIsModalOpen(false);
  };

  const handleDownload = (pdfUrl, fileName) => {
    console.log(`Downloading ${fileName} from ${pdfUrl}`);
    alert(`Downloading ${fileName}. In a real app, the file would start downloading now.`);
  };

  return (
    <>
    <Header/>
    <hr />
    <AboutSection title="Notices Section"/>

    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Notices</h1>
        
        <div className="space-y-6 mb-8">
          {notices.map((notice) => (
            <div key={notice.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{notice.name}</h2>
                <p className="text-gray-600 mb-4">{notice.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {notice.fileName}
                  </div>
                  <button 
                    onClick={() => handleDownload(notice.pdfUrl, notice.fileName)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Notice
          </button>
        </div>

     
      </div>
    </div>
    <div className="footer" style={{zIndex:"-1"}}><Footer/></div>
    {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add New Notice
                  </h3>
                  <form onSubmit={handleAddNotice} className="mt-4" >
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={newNotice.name}
                        onChange={(e) => setNewNotice({ ...newNotice, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={newNotice.description}
                        onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File (PDF)</label>
                      <input
                        type="file"
                        id="file"
                        name="file"
                        accept=".pdf"
                        onChange={(e) => setNewNotice({ ...newNotice, file: e.target.files ? e.target.files[0] : null })}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Notice
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
