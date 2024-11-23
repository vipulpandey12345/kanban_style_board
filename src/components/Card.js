import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../styles/card.css';

const Card = ({ cardId, index, content }) => {
  return (
    <Draggable draggableId={cardId.toString()} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h2 className="task">{content}</h2>
          <p className="Assigner">Assigner:</p>
          <p className="Assignee">Assignee:</p>
          <p className="Notes">Notes:</p>
          <p className="Due-Date">Due Date:</p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
