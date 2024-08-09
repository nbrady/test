import React, { useEffect, useState } from "react";
import { ICard } from "../types/card";
import { getCards } from "../services/card-database.service";
import { CardImage } from "./card-image.component";

interface ICardListProps {
  //onCardSelected: (card: ICard) => void;
}

export const CardList: React.FC<ICardListProps> = (
  props: ICardListProps
) => {

  const [cardList, setCardList] = useState<ICard[]>([]);
  
  useEffect(() => {
    getCards().then((data) => {
      setCardList(data);
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }, [])

  return (
    <div className="row container">
      {cardList?.map((card: ICard) => (
        <div key={card.id} className="col-3 p-2">
          <CardImage card={card} />
        </div>
      ))}
    </div>
  );
};
