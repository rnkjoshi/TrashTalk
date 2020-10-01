import React from "react";
import "./InputBox.css";

const InputBox = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="form">
      <input
        className="input"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key == "Enter" ? sendMessage(e) : null)}
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        send
      </button>
    </form>
  );
};

export default InputBox;
