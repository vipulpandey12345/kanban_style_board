import React from 'react';
import Column from './Column'; // Import Column component
import { DragDropContext } from 'react-beautiful-dnd';
import '../styles/board.css';

const Board = ({ board, removeColumn, addCard }) => {
  return (
    <div className="board">
      <h2>{board.name}</h2>
      <div className="columns-container">
        {/* Loop through the columns in the board */}
        {board.columns.map((column) => (
          <Column 
            key={column.id} 
            column={column} 
            removeColumn={removeColumn}
            addCard={addCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
