import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import Board from './components/Board';
import BoardSelector from './components/BoardSelector';
import Card from './components/Card';
import Column from './components/Column';

function App() {
  const [boards, setBoards] = useState([
    { 
      id: 1, 
      name: 'Board1', 
      columns: [
        { id: 1, title: 'To Do', tasks: [] }, 
        { id: 2, title: 'In Progress', tasks: [] }
      ]
    },
    { 
      id: 2, 
      name: 'Board2', 
      columns: [
        { id: 1, title: 'To Do', tasks: [] }, 
        { id: 2, title: 'In Progress', tasks: [] }
      ] 
    }
  ]);

  const [currentBoardId, setCurrentBoard] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = currentBoard.columns.find(
      (col) => col.id === source.droppableId
    );
    const destColumn = currentBoard.columns.find(
      (col) => col.id === destination.droppableId
    );

    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
    destColumn.tasks.splice(destination.index, 0, movedTask);

    setBoards([...boards]);
  };

  const currentBoard = boards.find((board) => board.id === currentBoardId);

  const removeColumn = (id) => {
    const updatedBoards = [...boards];
    updatedBoards.forEach((board) => {
      if (board.id === currentBoardId) {
        board.columns = board.columns.filter((column) => column.id !== id);
      }
    });
    setBoards(updatedBoards);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1>Kanban Board</h1>

        {/* Board Selector */}
        <BoardSelector 
          boards={boards} 
          setCurrentBoard={setCurrentBoard} 
        />

        {/* Render Columns if currentBoard is selected */}
        {currentBoard && (
          <Board 
            board={currentBoard} 
            removeColumn={removeColumn}
          >
            {currentBoard.columns.map((column) => (
              <Column key={column.id} column={column} removeColumn={removeColumn} />
            ))}
          </Board>
        )}
        
        <Card />
      </div>
    </DragDropContext>
  );
}

export default App;
