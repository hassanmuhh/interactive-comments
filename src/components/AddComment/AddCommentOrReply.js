import { useEffect, useRef, useState } from "react"
import { fetchCurrentUser } from "../../api/fetch-data"
import classes from './AddCommentOrReply.module.css'

const AddCommentOrReply = ({ type, replyingTo, send }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [componentType, setComponentType] = useState('Comment');
  const replyName = `@${replyingTo}, `;
  const [inputValue, setInputValue] = useState('');
  const [replyValue, setReplyValue] = useState('');
  const inputRef = useRef(null);
  const replyRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCurrentUser();
      setCurrentUser(data)
    }
    getData()

    if (type === 'reply') {
      setComponentType('Reply');
    }
  }, [type])


  const addHandler = () => {
    if (componentType === 'Comment') {

      if (inputValue.trim().length > 0) {
        console.log('there is content');
        send(true, currentUser, inputValue);
        inputRef.current.value = '';

      } else {
        throw new Error('Please enter a valid comment...');
      }

    } else {
      if (replyValue.trim().length > 0) {
        send(true, currentUser, replyValue, replyName)
        replyRef.current.value = '';

      } else {
        throw new Error('Please enter a valid Reply')
      }
    }

    console.log('comment:', inputValue);
  }


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleReplyChange = (event) => {
    setReplyValue(event.target.value)
  }


  return (
    <div className={componentType === 'Comment' ? classes.addCommentWrapper : classes.addReplyWrapper}>

      {componentType === 'Reply' && (
        <div className={classes.addReply}>
          {currentUser && currentUser.image &&
            <img className={classes.userImg} src={currentUser.image.png} alt="user profile" />}
          <textarea ref={replyRef} onChange={handleReplyChange} value={replyValue} title="Add Reply" placeholder="Add a Reply..." className={classes.textArea} />
          <button onClick={addHandler} className={classes.addBtn} title={componentType}>Reply</button>
        </div>
      )}
      {componentType === 'Comment' && (
        <>
          {currentUser && currentUser.image &&
            <img className={classes.userImg} src={currentUser.image.png} alt="user profile" />}
          <textarea ref={inputRef} onChange={handleInputChange} title="Add New Comment" placeholder="Add a Comment..." className={classes.textArea} />
          <button onClick={addHandler} className={classes.addBtn} title={componentType}>Send</button>
        </>
      )}
    </div>
  )
}

export default AddCommentOrReply