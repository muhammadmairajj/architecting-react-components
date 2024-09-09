import React from "react";

import Row from "../row";

import "./style.css";


function Content({ languages = [] }) {  // default parameter run only for undefined case not to run for null value
  return (
    <div className="content">
      {languages?.map((languages) => (
        <Row key={languages.id} suggestion={languages} />
      ))}
    </div>
  );
}

export default Content;
