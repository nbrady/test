import React, { useEffect, useState } from "react";
import { ICard } from "../types/card";
import { retrieveImage } from "../services/image-database.service";

interface CardImageProps {
  card: ICard;
  imagePreview?: string;
}

// 860 x 1205
export const CardImage: React.FC<CardImageProps> = (props: CardImageProps) => {

  const [image, setImage] = useState<string>();;
  
  useEffect(() => {
    if (props.imagePreview) {
      setImage(props.imagePreview);
    } else {
      retrieveImage(props.card.id).then((base64Image) => {
        setImage(`data:image/png;base64,${base64Image}`);
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    }
  }, [setImage, props.card.id, props.imagePreview]);

  return (
    <div className="card-container position-relative">
      <img className="card-image" src={image} alt={props.card.name} />

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
