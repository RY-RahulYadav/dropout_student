const jwt = require('jsonwebtoken')
require('dotenv').config();


const fetchuser = (req,res,next)=>{
    try{
        const token = req.header("authorization").split(' ')[1]
        console.log(token);
        
        if(!token){
            return res.status(404).json({message:"token missing"})
        }
        const data = jwt.verify(token , process.env.JWT_KEY)
  console.log(data);
  
        if(data){
         
            req.user = data
            next()
         }
        
    }
    catch(err){
        res.status(404).json({message:"Token Invalid 0 " , err:err})
    }
}

module.exports = fetchuser;