import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import Board from './components/Board';
import BoardSelector from './components/BoardSelector';
import Card from './components/Card';

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
  }





  const currentBoard = boards.find((board) => board.id === currentBoardId);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <h1>Kanban Board</h1>
      {/* Pass props correctly */}
      <BoardSelector 
        boards={boards} 
        setCurrentBoard={setCurrentBoard} 
      />
      {currentBoard && <Board  boards={boards} board={currentBoard} />}
      <Card/>
      
    </div>

    </DragDropContext>
    
  );
}

export default App;
