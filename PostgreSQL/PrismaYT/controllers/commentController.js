import prisma from '../db/db.config.js'


export const createComment = async (req,res) => {
  const {user_id,post_id,comment} = req.body;

  await prisma.post.update({
    where : {
      id : Number(post_id)
    },
    data : {
      comment_count : {
        increment : 1
      }
    }
  })

  const newComment = await prisma.comment.create({
    data : {
      user_id : Number(user_id),
      post_id : Number(post_id),
      comment
    }
  })
  return res.json({
    success : true,
    message : "Comment Created Successfully",
    data : newComment
  })
}



export const deletePost = async (req,res) => {
  const postId = req.params.id;
  console.log('post id ',postId)
  const deletePost = await prisma.comment.delete({
    where : {id : Number(postId)}
  });
  return res.json({
    success : true,
    message : "User Deleted Successfully",
    data : deletePost
  })
}

export const readComment = async (req,res) => {
  const comments = await prisma.comment.findMany({})
  return res.json({
    success : true, 
    data : comments
  })
}