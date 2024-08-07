import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CreateCardForm } from "./components/create-card-form.component";
import { CardList } from "./components/card-list.component";
import { useState } from "react";
import { initialize } from "./services/card-database.service";

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
                initialize(event.target.value);
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setMode("add")}
          >
            Add Card
          </button>

          <div className="row">
            <CardList />
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
