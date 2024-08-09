import React from "react";
import { ICard } from "../types/card";

interface CardImageProps {
  card: ICard;
}

// 860 x 1205
export const CardImage: React.FC<CardImageProps> = (props: CardImageProps) => {
  let imageUrl = `${process.env.PUBLIC_URL}/cards/default-card.png`;
  if (props.card.image) {
    imageUrl = props.card.image;
  } 

  return (
    <div className="card-container position-relative">
      <img className="card-image" src={imageUrl} alt={props.card.name} />

      <div className="card-top">
        <div className="card-circle-container start-0">
          {props.card.cost}
        </div>

        <div className="card-rectangle-container end-0 text-center h-100">
          {props.card.name}
        </div>
      </div>

      {props.card.effect && (
        <div className="card-middle card-rectangle-container p-1">
          {props.card.effect}
        </div>
      )}

      <div className="card-bottom">
        {/* Use font awesome icons */}
        <div className="card-circle-container bottom-0 start-0">
          {props.card.power}
        </div>
        <div className="card-circle-container bottom-0 end-0">
          {props.card.health}
        </div>
      </div>
    </div>
  );
};
