import React from 'react';
import { Col } from "react-bootstrap";


const SearchGameBar = (props) => {
  const { input: keyword, onChange: setKeyword } = props;
  
  const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
  return (
    <Col>
      <input
        style={BarStyling}
        key="random1"
        value={keyword}
        placeholder={"Search for a game title..."}
        onChange={(e) => setKeyword(e.target.value)}
        className="mt-5"
      />
    </Col>

  );
}

export default SearchGameBar;
