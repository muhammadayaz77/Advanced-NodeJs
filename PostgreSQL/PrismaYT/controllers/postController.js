import prisma from '../db/db.config.js'


export const createPost = async (req,res) => {
  console.log("HI");
  const {user_id,title,description} = req.body;


 
  const newPost = await prisma.post.create({
    data : {
      user_id : Number(user_id),
      title,
      description
    }
  })
  return res.json({
    success : true,
    message : "User Created Successfully",
    data : newPost
  })
}



export const deletePost = async (req,res) => {
  const postId = req.params.id;
  console.log('post id ',postId)
  const deletePost = await prisma.post.delete({
    where : {id : Number(postId)}
  });
  return res.json({
    success : true,
    message : "User Deleted Successfully",
    data : deletePost
  })
}

export const readPost = async (req,res) => {
  const posts = await prisma.post.findMany({
    include : {
      comment : {
        include : {
          user : true
        }
      }
    }
  })
  return res.json({
    success : true, 
    data : posts
  })
}