import React from "react";

import Row from "../row";

import "./style.css";


function Suggestion({ suggestions = [], onSuggestionSelect = () => {} }) {  // default parameter run only for undefined case not to run for null value
  // console.log(suggestions);
  return (
    <div className="suggestion">
      {suggestions?.map((suggestion) => (
        <Row key={suggestion.id} suggestion={suggestion} onClick={onSuggestionSelect} />
      ))}
    </div>
  );
}

export default Suggestion;
