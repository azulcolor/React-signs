import logo from "./logo.svg";
import { useRef, useState } from "react";
import "./App.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SignatureCanvas from "react-signature-canvas";
import "./signature.css";
import axios from "axios";
import { hasUncaughtExceptionCaptureCallback } from "process";

function App() {
  const [imageURL, setImageURL] = useState([{ filename: "" }]);
  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = async () => {
    const data = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const response = await axios.post(
      "http://localhost:5000/post",
      { myFile: data },
      console.log(data)
    );
    
    setImageURL(response.data);
  }

  


    
    

  const [name, setName] = useState();


  return (
    <div className="App">
      <h1>Firma aquí</h1>

      <Popup
        modal
        trigger={<button>Click aquí</button>}
        closeOnDocumentClick={false}
      >
        {(close) => (
          <>
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas",
              }}
            />
            <button onClick={close}>Cerrar</button>
            <button onClick={clear}>Limpiar</button>
            <button onClick={save}>Guardar</button>
          </>
        )}
      </Popup>

      <button
        onClick={async () => {
          fetch("http://localhost:5000/get")
            .then((response) => response.json())
            .then((data) => setName(data))
            .catch((error) => console.log(error));
        }}
      >
        server
      </button>
      <button onClick={() => console.log(name)}>console</button>

      <br />
      <br />
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", 
       }}>
      {name ? (
        name.map((name) => {
          return <a href={name.myFile} download><img src={name.myFile} style={{margin: "2em"}}></img></a>;
        })
      ) : (
        <p>name no tiene nada</p>
      )}
      </div>
    </div>
  );
}

export default App;
