import React from 'react';
import defaultCard from '../assets/default-card.png';
import { ICard } from '../types/card';

interface CardImageProps {
    card: ICard;
}

// 860 x 1205
export const CardImage:React.FC<CardImageProps> = (props: CardImageProps) => {
    return (
        <div className='position-relative'>
            <img className='card-image' src={props.card.image || defaultCard} alt={props.card.name} />

            <div className='card-top'>
                <div className='card-circle-container start-0'>
                    <h2>{props.card.cost}</h2>
                </div>

                <div className='card-rectangle-container end-0 text-center'>
                    <h2>{props.card.name}</h2>
                </div>
            </div>

            {props.card.effect && (
                <div className='card-middle card-rectangle-container p-1'>
                    <h6>{props.card.effect}</h6>
                </div>
            )}

            <div className='card-bottom'>
                {/* Use font awesome icons */}
                <div className='card-circle-container bottom-0 start-0'>
                    <h2>{props.card.power}</h2>
                </div>
                <div className='card-circle-container bottom-0 end-0'>
                    <h2>{props.card.health}</h2>
                </div>
            </div>
        </div>
    );
}