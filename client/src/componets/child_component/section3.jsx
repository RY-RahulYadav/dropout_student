import React from 'react';
import "../../styles/section3.css"


const Section3 = (props) => {
  

  return (
   <>
       <section className="about-style1">
            <div className="auto-container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-style1__content">
                            <div className="sec-title">
                                <div className="sub-title">
                                    {props.type&&<h6>About Leader</h6>}
                                </div>
                                <h2>Meet <span>Ideological</span> <br /> Leader for Youth <br />Generation</h2>
                            </div>
                            <div className="about-style1__content-text">
                                <p>Our AI-powered platform allows teachers and government officials to take swift action based on real-time dropout predictions. Instant analysis of student data helps in addressing key issues like attendance, behavior, and financial support, ensuring quick corrective measures and reduced dropout rates.</p>
                            </div>
                            <div className="about-style1__content-signature">
                                
                            </div>
                            <ul className="about-style1__content-list">
                                <li>
                                    <div className="icon-box">
                                        <span className="icon-check"></span>
                                    </div>
                                    <div className="text-box">
                                        <p>Real-time Dropout student monitoring</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon-box">
                                        <span className="icon-check"></span>
                                    </div>
                                    <div className="text-box">
                                        <p>Teacher and government dashboards for immediate intervention</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon-box">
                                        <span className="icon-check"></span>
                                    </div>
                                    <div className="text-box">
                                        <p>Automated alerts for students</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="about-style1__content-btn">
                                <a className="btn-one" >
                                    <span className="txt"style={{color:"black"}} >Report an Issues</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6">
                        <div className="about-style1__img">
                            <div className="shape1 float-bob-y">
                                <img src="https://mehedi.asiandevelopers.com/govarnex-demo/assets/images/shapes/thm-shape1.png" alt="shape" />
                            </div>
                            <div className="shape2 rotate-me">
                                <img src="https://mehedi.asiandevelopers.com/govarnex-demo/assets/images/shapes/thm-shape1.png" alt="shape" />
                            </div>
                            <div className="shape3"></div>
                            <div className="about-style1__img-inner">
                                <img src="section3.png" alt="leader" />
                            </div>
                            <div className="experience-box text-center">
                                <h2>
                                    <span className="odometer odometer-auto-theme" data-count="20">
                                        93+ 
                                    </span>
                                </h2>
                                <div className="title">
                                    <h3> Accuracy Of <br /> ML Model</h3>
                                </div>
                            </div>
                            <div className="about-style1__img-client-info " style={{position:"relative", top:"-1rem"}} >
                                <h3>Ministry of Education</h3>
                                <p>Goverment of India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section></>
  );
};

export default Section3;
