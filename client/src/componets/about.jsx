import AboutSection from "./child_component/about_section";
import Footer from "./child_component/footer";
import Header from "./child_component/header";
import Section3 from "./child_component/section3";
import Section4 from "./child_component/section4";

function About(){
    return(
        <div>
            <Header/>
            <hr />
            <AboutSection title="About Us"/>
            <Section3 type={false}/>
            <Section4/>
           
            <div className="footer"><Footer/></div>
        </div>
    )
}

export default About