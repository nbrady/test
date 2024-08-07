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
        <div className="col-4 p-2">
          <CardImage card={card} key={card.id}/>
        </div>
      ))}
    </div>
    // <table className="table table-bordered table-striped table-hover">
    //   <thead>
    //     <tr>
    //       <th>Card Name</th>
    //       <th>Card Cost</th>
    //       <th>Card Power</th>
    //       <th>Card Health</th>
    //       <th>Card Effect</th>
    //       <th>Action</th>
    //     </tr>
    //   </thead>

    //   <tbody>
    //     {cardList?.map((card: ICard) => (
    //       <tr key={card.id}>
    //         <td>{card.name}</td>
    //         <td>{card.cost}</td>
    //         <td>{card.power}</td>
    //         <td>{card.health}</td>
    //         <td>{card.effect}</td>
    //         <td>
    //           <button
    //             type="button"
    //             className="btn btn-primary"
    //             onClick={() => props.onCardSelected(card)}
    //           >
    //             View
    //           </button>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};
