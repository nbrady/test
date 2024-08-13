import React, { useEffect, useState } from "react";
import { ICard } from "../types/card";
import { retrieveCards } from "../services/card-database.service";
import { CardImage } from "./card-image.component";

interface ICardListProps {
  //onCardSelected: (card: ICard) => void;
  onAddCard: () => void;
}

export const CardList: React.FC<ICardListProps> = (
  props: ICardListProps
) => {

  const [cardList, setCardList] = useState<ICard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    retrieveCards().then((data) => {
      setCardList(data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setErrorMessage('Unable to retrieve cards.');
      setLoading(false);
    });
  }, [])

  return (
    <>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

      {loading && 'Loading...'}
      
      <button
        type="button"
        className="btn btn-primary"
        onClick={props.onAddCard}
      >
        Add Card
      </button>

      {!loading && (
        <div className="row container-fluid">
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
