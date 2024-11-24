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

    const currentBoard = boards.find((board) => board.id === currentBoardId);
    if (!currentBoard) {
      console.error("No board selected!");
      return;
    }

    const sourceColumn = currentBoard.columns.find((col) => col.id === source.droppableId);
    const destColumn = currentBoard.columns.find((col) => col.id === destination.droppableId);

    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
    destColumn.tasks.splice(destination.index, 0, movedTask);

    setBoards([...boards]);
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
            removeColumn={removeColumn} // Pass removeColumn function to Board
          />
        ) : (
          <p>Please select a board to view its columns.</p>
        )}
      </div>
    </DragDropContext>
  );
}

export default App;
