import React from "react";

import "./style.css";

function Row({ suggestion = {}, onClick = () => {} }) {
  const { id = "", value = "" } = suggestion;
  console.log("Row component re-rendered");
  return (
    <button
      onClick={() => onClick({ id, value })}
      className="suggestion-button"
      key={id}
    >
      {value}
    </button>
  );
}

export default Row;
