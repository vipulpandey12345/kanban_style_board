import React from 'react';
import { IoPencil } from 'react-icons/io5';
import { CgMathPlus, CgMathMinus } from 'react-icons/cg';
import { Droppable } from 'react-beautiful-dnd'; 
import Card from './Card';
import '../styles/column.css';

const Column = ({ column, removeColumn }) => {

  const onClick = () => {



  };

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

      {/* Use Droppable to make the column a droppable area */}
      <Droppable droppableId={column.id.toString()}>
        {(provided) => (
          <div
            className="tasks-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.tasks.length > 0 ? (
              column.tasks.map((task, index) => (
                <Card 
                  key={task.id} 
                  cardId={task.id} 
                  index={index}
                  content={task.content}
                />
              ))
            ) : (
              <p>No tasks available in this column.</p>
            )}
            {provided.placeholder} {/* This is required for proper rendering */}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;

