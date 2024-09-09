import React from "react";

import "./style.css";

function TextField({ text = "", disabled=false, onInput = () => {}, onKeyPress=() =>{} }) {
  return (
    <input
      type="text"
      name="text"
      disabled={disabled}
      value={text}
      onInput={onInput}
      onKeyUp={onKeyPress}
      placeholder="Enter your language"
    />
  );
}

export default TextField;
