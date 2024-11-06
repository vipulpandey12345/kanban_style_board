import React from 'react';
import '../styles/column.css';
import { IoPencil} from "react-icons/io5";
import { CgMathPlus } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";



const Column = ({ column }) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="icon-container">
            <CgMathPlus className="edit-icon" />
        </div>
        <h3>{column.title}</h3>
        <div className="icon-container">
            <CgMathMinus />
        </div>
      </div>

      <ul>
        {column.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
