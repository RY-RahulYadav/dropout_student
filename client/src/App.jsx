import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componets/home';
import Login from './componets/login';
import Register from './componets/regsiter';


import "./index.css"
import About from './componets/about';
import NoticesPage from './componets/notices';
import Event from './componets/events';
import ContactPage from './componets/contact';


import Dashboard from './componets/dashboard';
import Chatbot from './componets/chatbot';





function App() {

const [user , setuser]= useState({});
const [status , setstatus] = useState(false)
const [type , settype] = useState(null)

useEffect(()=>{
 async function datafetch(usertype , token){
    const response = await fetch(`${import.meta.env.VITE_URL}/api/${usertype}/get/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log(data);
      
      setuser(data)
    }
  }
  const token = localStorage.getItem('uid')
  const usertype= localStorage.getItem('type')
  if(token){
    
    setstatus(true)
    settype(usertype)
    datafetch(usertype , token)
  }
} , [])



 return (<>
<Router>
      <Routes>
       
        <Route path="/" element={<Home data={user}  type={type} status={status} />} />
        <Route path="/login" element={<Login data={user}  type={type} status={status} />} />
        <Route path="/register" element={<Register data={user}  type={type} status={status} />} />
        <Route path="/about" element={<About data={user}  type={type} status={status} />} />
        <Route path="/notice" element={<NoticesPage data={user}  type={type} status={status} />} />
        <Route path="/event" element={<Event data={user}  type={type} status={status} />} />
        <Route path="/contact" element={<ContactPage data={user}   type={type} status={status} />} />
        <Route path ="/teacher" element={<Dashboard data={user} type={type} page={"dashboard"}/>}/>
        <Route path ="/student" element={<Dashboard  data={user} type={type} page={"dashboard"}/>}/>
        <Route path ="/college" element={<Dashboard data={user}  type={type} page={"dashboard"}/>}/>
        <Route path ="/govt" element={<Dashboard data={user} type={type} page={"dashboard"} />}/>
        <Route path ="/course" element={<Dashboard data={user}  type={type} page={"course"}/>} />
        <Route path ="/update-student" element={<Dashboard data={user}  type={type} page={"updatestudent"}/>}/>
        <Route path ="/scholarship" element={<Dashboard  data={user} type={type} page={"scholarship"}/>}/>
        <Route path ="/allstudent" element={<Dashboard data={user}  type={type} page={"allstudent"}/>}/>
        <Route path ="/retrain" element={<Dashboard data={user}  type={"govt"} page={"retrain"}/>}/>
        <Route path ="/allteacher" element={<Dashboard data={user} type={type} page={"allteacher"}/>}/>
        <Route path ="/chatbot" element={<Chatbot/>}/>
        <Route path='*' element={<h1>Not Found Page</h1>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
