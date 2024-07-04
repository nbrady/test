import React from "react";
import cardList from "../assets/cards.json";
import { ICard } from "../types/card";

interface ICardImageProps {
  onCardSelected: (card: ICard) => void;
}

export const CardTable: React.FC<ICardImageProps> = (
  props: ICardImageProps
) => {
  return (
    <table className="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>Card Name</th>
          <th>Card Cost</th>
          <th>Card Power</th>
          <th>Card Health</th>
          <th>Card Effect</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {cardList.map((card: ICard) => (
          <tr key={card.id}>
            <td>{card.name}</td>
            <td>{card.cost}</td>
            <td>{card.power}</td>
            <td>{card.health}</td>
            <td>{card.effect}</td>
            <td>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => props.onCardSelected(card)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
