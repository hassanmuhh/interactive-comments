import Comment from "../Comment/Comment"
import { useEffect, useState } from "react";
import { fetchComments } from "../../api/fetch-data";
import classes from './CommentsWrapper.module.css'
import AddCommentOrReply from "../AddComment/AddCommentOrReply";
import NewComment from "../NewComment/NewComment";

const CommentsWrapper = () => {
  const [commentsList, setCommentsList] = useState([]);
  const [newComment, setNewComment] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const data = await fetchComments();
      setCommentsList(data);
    }

    getData()
  }, [])

  const sendComment = (state, ...data) => {
    if (state === true) {
      setNewComment(prevComments => [...prevComments, data])
    }
  }

  return (
    <>
      <section className={classes.commentsWrapper}>
        {commentsList.map(com => {
          return <Comment key={com.id} content={com.content} createdAt={com.createdAt} score={com
            .score} username={com.user.username} replies={com.replies} userImg={com.user.image} />
        })}
      </section>
      {newComment.map((commentData, index) => (
        <NewComment key={index} info={commentData} />
      ))}
      <AddCommentOrReply type='comment' send={sendComment} />
    </>
  )
}

export default CommentsWrapper