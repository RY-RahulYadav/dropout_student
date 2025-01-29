import React from 'react';
import "../../styles/aboutsection.css"
const AboutSection = (props) => {
  return (
    <div>
    <section className="breadcrumb-style1" style={{height:'18rem'}}>
      <div
        className="breadcrumb-style1__bg flex justify-center items-center"
        style={{ background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://static.vecteezy.com/system/resources/previews/025/119/288/large_2x/one-person-typing-on-laptop-in-dark-generated-by-ai-free-photo.jpg') center / cover" }}
      >
         <h2 className='text-white'>{props.title}</h2>
      </div>
     
      <div className="breadcrumb-style1__bottom" style={{marginTop:"4rem"}}>
        <div className="auto-container">
          <div className="row">
            <div className="col-xl-12">
              <div className="breadcrumb-style1__bottom-menu">
                <ul>
                  <li><a href="index.html">Home</a></li>
                  <li><i className="fa fa-angle-right" aria-hidden="true"></i></li>
                  <li>{props.title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </section>
  </div>
  
  );
};

export default AboutSection;
