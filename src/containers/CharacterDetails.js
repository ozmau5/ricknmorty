import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { NavLink } from "react-router-dom";

const GET_CHARACTERS = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        name
        air_date
        episode
      }
    }
  }
`;

const CharacterDetails = (props) => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { id },
  });
  if (loading)
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    );
  if (error) return <h5 class="center-align">Invalid character!</h5>;
  const {
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
    episode,
  } = data.character;
  return (
    <div>
      <NavLink to="/"> {`<`} Back to the results</NavLink>
      <br />
      <div
        className="center-align z-depth-2"
        style={{ margin: "10px 100px 50px 100px" }}
      >
        <h4 style={{ paddingTop: "20px" }}>{name}</h4>
        <img
          src={image}
          width="400"
          style={{
            boxShadow: "0 4px 8px 0 #000002, 0 6px 20px 0 #000002 ",
          }}
          alt={name}
        ></img>
        <br />
        <div style={{ padding: "25px 10px 0 10px" }}>
          <table className="striped">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{status}</td>
              </tr>
              <tr>
                <td>Species</td>
                <td>{species}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{type ? `${type}` : "N/A"}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{gender}</td>
              </tr>
              <tr>
                <td>Origin</td>
                <td>{origin.name}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{location.name}</td>
              </tr>
              <tr>
                <td>Episodes</td>
                <td>
                  <ul>
                    {episode.length === 1
                      ? "One episode:"
                      : `${episode.length} episodes:`}
                    {episode.map(({ episode, name, air_date }) => (
                      <li key={episode}>
                        {episode}: {name} ({air_date})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
