import { useNavigate } from "react-router-dom"

function SlideText(props){
    const naviagte = useNavigate()
    return(

        <div>
             <div className="slidePara">
                    <p className="para1 text-white-900 " style={{color:"white" , fontSize:"3.5rem"}}>{props.para1} </p>
                    <p className="para2" style={{color:"white"}}>{props.para2}</p>
                     
                   
                </div>
        </div>
    )
}
export default SlideText