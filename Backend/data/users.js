import bcrpt from 'bcrypt'
const users=[
    {
    name:'Admin User',
    email:"admin@email.com",
    password:bcrpt.hashSync('1234567',10),
    isAdmin:true,
},
    {
    name:'john doe',
    email:"john@email.com",
    password:bcrpt.hashSync('1234567',10),
    isAdmin:false,
},
    {
    name:'jane doe',
    email:"jane@email.com",
    password:bcrpt.hashSync('1234567',10),
    isAdmin:false,
}
]
export default users;