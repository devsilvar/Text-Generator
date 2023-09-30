import { useState } from "react";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextGenApi from "./Components/TextGenApi";
import TextGenLocal from "./Components/TextGenLocal";

// const url = "https://hipsum.co/api/?type=hipster-ce&paras=100";

function App() {
  const [Version, setVersion] = useState(true);

  const BreakdownText = (data, Words, Amount) => {
    let WordsArray = data.slice(0, Amount);
    let ExposeWords = WordsArray.toString().split("");
    let Seperator = ExposeWords.map((e, index) => {
      if (index % Words == 0) {
        return (ExposeWords[index] = "##");
      }
      return e;
    });
    let JoinWords = Seperator.toString().replaceAll(",", "");
    let Shortwords = JoinWords.toString("").split("##");
    return Shortwords;
  };

  const notify = (text) =>
    toast.info(text, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "light",
    });

  return (
    <>
      <div>
        <ToastContainer className="w-sm-75 mx-auto" />
      </div>

      {Version == true ? (
        <TextGenLocal
          Version={Version}
          setVersion={setVersion}
          ToastButton={notify}
          BreakdownText={BreakdownText}
        />
      ) : (
        <TextGenApi
          Version={Version}
          setVersion={setVersion}
          ToastButton={notify}
          BreakdownText={BreakdownText}
        />
      )}
    </>
  );
}

export default App;
