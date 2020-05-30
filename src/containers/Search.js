import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ onFormSubmit }) => {
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [species, setSpecies] = useState("");
  const history = useHistory();

  return (
    <div className="row">
      <form
        onSubmit={(e) => {
          history.push("/"); // Showing the main page if it is on bio page
          e.preventDefault();
          onFormSubmit({ term, status, gender, type, species });
        }}
        className="card-panel"
        style={{ padding: "25px" }}
      >
        <div className="row">
          <div className="col s12">
            <label>Search</label>
            <input
              type="text"
              placeholder="Type the name of a character ..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 l3">
            <label>Status</label>
            <select
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="waves-effect waves-light"
            >
              <option value=""></option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="col s12 m6 l3">
            <label>Gender</label>
            <select
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="waves-effect waves-light"
            >
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="col s12 m6 l3">
            <label>Type</label>
            <input
              type="text"
              placeholder="What type?"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="validate"
            />
          </div>
          <div className="col s12 m6 l3">
            <label>Species</label>
            <input
              type="text"
              placeholder="What species?"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="validate"
            />
          </div>
          <div className="center-align">
            <button
              className="waves-effect waves-light btn"
              style={{ width: "40%", marginTop: "20px" }}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
