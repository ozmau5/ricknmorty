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

  const paginate = (page) => setP(page);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="container">
          <h3 className="center-align">Rick and Morty</h3>
          <Search
            onFormSubmit={(term) => {
              setP(1);
              setQ(term);
            }}
          />
          <Route
            path="/"
            render={() => <Characters name={q} page={p} paginate={paginate} />}
            exact={true}
          ></Route>
          <Route path="/bio/:id" component={CharacterDetails} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};
