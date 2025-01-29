import { useState } from "react";
import "../styles/contact.css"

import { useNavigate } from "react-router-dom";
import AboutSection from "./child_component/about_section";
import Header from "./child_component/header";
import Footer from "./child_component/footer";

function ContactPage() {
  const navigate = useNavigate()
  const [Details , setdetails] =useState({
    name:"",
    phoneNo:"",
    email:"",
    message:""
  })

  function handlechange(e){
    const name = e.target.name
    const inputdata=e.target.value
    setdetails((prev)=>{
      return {
        ...prev,
        [name]:inputdata
      }
    })
  }
  
 async function handlesubmit(event){
 
   event.preventDefault()
   console.log(Details)
   const data =  await  fetch("http://localhost:3000/api/send", {
    method: "POST",
    headers: {

      'Content-Type': 'application/json',
      
    },
    body:JSON.stringify(Details),
    credentials: 'include'
    
  }).then(resp => resp).then(data => {return (data) }).catch(error => {
    console.error('Error:', error);

 });
 if(data.status==200){
  alert("succesfully send message !")
  navigate("/")
  
 }
 else{
  alert("Server Error ! plz fill contact form again after sometime ")
 }
 }

  return (
    <>
   
    <Header/>
    <hr />
     <AboutSection title="Contact us"/>
     {/* <div className="Cparab">
      <h2>Contact Us</h2>
     
     </div> */}
     <div className="contactBox mt-10 ">
     <div class="container">
    <div class="content">
  
      <div class="left__content">
      
        <div class="info__contact">
          <i class="fa fa-map-marker-alt"></i>
          <h5 class="info__contact_title">Address</h5>
          <span class="info__contact_text">Surkhet, NP12</span>
          <span class="info__contact_text">Birendranagar 06</span>
        </div>
        
        <div class="info__contact">
          <i class="fa fa-phone-alt"></i>
          <h5 class="info__contact_title">Phone</h5>
          <span class="info__contact_text">+0098 9893 5647</span>
          <span class="info__contact_text">+0096 3434 5678</span>
        </div>
        

       
        <div class="info__contact">
          <i class="fa fa-envelope"></i>
          <h5 class="info__contact_title">Email</h5>
          <span class="info__contact_text">codinglab@gmail.com</span>
          <span class="info__contact_text">winbeta.com@gmail.com</span>
        </div>
        

      </div>
     

      
      <div class="right__content">
        <h4 class="right__content_title">Send us a message</h4>
        <p class="right__content_text">If you have any work from me or any types of quries related to my tutorial, you
          can send me message from here. It's my pleasure to help you.</p>

          <form   method="get" class="form" onSubmit={(e)=>{handlesubmit(e)}} >
            <input onChange={handlechange} type="text" class="input_box"  name="name" placeholder="Enter your name" value={Details.name}/>
            <input  onChange={handlechange} type="number" class="input_box" name="phoneNo" placeholder="Enter your contact number" value={Details.phoneNo}/>
            <input  onChange={handlechange} type="email" class="input_box" name="email" placeholder="Enter your email" value={Details.email}/>
            <textarea  onChange={handlechange} class="input_box textarea_box"  name="message" placeholder="Enter your message" style={{paddingTop:"1rem"}} value={Details.message}></textarea>
            <button type="submit" class="form-btn">Send Now</button>
          </form>

      </div>
    

    </div>
  </div></div>
    <div className="mapbox"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d66299.87465470644!2d77.03207269829456!3d28.67025035665017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d047309fff32f%3A0xfc5606ed1b5d46c3!2sDelhi!5e0!3m2!1sen!2sin!4v1700774455950!5m2!1sen!2sin" width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    <div className="footer"><Footer/></div>
    </>
  );
}

export default ContactPage;