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
            <img className='card-image' src={props.cardImage || defaultCard} alt={props.cardName} />

            <div className='card-top'>
                <div className='card-circle-container start-0'>
                    <h2>{props.cardCost}</h2>
                </div>

                <div className='card-rectangle-container end-0 text-center'>
                    <h2>{props.cardName}</h2>
                </div>
            </div>

            {props.cardEffect && (
                <div className='card-middle card-rectangle-container p-1'>
                    <h6>{props.cardEffect}</h6>
                </div>
            )}

            <div className='card-bottom'>
                {/* Use font awesome icons */}
                <div className='card-circle-container bottom-0 start-0'>
                    <h2>{props.cardPower}</h2>
                </div>
                <div className='card-circle-container bottom-0 end-0'>
                    <h2>{props.cardHealth}</h2>
                </div>
            </div>
        </div>
    );
}