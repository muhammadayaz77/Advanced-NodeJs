import prisma from '../db/db.config.js'


export const createUser = async (req,res) => {
  console.log("HI");
  const {name,email,password} = req.body;
  const findUser = await prisma.user.findUnique({
    where : {email : email}
  })
  if(findUser){
    return res.status(400).json({
      success : false,
      message : 'User already created'
    })
  }
  const newUser = await prisma.user.create({
    data : {
      name : name,
      email : email,
      password : password
    }
  })
  return res.json({
    success : true,
    message : "User Created Successfully",
    data : newUser
  })
}


export const updateUser = async (req,res) => {
  const {name,email} = req.body;
  const updatedUser = await prisma.user.update({
    where : {email : email},
    data : {
      name : name,
      email : email,
    }
  })
  return res.json({
    success : true,
    message : "User Created Successfully",
    data : updatedUser
  })
}

export const readData = async (req,res) => {
  const updatedUser = await prisma.user.findMany({
    include : {
      post : {
        select : {
          title : true,
          comment_count : true
        }
      }
    }
  })
  return res.json({
    success : true,
    message : "User Created Successfully",
    data : updatedUser
  })
}