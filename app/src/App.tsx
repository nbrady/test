import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateCardForm } from "./components/create-card-form.component";
import { CardList } from "./components/card-list.component";
import { useState } from "react";
import { initializeCardDB } from "./services/card-database.service";
import { initializeImageDB } from "./services/image-database.service";

// TODO: Make functional component, is that why this formats and other files don't
function App() {
  const [mode, setMode] = useState<string>("login");

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
            onClick={() => setMode("edit")}
          >
            Login
          </button>
        </>
      )}

      {mode === "edit" && (
        <>
          {/* TODO: Format Buttons better, maybe tabs */}
          {/* TODO: Create edit card container */}
          <CardList onAddCard={() => setMode("add")}/>
        </>
      )}

      {mode === "add" && (
        <CreateCardForm onBack={() => setMode("edit")}/>
      )}
    </div>
  );
}

export default App;
