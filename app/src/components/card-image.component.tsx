import React from 'react';
import defaultCard from '../assets/default-card.png';

interface CardImageProps {
    cardName?: string;
    cardCost?: number;
    cardPower?: number;
    cardHealth?: number;
    cardEffect?: string;
    cardImage?: string;
}

// 860 x 1205
export const CardImage:React.FC<CardImageProps> = (props: CardImageProps) => {
    return (
        <div className='position-relative'>
            {/* TODO: Rounded corner */}
            <img className='card-image' src={props.cardImage || defaultCard} alt={props.cardName} />

            <div className='card-top'>
                <div className='card-cost-container'>
                    <h2>{props.cardCost}</h2>
                </div>

                <div className='card-name-container'>
                    <h2>{props.cardName}</h2>
                </div>
            </div>

            {props.cardEffect && (
                <div className='card-middle card-text-container'>
                    <p>{props.cardEffect}</p>
                </div>
            )}

            <div className='card-bottom card-text-container'>
                <div>Power: {props.cardPower}</div>
                <div>Health: {props.cardHealth}</div>
            </div>

        </div>
    );
}