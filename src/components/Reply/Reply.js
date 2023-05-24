import { useEffect, useState } from 'react'
import { fetchCurrentUser } from '../../api/fetch-data'

import Comment from '../Comment/Comment11'

const Reply = ({ content, createdAt, id, replyingTo, score, userImg, userName }) => {
  const [currentUser, setCurrentUser] = useState([])
  const [areYouCurrentUser, setAreYouCurrentUser] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCurrentUser();
      setCurrentUser(data)
    }

    getData()

    if (currentUser.username === userName) {
      console.log('Matched');
      setAreYouCurrentUser(prev => !prev);
    }
  }, [currentUser.username, userName])


  return (
    <>
      <Comment content={content} createdAt={createdAt} id={id} score={score} userImg={userImg} username={userName} replyingTo={replyingTo} replies='false' currentUser={areYouCurrentUser} />
    </>
  )
}

export default Reply