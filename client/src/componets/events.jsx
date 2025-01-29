import AboutSection from "./child_component/about_section";
import Footer from "./child_component/footer";
import Header from "./child_component/header";
import Section5 from "./child_component/section5";

function Event(){
    return(
        <div>
            <Header/>
            <AboutSection title="Event Section"/>
            <div className="section5"> <Section5/></div>
            <div className="footer"><Footer/></div>
        </div>
    )
}

export default Event