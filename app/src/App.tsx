import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateCardForm } from "./components/create-card-form.component";
import { CardTable } from "./components/card-table.component";
import { ICard } from "./types/card";
import { useState } from "react";
import { CardImage } from "./components/card-image.component";
import { initialize } from "./services/card-database.service";

// TODO: Make functional component, is that why this formats and other files don't
// TODO: Add images to JSON
function App() {
  const [mode, setMode] = useState<string>("login");
  const [selectedCard, setSelectedCard] = useState<ICard>();

  return (
    <div className="container-fluid">
      {mode === "login" && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setMode("add")}
          >
            Login
          </button>

          <input 
            type='text'               
            onChange={(event) => {
                initialize(event.target.value);
                setMode('edit');
            }} 
          />
        </>
      )}

      {mode === "edit" && (
        <>
          {/* TODO: Format Buttons better, maybe tabs */}
          {/* TODO: Create edit card container */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setMode("add")}
          >
            Add Card
          </button>

          <div className="row">
            <div className="col-8">
              <CardTable onCardSelected={setSelectedCard} />
            </div>

            <div className="col-4">
              {selectedCard && <CardImage card={selectedCard} />}
            </div>
          </div>
        </>
      )}

      {mode === "add" && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setMode("edit")}
          >
            Edit Card
          </button>

          <CreateCardForm />
        </>
      )}
    </div>
  );
}

export default App;
