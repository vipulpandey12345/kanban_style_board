import React from 'react';
import Column from './Column';  // Import Column component
import '../styles/board.css';

const Board = ({ board }) => {
  return (
    <div className="board">
      <h2>{board.name}</h2>
      <div className="columns-container">
        {board.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default Board;
