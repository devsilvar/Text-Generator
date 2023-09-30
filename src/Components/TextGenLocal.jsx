import { useState } from "react";
import { data } from "../Data";
import { BiCopy } from "react-icons/bi";
import { FaCopy } from "react-icons/fa6";

const TextGenLocal = ({ Version, setVersion, ToastButton, BreakdownText }) => {
  const [Option, setOption] = useState(0);
  const [Text, setText] = useState([]);
  const [Paragraph, setParagraph] = useState("");
  const [submitted, setsubmitted] = useState(false);

  //Function to generate text after Selecting the Paragraph Size and Paragaraph Number
  const handleSubmit = (e) => {
    e.preventDefault();
    setsubmitted(true);

    let Amount = parseInt(Option);
    if (Paragraph == "Long") {
      setText(data.slice(0, Amount));
    }

    if (Paragraph == "Meduim") {
      //Break Down Text from The array into Meduim Smaller text
      setText(BreakdownText(data,302, Amount).slice(1, Amount + 1));
    }

    if (Paragraph == "Short") {
      //Break Down Text from The array into Short Smaller text
      setText(BreakdownText(data,237, Amount).slice(1, Amount + 1));
    }
  };

  //switching between Long and Short paragraph
  const AdjustParagraph = (e) => {
    setParagraph(e.target.value);
    setsubmitted(false);
  };

  //Copy All generated Text
  const CopyAll = () => {
    ToastButton("Copied All");
    let joined = Text.map((item) => {
      return item;
    });

    if (Paragraph == "Long" || Paragraph == "Meduim" || Paragraph == "Short") {
      let cc = joined.join(`\n  \n`);
      console.log(cc);
      navigator.clipboard.writeText(cc).then(() => {
        console.log("Content copied to clipboard");
      });
    }
  };

  //Copy text only at the Index selected
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
        <h3 className="ps-3 h3 pt-4 text-center mt-5  fw-bold text-uppercase text-success ">
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
            <select
              name="amount"
              id="amount"
              className="col-3 col-sm-2"
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="0">ParaGraphs</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

            <select
              name="length"
              id="length"
              className="col-3 col-sm-2 mx-2 mx-sm-3"
              onChange={AdjustParagraph}
            >
              <option value="Size">Paragraph size</option>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
            <button
              type="submit"
              className="btn btn-success px-1 col-3 col-sm-2"
            >
              Generate
            </button>
          </form>
        </div>

        <article className="fs-5 container">
          <div className={`  ${submitted == true ? "d-block" : "d-none"} `}>
            <button
              onClick={CopyAll}
              type="button"
              className="btn p-1 btn-secondary "
            >
              Copy All
            </button>
          </div>

          {submitted === true &&
            Text.map((item, index) => {
              return (
                <div className="mt-3 d-block" key={index}>
                  <BiCopy onClick={Copy} id={item} className="float-end " />

                  <p className="p-3 mb-3 text-sm text-capitalize">{item}</p>
                </div>
              );
            })}
        </article>
      </section>
    </>
  );
};

export default TextGenLocal;
