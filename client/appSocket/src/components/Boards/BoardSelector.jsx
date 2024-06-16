import React, { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from '../HandleWebSocket/WebSocketContext';
import { ConfigureContext } from '../Context/ConfigureContext';
import './BoardSelector.css';

const BoardSelector = () => {
  const { socket, board } = useContext(WebSocketContext);
  const { setBoard, setFQBN } = useContext(ConfigureContext);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBoards = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('get-board');
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [socket]); 
  const handleBoardSelect = (boardName) => {
    setSelectedBoard(boardName);
    setBoard(boardName);
    setFQBN(board[boardName]);
  };

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase()
        ? <mark key={index}>{part}</mark>
        : part
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBoards = Object.entries(board).filter(([key, value]) =>
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="board-selector">
      <h5>Board: {selectedBoard}</h5>
      <input
        type="text"
        placeholder="Search boards"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {searchTerm === '' // Render all boards if search term is empty
          ? Object.keys(board).map((key) => (
              <li key={key} onClick={() => handleBoardSelect(key)}>
                {key}
              </li>
            ))
          : filteredBoards.map(([key, value]) => (
              <li key={key} onClick={() => handleBoardSelect(key)}>
                {highlightMatch(key, searchTerm)}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default BoardSelector;
