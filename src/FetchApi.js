import { useState, useEffect } from "react";

const FetchApi = (url) => {
  const [loading, setloading] = useState(false);
  const [text, settext] = useState([]);
  const controller = new AbortController();

  const FecthText = async () => {
    setloading(true);
    const response = await fetch(url);
    const data = await response.json();
    settext(data);
    setloading(false);
  };

  useEffect(() => {
    FecthText();
    console.log(url);
    return () => {
      controller.abort();
    };
  }, []);

  return { loading, text };
};

export default FetchApi;
