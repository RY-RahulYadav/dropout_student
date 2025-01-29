import React, { useEffect, useState } from 'react';
import { 
  Menu, Search, Grid, Bell, Settings, Package,
  Home, Layout, ChevronDown, User
} from 'react-feather';
import Govern from "./Govern"
import EnhancedStudentDashboard from './student';
import EnhancedTeacherDashboard from './Teacher';
import CollegeDashboard from './College';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CoursePage from './course';
import StudentForm from './studentinput';
import Scholarship from './Scholarship';
import AllStudent from './allStudent';
import Allteacher from './allteacher';

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);

const Input = ({ className, ...props }) => (
  <input className={`px-3 py-2 border rounded ${className}`} {...props} />
);

const Card = ({ children, className, ...props }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
    {children}
  </div>
);

export default function Dashboard(props){
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [layoutsExpanded, setLayoutsExpanded] = useState(true);

//   const [type, settype] = useState(true);
  
  useEffect(()=>{
    const pathname = window.location.pathname;

    if(pathname=="/student"||pathname=="/college"|| pathname=="/govt"|| pathname=="/teacher"){
        const navpath =`/${localStorage.getItem('type')}`

        if(navpath !== pathname){
            console.log(`/${props.type}`)
            navigate("/");
        }

    }
   
  },[props])
  const navigate = useNavigate() 


  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleLayouts = () => {
    setLayoutsExpanded(!layoutsExpanded);
  };

  function logout(){
    
      localStorage.clear()
      
      navigate('/')
    

  }
  

  return (
    <div className='flex h-screen' >
    <div className="flex   bg-gray-100 " >
      {/* Sidebar */}
      <aside className={`w-64 bg-blue-900 text-white-800 border-r transition-all duration-300 flex flex-col ${sidebarVisible ? '' : '-ml-64'}`} style={{overflowY:"hidden"}}>
        <div className="p-4 flex-grow">
          <h1 className="text-xl font-bold mb-6 text-white flex items-center">
           <div className='bg-white w-[2rem] h-[2rem] rounded-3xl mr-2 cursor-pointer' onClick={()=>{navigate('/')}}> <img className='w-[2rem] h-[2rem]' src="/final_logo.png" alt="" /></div>
            <span className='cursor-pointer' onClick={()=>{navigate('/')}}>Learn Again</span>
            <span className="text-xs bg-blue-500 text-white rounded px-1 ml-6">v1.2.0</span>
          </h1>
          <nav>
            <ul className="space-y-1">
              <li>
                <Button className="w-full justify-start text-white hover:text-blue-500 flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <Link to="/">Home</Link> 
                  <span className="ml-auto bg-white text-white text-xs rounded-full px-2">.</span>
                </Button>
              </li>
              <li>
                <Button className="w-full justify-start text-white hover:text-blue-500 flex items-center" onClick={toggleLayouts}>
                  <Layout className="mr-2 h-4 w-4" />
                  
                  {props.type=="student"&&<Link to={`/student`}>Dashboard</Link>}
                  {props.type=="teacher"&&<Link to={`/teacher`}>Dashboard</Link>}
                  {props.type=="college"&&<Link to={`/college`}>Dashboard</Link>}
                  {props.type=="govt"&&<Link to={`/govt`}>Dashboard</Link>}
                  <span className="ml-auto bg-white text-white text-xs rounded-full px-2">.</span>
                </Button>
                
              </li>
              {props.type!=="college"&&<li>
                <Button className="w-full justify-start text-white hover:text-blue-500 flex items-center" onClick={toggleLayouts}>
                  <Layout className="mr-2 h-4 w-4" />
                {props.type=="student" && <Link to={"/update-student"}>Update Details</Link>}
                {props.type=="teacher" && <Link to={"/allStudent"}>List of Student</Link>}
                {props.type=="govt" && <Link to={"/retrain"}>Retrain ML Model</Link>}
                  <span className="ml-auto bg-white text-white text-xs rounded-full px-2">.</span>
                </Button>
                
              </li>}
              {(props.type=="college" || props.type=="govt")&&<li>
                <Button className="w-full justify-start text-white hover:text-blue-500 flex items-center" onClick={toggleLayouts}>
                  <Layout className="mr-2 h-4 w-4" />
               <Link to={"/allstudent"}>List of  Student</Link>
                
                  <span className="ml-auto bg-white text-white text-xs rounded-full px-2">.</span>
                </Button>
                
              </li>}
              {(props.type=="college" || props.type=="govt")&&<li>
                <Button className="w-full justify-start text-white hover:text-blue-500 flex items-center" onClick={toggleLayouts}>
                  <Layout className="mr-2 h-4 w-4" />
               <Link to={"/allteacher"}>List of  Teacher</Link>
                
                  <span className="ml-auto bg-white text-white text-xs rounded-full px-2">.</span>
                </Button>
                
              </li>}
              <li>
                <Button className="w-full justify-start text-white hover:text-blue-500 flex items-center" onClick={toggleLayouts}>
                  <Layout className="mr-2 h-4 w-4" />
                  <Link to={"/course"}>{props.type=="student"?"Course":"Add Course"}</Link>
                  <span className="ml-auto bg-white text-white text-xs rounded-full px-2">.</span>
                 
                </Button>
                
              </li>
              <li>
                <Button className="w-full justify-start text-white hover:text-blue-500 flex items-center" onClick={toggleLayouts}>
                  <Layout className="mr-2 h-4 w-4" />
                  <Link to={"/scholarship"}>{props.type=="student"?"scholarship":"Add scholarship"}</Link>
                  <span className="ml-auto bg-white text-white text-xs rounded-full px-2">.</span>
                </Button>
                
              </li>
              <li>
                <Button className="w-full justify-start text-white hover:text-blue-500 flex items-center" onClick={toggleLayouts}>
                  <Layout className="mr-2 h-4 w-4" />
                  <Link to={"/event"}>Events</Link>
                  <span className="ml-auto bg-white text-white text-xs rounded-full px-2 w-[1rem]  ">.</span>
                </Button>
                
              </li>
             
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <User className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <p className="font-medium text-white">{props.data.name ? props.data.name:"Your Name"}</p>
            <p className="text-sm text-white" >Administrator</p>
          </div>
        </div>
      </aside>
      </div>

     
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button className="mr-4" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input type="search" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-md" />
              </div>
            </div>
            <div className="flex">
            
            <button type="button" class="flex justify-center items-center py-1 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <img className="w-[1.5rem] h-[1.5rem] mr-3" src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="" />
            <p style={{fontSize:'1.1rem'}}>{props.data.name ? props.data.name :"Your Name"}</p></button>
            <div>
            <button  onClick={logout} type="button" class="py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout</button>
            </div>
          </div>
          </div>
        </header>

        {/* Page content */}
        <div style={{overflowY:"scroll"}}>
        
        {(props.type=="govt" && props.page=="dashboard")&&<Govern type ={props.type} data={props?.data}/>}
        {(props.type=="college" && props.page=="dashboard")&&<CollegeDashboard type ={props.type} data={props?.data}/>}
        {(props.type=="teacher"&& props.page=="dashboard")&&<EnhancedTeacherDashboard type ={props.type} data={props?.data}/>}
        {(props.type=="student"&& props.page=="dashboard")&&<EnhancedStudentDashboard type ={props.type} data={props?.data}/>}
        {props.page=="course"&&<CoursePage  type ={props.type} data={props?.data}/>}
        {props.page=="scholarship"&&<Scholarship  type ={props.type} data={props?.data}/>}

        {props.page=="updatestudent"&&<StudentForm type ={props.type} data={props?.data}/>}
        {props.page=="allstudent"&&<AllStudent type ={props.type} data={props?.data}/>}
        {props.page=="allteacher"&&<Allteacher  type ={props.type} data={props?.data}/>}
        {props.page=="retrain"&&<AllStudent  Func="retrain" type ={props.type} data ={props?.data}/>}
        
        
    </div>
    </div>
    </div>
  );
}