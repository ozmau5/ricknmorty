import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Characters from "./containers/Characters";
import Search from "./containers/Search";
import "materialize-css/dist/css/materialize.min.css";
import CharacterDetails from "./containers/CharacterDetails";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
});

export default () => {
  const [p, setP] = useState(1); // page number
  const [q, setQ] = useState(""); // search query
  const [stat, setStat] = useState(""); // status
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [species, setSpecies] = useState("");

  const paginate = (page) => setP(page);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="container">
          <h3 className="center-align">Rick and Morty</h3>
          <div className="row">
            <div className="col s12">
              <Search
                onFormSubmit={({ term, status, gender, type, species }) => {
                  setP(1);
                  setQ(term);
                  setStat(status);
                  setGender(gender);
                  setType(type);
                  setSpecies(species);
                }}
              />
              <Route
                path="/"
                render={() => (
                  <Characters
                    name={q}
                    page={p}
                    status={stat}
                    gender={gender}
                    type={type}
                    species={species}
                    paginate={paginate}
                  />
                )}
                exact={true}
              ></Route>
              <Route path="/bio/:id" component={CharacterDetails} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};
