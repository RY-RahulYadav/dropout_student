import { useEffect } from "react"
// import Chatbot from "./chatbot"
import Footer from "./child_component/footer"
import Header from "./child_component/header"
import Section1 from "./child_component/section1"
import Section2 from "./child_component/section2"
import Section3 from "./child_component/section3"
import Section4 from "./child_component/section4"
import Section5 from "./child_component/section5"


function Home(props){
    
    return(
        <div>
           <Header data ={props?.data}/>
           <div className="section1"><Section1/></div>
           <div className="section2"> <Section2/></div>
           <div className="section3"> <Section3/></div>
           <div className="section4 "> <Section4/></div>
           <div className="section5"> <Section5/></div>
           <div className="footer"><Footer/></div>
       
        </div>
    )
}

export default Home




















{/* <div className="sticky" style={{position:"sticky" , zIndex:"10000"}}><Chatbot/></div> */}