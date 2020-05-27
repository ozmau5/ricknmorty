import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ onFormSubmit }) => {
  const [term, setTerm] = useState("");
  const history = useHistory();

  return (
    <div>
      <form
        onSubmit={(e) => {
          history.push("/"); // Showing the main page if it is on bio page
          e.preventDefault();
          onFormSubmit(term);
        }}
      >
        <div>
          <label>Search</label>
          <input
            type="text"
            placeholder="Type the name of a character ..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button className="waves-effect waves-light btn">Search</button>
        </div>
      </form>
    </div>
  );
};
