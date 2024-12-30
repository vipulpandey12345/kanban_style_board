import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import Board from './components/Board';
import BoardSelector from './components/BoardSelector';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [boards, setBoards] = useState([
    { 
      id: 1, 
      name: 'Board1', 
      columns: [
        { 
          id: 1, 
          title: 'To Do', 
          tasks: [
            { id: uuidv4(), content: 'Task 1' },
            { id: uuidv4(), content: 'Task 2' }
          ]
        }, 
        { 
          id: 2, 
          title: 'In Progress', 
          tasks: [
            { id: uuidv4(), content: 'Task 3' },
            { id: uuidv4(), content: 'Task 4' }
          ]
        }
      ]
    },
    { 
      id: 2, 
      name: 'Board2', 
      columns: [
        { 
          id: 1, 
          title: 'To Do', 
          tasks: [
            { id: uuidv4(), content: 'Task 5' }
          ]
        }, 
        { 
          id: 2, 
          title: 'In Progress', 
          tasks: [
            { id: uuidv4(), content: 'Task 6' }
          ]
        }
      ] 
    }
  ]);

  const [currentBoardId, setCurrentBoard] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
  
    // Find the current board
    const boardIndex = boards.findIndex((board) => board.id === currentBoardId);
    if (boardIndex === -1) {
      console.error("No board selected!");
      return;
    }
  
    const currentBoard = boards[boardIndex];
  
    // Find source and destination columns
    const sourceColumnIndex = currentBoard.columns.findIndex(
      (col) => col.id === parseInt(source.droppableId)
    );
    const destColumnIndex = currentBoard.columns.findIndex(
      (col) => col.id === parseInt(destination.droppableId)
    );
  
    if (sourceColumnIndex === -1 || destColumnIndex === -1) {
      console.error("Source or destination column not found!");
      return;
    }
  
    const sourceColumn = currentBoard.columns[sourceColumnIndex];
    const destColumn = currentBoard.columns[destColumnIndex];
  
    // Create copies of tasks
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];
  
    // Remove the task from the source column
    const [movedTask] = sourceTasks.splice(source.index, 1);
  
    // Add the task to the destination column
    destTasks.splice(destination.index, 0, movedTask);
  
    // Update columns immutably
    const updatedSourceColumn = { ...sourceColumn, tasks: sourceTasks };
    const updatedDestColumn = { ...destColumn, tasks: destTasks };
  
    // Update board columns
    const updatedColumns = [...currentBoard.columns];
    updatedColumns[sourceColumnIndex] = updatedSourceColumn;
    updatedColumns[destColumnIndex] = updatedDestColumn;
  
    const updatedBoard = { ...currentBoard, columns: updatedColumns };
    const updatedBoards = [...boards];
    updatedBoards[boardIndex] = updatedBoard;
  
    // Set the updated boards
    setBoards(updatedBoards);
  };
  

  const removeColumn = (id) => {
    const updatedBoards = [...boards];
    updatedBoards.forEach((board) => {
      if (board.id === currentBoardId) {
        board.columns = board.columns.filter((column) => column.id !== id);
      }
    });
    setBoards(updatedBoards);
  };

  const addCard = (columnId, newTaskContent) => {
    const updatedBoards = [...boards];
    updatedBoards.forEach((board) => {
      if (board.id === currentBoardId){
        board.columns.forEach((column) => {
          if (column.id === columnId){
            column.tasks.push({ id: uuidv4(), content: newTaskContent });
            }
          }
        )
      }
    });
    setBoards(updatedBoards);
  };


  const currentBoard = boards.find((board) => board.id === currentBoardId);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1>Kanban Board</h1>

        {/* Board Selector */}
        <BoardSelector 
          boards={boards} 
          setCurrentBoard={setCurrentBoard} 
        />
        
        {/* Render Board if currentBoard is selected */}
        {currentBoard ? (
          <Board 
            board={currentBoard} 
            removeColumn={removeColumn}
            addCard={addCard}
          />
        ) : (
          <p>Please select a board to view its columns.</p>
        )}
      </div>
    </DragDropContext>
  );
}

export default App;
