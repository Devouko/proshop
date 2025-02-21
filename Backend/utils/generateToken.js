import jwt from 'jsonwebtoken'

const generateToken=(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '30days'
    })
//set JWT as HTTP only cookie
res.cookie('jwt',token,{
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict', //prevents cross -site scripting
    maxAge: 30*24*60*60*1000 // 30days 
})

}
export default generateToken