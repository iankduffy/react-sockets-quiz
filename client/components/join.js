import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Join = () => {
  const [userName, setUserName] = useState('')
  const [roomCode, setRoomCode] = useState('')

  return(
    <div>
      <h1>Join</h1>
      <input placeholder="username" type="text" onChange={(event) => setUserName(event.target.value)} />
      <input placeholder="roomCode" type="text" onChange={(event) => setRoomCode(event.target.value)} />
      <Link onClick={e => (!userName || !roomCode) ? e.preventDefault() : null} to={`/quiz?name=${userName}&room=${roomCode}`}>
        <button className={'button mt-20'} type="submit">Sign In</button>
      </Link>
    </div>
  )
}

export default Join