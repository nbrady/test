import React, { useEffect, useState } from "react";
import { ICard } from "../types/card";
import { retrieveCards } from "../services/card-database.service";
import { CardImage } from "./card-image.component";

interface ICardListProps {
  //onCardSelected: (card: ICard) => void;
}

export const CardList: React.FC<ICardListProps> = (
  props: ICardListProps
) => {

  const [cardList, setCardList] = useState<ICard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    retrieveCards().then((data) => {
      setCardList(data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  return (
    <>
      {loading && 'Loading...'}

      {!loading && (
        <div className="row container">
          {cardList?.map((card: ICard) => (
            <div key={card.id} className="col-3 p-2">
              <CardImage card={card} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
