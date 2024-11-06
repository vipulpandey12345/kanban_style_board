import React from 'react';
import Column from './Column';

const BoardSelector = ({ boards, setCurrentBoard }) => {
    const handleSelectChange = (e) => {
        const selectedId = Number(e.target.value)
        setCurrentBoard(selectedId);
    }
    return (
        <div className="board-selector">
        <h2>Select a workflow</h2>
        <select onChange = {handleSelectChange}>
        <option value="" disabled>
            Select a board
        </option>
        {boards && boards.length > 0 ? (
            boards.map((board) => (
                <option key={board.id} value={board.id}>
                    {board.name}
                </option>
            ))
        ) : (
            <option value="" disabled>No boards available.</option>
        )}
        </select>
        </div>
    );
};

export default BoardSelector;