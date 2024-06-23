import React from 'react';

export const CreateCardForm = () => {
    return (
        <div>
            <div className='row'>  
                <div className='col'>
                    <label htmlFor='card-name'>Card Name: </label>
                    <input id='card-name' type="text" />
                </div>          
                <div className='col'>
                    <label htmlFor='card-cost'>Card Cost: </label>
                    <input id='card-cost' type="number" min={0} />
                </div>
            </div>
        </div>
    );
}