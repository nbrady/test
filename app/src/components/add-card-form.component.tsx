import { useState } from "react";
import { CardImage } from "./card-image.component";
import { ICard } from "../types/card";
import { createCard } from "../services/card-database.service";

interface ICreateCardFormProps {
  onBack: () => void;
}

export const CreateCardForm: React.FC<ICreateCardFormProps> = (props) => {
  const [card, setCard] = useState<ICard>({
    id: -1,
    name: "",
    cost: "",
    power: "",
    health: "",
    effect: "",
  });

  const [imagePreview, setImagePreview] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const setImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let base64Image = (await toBase64(event.target.files)) as string;
      setImagePreview(base64Image);
    }
  };

  const toBase64 = (fileList: FileList) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const onSave = () => {
    createCard(card, imagePreview)
      .then(() => {
        setSuccessMessage("Card has added successfully.");
        setErrorMessage(undefined);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Unable to add card.");
        setSuccessMessage(undefined);
      });
  };
  
  const resetForm = () => {
    setCard({
      id: -1,
      name: "",
      cost: "",
      power: "",
      health: "",
      effect: "",
    });
    setImagePreview(undefined);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <h4>Add Card</h4>

          <form>
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

            {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}

            <div className="row">
              <div className="form-group col">
                <label htmlFor="card-name">Card Name: </label>
                <input
                  id="card-name"
                  className="form-control"
                  type="text"
                  value={card.name}
                  onChange={(event) =>
                    setCard({ ...card, name: event.target.value })
                  }
                />
              </div>

              <div className="form-group col">
                <label htmlFor="card-cost">Card Cost: </label>
                <input
                  id="card-cost"
                  className="form-control"
                  type="text"
                  value={card.cost}
                  onChange={(event) =>
                    setCard({ ...card, cost: event.target.value })
                  }
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label htmlFor="card-power">Card Power: </label>
                <input
                  id="card-power"
                  className="form-control"
                  type="text"
                  value={card.power}
                  onChange={(event) =>
                    setCard({ ...card, power: event.target.value })
                  }
                />
              </div>

              <div className="form-group col">
                <label htmlFor="card-health">Card Health: </label>
                <input
                  id="card-health"
                  className="form-control"
                  type="text"
                  value={card.health}
                  onChange={(event) =>
                    setCard({ ...card, health: event.target.value })
                  }
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label htmlFor="card-effect">Effect: </label>
                <textarea
                  id="card-effect"
                  className="form-control"
                  value={card.effect}
                  onChange={(event) =>
                    setCard({ ...card, effect: event.target.value })
                  }
                />
              </div>

              <div className="form-group col">
                <label htmlFor="card-image">Card Image: </label>
                <input
                  id="card-image"
                  className="form-control"
                  type="file"
                  onChange={setImage}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={onSave}
            >
              Save
            </button>

            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={props.onBack}
            >
              Return to Card List
            </button>
          </form>
        </div>

        <div className="col-4">
          <CardImage card={card} imagePreview={imagePreview} />
        </div>
      </div>
    </div>
  );
};