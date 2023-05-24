import formatCommentDate from "../../Helpers/formatCommentDate";
import Comment from "../Comment/Comment11";

const NewComment = ({ info, replyTo }) => {
  const createTime = formatCommentDate(new Date());
  const userName = info[0].username;
  const userImg = info[0].image;
  const score = 1;

  return (
    <>
      <Comment content={info[1]} createdAt={createTime} username={userName} score={score} userImg={userImg} currentUser='true' newComment='true' />
    </>
  )
}

export default NewComment