import bcrypt from 'bcryptjs'

const users =[
  {
    name : 'Admin User',
    email : "shivam",
    password : bcrypt.hashSync('123',10),
    isAdmin : "true"
  },
  {
    name : 'Normal User',
    email : "example",
    password : bcrypt.hashSync('123',10),
  },
  {
    name : 'koi User',
    email : "shvmkj",
    password : bcrypt.hashSync('123',10),
  },
]

export default users