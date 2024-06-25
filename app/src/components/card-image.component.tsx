import React from 'react';

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
            {/* TODO Add default image */}
            <img className='card-image' src={props.cardImage} alt={props.cardName} />

            <div className='card-effect'>
                <p>{props.cardName}</p>
                <p>{props.cardCost}</p>
                <p>{props.cardPower}</p>
                <p>{props.cardCombo}</p>
                <p>{props.cardEffect}</p>
            </div>
        </div>
    );
}