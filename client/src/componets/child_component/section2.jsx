import "../../styles/section2.css"

function Section2(){
  return (
    <section className="features-style1">
        <div 
            className="shape1 wow slideInLeft animated" 
            data-wow-delay="100ms" 
            data-wow-duration="3500ms" 
            style={{visibility: 'visible', animationDuration: '3500ms', animationDelay: '100ms', animationName: 'slideInLeft'}}
        ></div>
        
        <div className="shape2">
            <img src="https://mehedi.asiandevelopers.com/govarnex-demo/assets/images/shapes/features-v1-shape1.png" alt="#" />
        </div>

        <div className="auto-container">
            <div className="features-style1__inner">
                <div className="row">
                    {/* Start Features Style1 Single */}
                    <div 
                        className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp animated" 
                        data-wow-delay="00ms" 
                        data-wow-duration="1500ms" 
                        style={{visibility: 'visible', animationDuration: '1500ms', animationDelay: '0ms', animationName: 'fadeInUp'}}
                    >
                        <div className="features-style1__single " style={{height:"21.5rem"}}>
                            <div className="circularbox">
                            <i class="fa-regular fa-star"></i>
                            </div>
                            <div className="features-style1__single-content">
                                <h3><a href="#">Student Dropout Prediction</a></h3>
                                <p>Leverage AI and ML models to predict dropout risks with over 94+% accuracy.</p>
                            </div>
                        </div>
                    </div>
                    {/* End Features Style1 Single */}

                    {/* Start Features Style1 Single */}
                    <div 
                        className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp animated" 
                        data-wow-delay="100ms" 
                        data-wow-duration="1500ms" 
                        style={{visibility: 'visible', animationDuration: '1500ms', animationDelay: '100ms', animationName: 'fadeInUp'}}
                    >
                        <div className="features-style1__single h-50">
                        <div className="circularbox">
                            <i class="fa-regular fa-star"></i>
                            </div>
                            <div className="features-style1__single-content">
                                <h3><a>Student Data Management</a></h3>
                                <p>Seamless management of student records, including attendance, grades, financial aid, and behavior ratings. </p>
                            </div>
                        </div>
                    </div>
                    {/* End Features Style1 Single */}

                    {/* Start Features Style1 Single */}
                    <div 
                        className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp animated " 
                        data-wow-delay="200ms" 
                        data-wow-duration="1500ms" 
                        style={{visibility: 'visible', animationDuration: '1500ms', animationDelay: '200ms', animationName: 'fadeInUp'}}
                    >
                        <div className="features-style1__single h-50">
                        <div className="circularbox">
                            <i class="fa-regular fa-star"></i>
                            </div>
                            <div className="features-style1__single-content">
                                <h3><a href="#">Scholarships and Courses: Easily accessible for students</a></h3>
                                <p>Provide targeted financial support through dynamic scholarship management.</p>
                            </div>
                        </div>
                    </div>
                    {/* End Features Style1 Single */}

                    {/* Start Features Style1 Single */}
                    <div 
                        className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp animated " 
                        data-wow-delay="300ms" 
                        data-wow-duration="1500ms" 
                        style={{visibility: 'visible', animationDuration: '1500ms', animationDelay: '300ms', animationName: 'fadeInUp'}}
                    >
                        <div className="features-style1__single ">
                        <div className="circularbox">
                            <i class="fa-regular fa-star"></i>
                            </div>
                            <div className="features-style1__single-content">
                                <h3><a href="#">Government and Teacher Dashboards</a></h3>
                                <p>Our AI-powered platform allows teachers and government officials to take swift action based on real-time dropout predictions. </p>
                            </div>
                        </div>
                    </div>
                    {/* End Features Style1 Single */}
                </div>
            </div>
        </div>
    </section>
);
}

export default Section2