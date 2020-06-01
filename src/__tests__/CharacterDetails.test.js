import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import renderer from "react-test-renderer";
import wait from "waait";

import CharacterDetails, {
  GET_CHARACTER,
} from "../containers/CharacterDetails";

it("should render without error", () => {
  renderer.create(
    <MockedProvider mocks={[]}>
      <CharacterDetails />
    </MockedProvider>
  );
});

it("should render loading state initially", () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <CharacterDetails params={{ id: 17 }} />
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree.children).toContain("Loading...");
});

it("should render character details", async () => {
  const characterMock = {
    request: { query: GET_CHARACTER, variables: { id: 17 } },
    result: { data: { name: "Annie" } },
  };

  const component = renderer.create(
    <MockedProvider mocks={[characterMock]} addTypename={false}>
      <CharacterDetails params={{ id: 17 }} />
    </MockedProvider>
  );

  await wait(0); // wait for response

  const td = component.root.findByType("td");
  expect(td.children).toContain("Annie");
});

it("should show error UI", async () => {
  const characterMock = {
    request: { query: GET_CHARACTER, variables: { id: 855 } },
    error: new Error("Error!"),
  };

  const component = renderer.create(
    <MockedProvider mocks={[characterMock]} addTypename={false}>
      <CharacterDetails params={{ id: 17 }} />
    </MockedProvider>
  );

  await wait(0); // wait for response

  const tree = component.toJSON();
  expect(tree.children).toContain("Invalid character");
});
