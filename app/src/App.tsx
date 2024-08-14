import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateCardForm } from "./components/add-card-form.component";
import { CardList } from "./components/card-list.component";
import { useState } from "react";
import { initializeCardDB } from "./services/card-database.service";
import { initializeImageDB } from "./services/image-database.service";
import { ICard } from "./types/card";
import { EditCardForm } from "./components/edit-card-form.component";

// TODO: Make functional component, is that why this formats and other files don't
function App() {
  const [mode, setMode] = useState<string>("login");
  const [card, setCard] = useState<ICard>();

  return (
    <div className="container-fluid">
      {mode === "login" && (
        <>
          <input 
            type='text'               
            onChange={(event) => {
                initializeCardDB(event.target.value);
                initializeImageDB(event.target.value)
            }} 
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setMode("list")}
          >
            Login
          </button>
        </>
      )}

      {mode === "list" && <CardList onAddCard={() => setMode("add")} onEditCard={(card) => {setCard(card); setMode("edit")}} />}

      {mode === "add" && <CreateCardForm onBack={() => setMode("list")} />}

      {mode === "edit" && card && <EditCardForm card={card} onBack={() => setMode("list")} />}
    </div>
  );
}

export default App;
