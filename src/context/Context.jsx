import React, { createContext, useState } from "react";
import main from "../services/gemini";

const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [loading, setloading] = useState(false);
  const [messages, setMessages] = useState([]); // <-- chat history

  const onSent = async function (prompt) {
    if (!prompt) return;
    setloading(true);
    setinput("");
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    let result = "";
    try {
      result = await main(prompt); // <-- Await the result
    } catch (e) {
      result = "Sorry, something went wrong.";
    }
    setMessages((prev) => [...prev, { role: "gemini", text: result }]);
    setloading(false);
  };

  const contextvalue = {
    messages,
    onSent,
    input,
    setinput,
    loading,
  };

  return (
    <Context.Provider value={contextvalue}>
      {props.children}
    </Context.Provider>
  );
};

export { ContextProvider };
export default Context;