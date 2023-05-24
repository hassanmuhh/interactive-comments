import { FaPlus, FaReply, FaMinus, FaPen, FaTrash } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import classes from './Comment.module.css';
import Reply from '../Reply/Reply';
import Modal from '../Modal/Modal';
import AddCommentOrReply from '../AddComment/AddCommentOrReply';
import NewComment from '../NewComment/NewComment';

const Comment = ({
  content,
  createdAt,
  id,
  score,
  username,
  userImg,
  replies = false,
  replyingTo = false,
  currentUser,
  newComment
}) => {
  const [repliesList, setRepliesList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addReply, setAddReply] = useState(false);
  const [newReply, setNewReply] = useState([]);
  const [scoreNum, setScoreNum] = useState(score);
  const [turnToInput, setTurnToInput] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);
  const editCommentRef = useRef(null);

  const hasReplies = replies !== 'false' && replies.length > 0;

  useEffect(() => {
    if (hasReplies) {
      setRepliesList(replies);
    }
  }, [hasReplies, replies]);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const deleteCommentHandler = () => {
    setDeleteComment(true);
    setModalOpen(false);
  };

  const replyHandler = () => {
    setAddReply(!addReply);
  };

  const editHandler = () => {
    setTurnToInput(!turnToInput);
    editCommentRef.current.focus();
  };

  const sendNewReply = (state, ...data) => {
    if (state === true) {
      setNewReply(prevComments => [...prevComments, data]);
    }
  };

  return (
    <>
      {!deleteComment && (
        <div className={classes.commentWrapper}>
          <div className={!newComment ? classes.voteArea : `${classes.voteArea} ${classes.newComment}`}>
            <button className={classes.btn} onClick={() => setScoreNum(prev => prev + 1)}>
              <FaPlus />
            </button>
            <p>{scoreNum}</p>
            <button className={classes.btn} onClick={() => setScoreNum(prev => prev - 1)}>
              <FaMinus />
            </button>
          </div>

          <div className={classes.commentContent}>
            <div className={classes.commentHead}>
              <div className={classes.userInfo}>
                {userImg && <img className={classes.userImg} src={userImg.png} alt="user profile" />}
                <p className={classes.userName}>{username}</p>
                {currentUser && <p className={classes.you}>you</p>}
                <p className={classes.commentDate}>{createdAt}</p>
              </div>
              {!currentUser ? (
                <button title="reply" onClick={replyHandler} className={classes.replyBtn}>
                  <FaReply />
                  <span>Reply</span>
                </button>
              ) : (
                <div className={classes.currentUserBtns}>
                  <button onClick={openModalHandler} title="delete" className={classes.deleteBtn}>
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                  <button onClick={editHandler} title="edit" className={classes.editBtn}>
                    <FaPen />
                    <span>Edit</span>
                  </button>
                </div>
              )}
            </div>

            <div className={turnToInput ? classes.turnedInput : classes.commentText}>
              <p ref={editCommentRef} contentEditable={turnToInput}>
                {replyingTo && <span className={classes.replyingTo}>@{replyingTo}</span>} {content}
              </p>
              {turnToInput && <button className={classes.updateBtn}>update</button>}
            </div>
          </div>
        </div>
      )}

      {hasReplies && (
        <div className={classes.replyArea}>
          {repliesList.map(reply => (
            <Reply
              key={reply.id}
              id={reply.id}
              content={reply.content}
              replyingTo={reply.replyingTo}
              score={reply.score}
              userImg={reply.user.image}
              userName={reply.user.username}
              createdAt={reply.createdAt}
            />
          ))}
        </div>
      )}

      {newReply.length > 0 &&
        newReply.map((rep, idx) => (
          <NewComment key={idx} info={rep} replyTo={username} />
        ))}

      {addReply && <AddCommentOrReply type="reply" replyingTo={username} send={sendNewReply} />}
      <Modal isOpen={modalOpen} onClose={closeModalHandler} onDelete={deleteCommentHandler} id={id} />
    </>
  );
};

export default Comment;
