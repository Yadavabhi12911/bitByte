import jwt from "jsonwebtoken"

const generateToken = async function (id, tokenVersion) {
    
let token = await jwt.sign({
    _id:id,
    tokenVersion,  
},
process.env.SECRET_TOKEN,
{
    expiresIn:"1d"
}
)

return token
}

export default generateToken