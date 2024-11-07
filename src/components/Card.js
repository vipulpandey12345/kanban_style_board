import React from 'react';
import '../styles/card.css';

const Card = ({onSave}) => {
    return (
        <div className='card'>
            <h2 className='task'>
                Task:
            </h2>
            <p className='Assigner'>
                Assigner:
            </p>
            <p className='Assignee'>
                Assignee:
            </p>
            <p className='Notes'>
                Notes:
            </p>
            <p className='Due-Date'>
                Due-Date:
            </p>

        </div>
    );
 
};

export default Card;