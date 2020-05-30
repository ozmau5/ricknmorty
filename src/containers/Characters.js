import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { NavLink } from "react-router-dom";

const GET_CHARACTERS = gql`
  query Characters(
    $name: String!
    $status: String!
    $gender: String!
    $type: String!
    $species: String!
    $p: Int!
  ) {
    characters(
      filter: {
        name: $name
        status: $status
        gender: $gender
        type: $type
        species: $species
      }
      page: $p
    ) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`;

export default ({ name, page, status, gender, type, species, paginate }) => {
  const p = page;
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name, status, gender, type, species, p },
  });
  if (loading)
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    );
  if (error) return <h5 class="center-align">Character not found!</h5>;
  const count = data.characters.info.count; // number of results
  const pagesCount = Math.ceil(count / 20); //number of pages
  // number of pages
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className="row">
      {count} characters found!
      <br />
      {
        // Pagination
      }
      <ul className="pagination">
        <li className={p === 1 ? "disabled" : "waves-effect"}>
          <a
            href="#!"
            onClick={() => {
              p === 1 || paginate(p - 1);
            }}
          >
            <i className="material-icons">{`<`}</i>
          </a>
        </li>
        {pages.map((page) => {
          return (
            <li key={page} className={page === p ? "active" : "waves-effect"}>
              <a
                href="#!"
                onClick={() => {
                  paginate(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className={p === pagesCount ? "disabled" : "waves-effect"}>
          <a
            href="#!"
            onClick={() => {
              p === pagesCount || paginate(p + 1);
            }}
          >
            <i className="material-icons">{`>`}</i>
          </a>
        </li>
      </ul>
      <br />
      {
        // Search results
      }
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        {data.characters.results.map(({ id, image, name }) => {
          return (
            <div
              key={id}
              className="col s12 m6 l3"
              style={{ marginRight: "auto" }}
            >
              <div className="card hoverable">
                <NavLink to={`bio/${id}`}>
                  <div className="card-image">
                    <img src={image} alt={name} />
                  </div>
                  <div className="card-content center-align">{name}</div>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
