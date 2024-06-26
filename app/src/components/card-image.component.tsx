import React from 'react';
import defaultCard from '../assets/default-card.png';

interface CardImageProps {
    cardName: string;
    cardCost: number;
    cardPower: number;
    cardCombo: number;
    cardEffect?: string;
    cardImage?: string;
}

// 860 x 1205
export const CardImage:React.FC<CardImageProps> = (props: CardImageProps) => {
    return (
        <div className='position-relative'>
            <img className='card-image' src={props.cardImage || defaultCard} alt={props.cardName} />

            <div className='card-top row card-text-container'>
                <div className='col-3'>
                    <span>{props.cardCost}</span>
                </div>

                <div className='col-9'>
                    <h2>{props.cardName}</h2>
                </div>
            </div>

            {props.cardEffect && (
                <div className='card-middle card-text-container'>
                    <p>{props.cardEffect}</p>
                </div>
            )}

            <div className='card-bottom card-text-container'>
                <span>Power: {props.cardPower}</span>
            </div>

        </div>
    );
}