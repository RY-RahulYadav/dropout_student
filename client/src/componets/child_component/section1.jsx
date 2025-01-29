import { useEffect } from "react"
import SlideText from "./slide";
import "../../styles/section1.css"

function  Section1(){
useEffect(()=>{
    var myIndex = 0;
    carousel();
    
    function carousel() {
      var i;
      var x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
      }
      myIndex++;
      if (myIndex > x.length) {myIndex = 1}    
      x[myIndex-1].style.display = "block";  
      setTimeout(carousel, 3000); // Change image every 2 seconds
    }
},[])
   const para2 = "Transform student futures with cutting-edge AI-driven dropout prediction tools and dynamic dashboards."

    return(
      
        <div className="fadediv"  style={{zIndex:"-1000"}}>
        <div className="w3-content w3-section" style={{zIndex:"-10"}} >
            <div className="mySlides" style={{background:  "linear-gradient(48deg, rgba(16,16,34,0.7492647058823529) 40%, rgba(239,239,250,0.17699579831932777) 97%) ,url(https://www.indianyouth.net/wp-content/uploads/2017/10/Youth-Indian-Government.jpg) no-repeat center center/cover" }} >
              <SlideText para1={"Empowering Education with AI Solutions"} para2={para2}/></div>
            
            <div className="mySlides" style={{background:  "linear-gradient(48deg, rgba(16,16,34,0.8492647058823529) 40%, rgba(239,239,250,0.17699579831932777) 97%) ,url(https://img.freepik.com/premium-photo/graduate-student-loan-icon-student-loan-graphics-education-financial-aid-assistance-government-loans_1029469-108829.jpg) no-repeat center center/cover" }}>
                  <SlideText para1={"Empowering Education with AI Solutions"} para2={para2}/></div>
                  <div className="mySlides" style={{background:  "linear-gradient(48deg, rgba(16,16,34,0.7492647058823529) 40%, rgba(239,239,250,0.17699579831932777) 97%) ,url(https://images.gizbot.com/te/img/2021/07/indiangovernment--1627708073.jpg) no-repeat center center/cover" }}>

<SlideText para1={"Empowering Education with AI Solutions"} para2={para2}/>

</div>
      </div>
      </div>
    )
}

export default Section1