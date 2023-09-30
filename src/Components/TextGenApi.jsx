import { useState, useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import { FaCopy } from "react-icons/fa6";
import FetchApi from "../FetchApi";

const url = `https://hipsum.co/api/?type=hipster-ce&paras=100`;

const TextGenApi = ({ Version, setVersion, ToastButton, BreakdownText }) => {
  const { loading, text } = FetchApi(url);

  const [submit, setsubmit] = useState(false);
  const [InputText, setInputText] = useState([]);
  const [Paragraph, setParagraph] = useState("");
  const [Index, setIndex] = useState(0);

  //change between Long, short and Meduim Paragraphs
  const AdjustParagraph = (e) => {
    setParagraph(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsubmit(true);

    let Amount = parseInt(Index);
    if (Paragraph == "Long") {
      setInputText(text.slice(0, Amount));
    }

    if (Paragraph == "Meduim") {
      setInputText(BreakdownText(text, 302, Amount).slice(1, Amount + 1));
    }

    if (Paragraph == "Short") {
      setInputText(BreakdownText(text, 179, Amount).slice(1, Amount + 1));
    }
  };

  const CopyAll = () => {
    ToastButton("Copied All");

    let joined2 = InputText.map((item) => {
      return item;
    });

    if (Paragraph == "Long" || Paragraph == "Meduim" || Paragraph == "Short") {
      let cc = joined2.join(`\n  \n`);
      console.log(cc);
      navigator.clipboard.writeText(cc).then(() => {
        console.log("Content copied to clipboard");
      });
    }
  };

  const Copy = (e) => {
    let CopiedText = e.target.id;
    ToastButton("Copied");
    navigator.clipboard.writeText(CopiedText).then(() => {
      console.log("Content copied to clipboard");
    });
  };

  return (
    <>
      <section>
        <div>
          <button
            className="btn btn-warning position-absolute top-0 end-0 m-3 ms-auto"
            onClick={() => setVersion(!Version)}
          >
            {Version == false ? "Go to Local Version" : `Go to API Version`}
          </button>
        </div>
        <h3 className="ps-3 pt-4 text-center mt-5 text-uppercase fw-bold text-success">
          Lorem Ipsum Alternative Generated For You ?
        </h3>
        <p className="text-center mt-4">
          You Don't Need To Crank Out Text From Your head Anymore, <br />
          Copy <span className="fw-bold text-success">
            Short, Meduim{" "}
          </span> and <span className="fw-bold text-success">Long </span>
          Sentences for Web/mobile Apps Over Here
        </p>

        <div className="container my-5">
          <form
            action=""
            className="row mx-auto justify-content-center bg-white"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="amount"
              id="amount"
              className="col-4 col-sm-2  "
              onChange={(e) => setIndex(e.target.value)}
              placeholder="Number of Paragraphs"
            />
            <select
              name="length"
              id="length"
              className="col-3 col-sm-2 mx-2 mx-sm-3"
              onChange={AdjustParagraph}
            >
              <option value="Size">Paragraph size</option>
              <option value="Long">Long</option>
              <option value="Meduim">Meduim</option>
              <option value="Short">Short</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-success  col-4 col-sm-2"
            >
              Generate
            </button>
          </form>
        </div>
        {loading ? (
          <>
            <h3 className="text-center mt-5">Loading.....</h3>
          </>
        ) : (
          <article className="fs-5 container">
            <div className={`  ${submit == true ? "d-block" : "d-none"} `}>
              <button
                onClick={CopyAll}
                type="button"
                className="btn p-1 btn-secondary "
              >
                Copy All
                <FaCopy className="mx-1" />
              </button>
            </div>
            {InputText.map((item, index) => {
              return (
                <div className="mt-3 d-block" key={index}>
                  <BiCopy onClick={Copy} id={item} className="float-end" />

                  <p className="p-3 mb-3 text-sm text-capitalize">{item}</p>
                </div>
              );
            })}
          </article>
        )}
      </section>
    </>
  );
};

export default TextGenApi;
