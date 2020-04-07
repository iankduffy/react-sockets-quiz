import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from "socket.io-client";

let socket;

const Quiz = ({ location }) => {
  const [userName, setUserName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [users, setUsers] = useState([]);
  const [currentQuestion, setQuestion] = useState('')

  const ENDPOINT = 'https://remote-quiz-server.herokuapp.com/'

  const { name, room } = queryString.parse(location.search);
  console.log(name, room)

  useEffect(() => {
    socket = io(ENDPOINT);

    setUserName(name)
    setRoomCode(room)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

    socket.on('getQuestion', (question) => {
      console.log("here")
      setQuestion(question);
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [])

  const getQuestion = () => {
    socket.emit('getQuestion', (error) => {
      if(error) {
        alert(error);
      }
    });
  }

  return(
    <div>
      <h1>Quiz</h1>
      {users.map((user, key) => <p>{user.name}</p>)}
      <button onClick={() => getQuestion()}>Get Question</button>
      {currentQuestion.question}
      {console.log(currentQuestion)}

    </div>
  )
}

export default Quiz