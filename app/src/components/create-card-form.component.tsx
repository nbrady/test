import React from 'react';

export const CreateCardForm = () => {
    return (
        <div>
            <label htmlFor='card-name'>Card Name: </label>
            <input id='card-name' type="text" />

            <label htmlFor='card-cost'>Card Cost</label>
            <input id='card-cost' type="number" />
        </div>
    );
}