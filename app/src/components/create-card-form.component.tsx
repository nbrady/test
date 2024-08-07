import { useState } from "react";
import { CardImage } from "./card-image.component";
import { ICard } from "../types/card";
import { addCard } from "../services/card-database.service";

export const CreateCardForm = () => {
  const [card, setCard] = useState<ICard>({
    id: -1,
    name: '',
    cost: '',
    power: '',
    health: '',
    effect: '',
    image: '',
  });

  const setImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const base64Image = await toBase64(event.target.files) as string;
      setCard({ ...card, image: base64Image });
    }
  };

  const toBase64 = (fileList: FileList) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const onSave = () => {
    addCard(card).then(() => {
      alert('Card has added successfully.')
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <div>
            <label htmlFor="card-name">Card Name: </label>
            <input
              id="card-name"
              type="text"
              value={card.name}
              onChange={(event) =>
                setCard({ ...card, name: event.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="card-cost">Card Cost: </label>
            <input
              id="card-cost"
              type="text"
              value={card.cost}
              onChange={(event) =>
                setCard({ ...card, cost: event.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="card-power">Card Power: </label>
            <input
              id="card-power"
              type="text"
              value={card.power}
              onChange={(event) =>
                setCard({ ...card, power: event.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="card-health">Card Health: </label>
            <input
              id="card-health"
              type="text"
              value={card.health}
              onChange={(event) =>
                setCard({ ...card, health: event.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="card-effect">Effect: </label>
            <input
              id="card-effect"
              type="text"
              value={card.effect}
              onChange={(event) =>
                setCard({ ...card, effect: event.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="card-image">Card Image: </label>
            <input id="card-image" type="file" onChange={setImage} />
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>

        <div className="col-4">
          <label htmlFor="card-preview">Card Preview: </label>
          <CardImage card={card} />
        </div>
      </div>
    </div>
  );
};
