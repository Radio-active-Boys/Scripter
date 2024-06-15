// BoardSelector.jsx
import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from '../HandleWebSocket/WebSocketContext';
import './BoardSelector.css';

const BoardSelector = ({ onClose }) => {
  const { socket, board } = useContext(WebSocketContext);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const fetchBoards = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('get-board');
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleBoardSelect = (boardName) => {
    setSelectedBoard(boardName);
    console.log("Selected ", selectedBoard);
    // Optionally, you can inform parent component or perform any action here on board selection
  };

  return (
    <div className="board-selector">
      <h5>Board : {selectedBoard}</h5>
      <ul>
        {board &&
          board.map((boardName, index) => (
            <li key={index} onClick={() => handleBoardSelect(boardName)}>
              {boardName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BoardSelector;
