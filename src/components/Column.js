import React from 'react';
import { IoPencil } from 'react-icons/io5';
import { CgMathPlus, CgMathMinus } from 'react-icons/cg';
import Card from './Card';  // Import Card component
import '../styles/column.css';

const Column = ({ column, removeColumn }) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="icon-container">
          <CgMathPlus className="edit-icon" />
        </div>
        <h3>{column.title}</h3>

        {/* Icon to remove the column */}
        <div 
          className="icon-container" 
          onClick={() => removeColumn(column.id)}
        >
          <CgMathMinus />
        </div>
      </div>

      {/* Render tasks as cards */}
      <div className="tasks-container">
        {column.tasks.length > 0 ? (
          column.tasks.map((task, index) => (
            <Card 
              key={task.id} 
              cardId={task.id} 
              index={index} 
            />
          ))
        ) : (
          <p>No tasks available in this column.</p>
        )}
      </div>
    </div>
  );
};

export default Column;
